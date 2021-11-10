// Author: Rui Deleterium
// Project: https://github.com/deleterium/SmartC
// License: BSD 3-Clause License

import { assertNotUndefined } from '../../repository/repository'
import { MEMORY_SLOT, TOKEN } from '../../typings/syntaxTypes'
import { GENCODE_AUXVARS } from '../typings/codeGeneratorTypes'

import { utils } from '../utils'
import { assignmentToAsm } from './assignmentToAsm'
import { comparisionToAsm } from './comparisionToAsm'
import { keywordToAsm } from './keywordToAsm'
import { operatorToAsm } from './operatorToAsm'
import { unaryOperatorToAsm } from './unaryOperatorToAsm'

export interface FLATTEN_MEMORY_RETURN_OBJECT {
    FlatMem: MEMORY_SLOT
    asmCode: string
    isNew: boolean
}

/** Transforms a instruction into const instruction */
export function setConstAsmCode (progMemory: MEMORY_SLOT[], code: string, line: number) {
    const codelines = code.split('\n')
    const retlines: string[] = []
    codelines.forEach(instruction => {
        if (instruction.length === 0) {
            retlines.push('')
            return
        }
        const parts = /^\s*SET\s+@(\w+)\s+#([\da-f]{16})\b\s*$/.exec(instruction)
        if (parts === null) {
            const clrpart = /^\s*CLR\s+@(\w+)\s*$/.exec(instruction)
            if (clrpart !== null) {
                // allow CLR instruction and change to SET zero
                retlines.push('^const SET @' + clrpart[1] + ' #0000000000000000')
                return
            }
            const setpart = /^\s*SET\s+@(\w+)\s+\$n(\d+)\s*$/.exec(instruction)
            if (setpart !== null) {
                // allow set const on optimized const vars
                retlines.push(`^const SET @${setpart[1]} #${BigInt(setpart[2]).toString(16).padStart(16, '0')}`)
                return
            }
            throw new TypeError(`At line: ${line}. No operations can be done during 'const' assignment.`)
        }
        const search = progMemory.find(obj => obj.asmName === parts[1])
        if (search === undefined) {
            throw new TypeError(`At line: ${line}. Variable ${parts[1]} not found in memory.`)
        }
        if (search.hexContent !== undefined) {
            throw new TypeError(`At line: ${line}. Left side of an assigment with 'const' keyword already has been set.`)
        }
        search.hexContent = parts[2]
        retlines.push('^const ' + instruction)
    })
    return retlines.join('\n')
}

/** Creates one simple assembly instruction */
export function createSimpleInstruction (instruction: string, param1: string = '') {
    switch (instruction) {
    case 'Jump':
        return `JMP :${param1}\n`
    case 'Push':
        return `PSH $${param1}\n`
    case 'Pop':
        return `POP @${param1}\n`
    case 'exit':
        return 'FIN\n'
    case 'Label':
        return `${param1}:\n`
    case 'Function':
        return `JSR :__fn_${param1}\n`
    default:
        throw new TypeError(`Unknow simple instruction: ${instruction}`)
    }
}

export function createAPICallInstruction (AstAuxVars: GENCODE_AUXVARS, ApiToken: TOKEN, RetMem: MEMORY_SLOT, argsMem: MEMORY_SLOT[]) {
    let assemblyCode = ''
    const tempArgsMem: MEMORY_SLOT[] = []
    argsMem.forEach((VarObj) => {
        const Temp = flattenMemory(AstAuxVars, VarObj, -1)
        assemblyCode += Temp.asmCode
        tempArgsMem.push(Temp.FlatMem)
    })
    assemblyCode += 'FUN'
    if (RetMem.type !== 'void') {
        assemblyCode += ' @' + RetMem.asmName
    }
    assemblyCode += ' ' + ApiToken.value
    tempArgsMem.forEach(Arg => {
        assemblyCode += ' $' + Arg.asmName
    })
    assemblyCode += '\n'
    tempArgsMem.forEach(Arg => AstAuxVars.freeRegister(Arg.address))
    return assemblyCode
}

/**
 * From ParamMemObj create an memory object suitable for assembly operations (a regular long variable). Do do rely in createInstruction,
 * all hardwork done internally. Returns also instructions maybe needed for conversion and a boolean to indicate if it is
 * a new object (that must be free later on).
*/
export function flattenMemory (auxVars: GENCODE_AUXVARS, StuffedMemory: MEMORY_SLOT, line: number): FLATTEN_MEMORY_RETURN_OBJECT {
    let retInstructions = ''
    const paramDec = utils.getDeclarationFromMemory(StuffedMemory)

    function flattenMemoryMain (): FLATTEN_MEMORY_RETURN_OBJECT {
        if (StuffedMemory.type === 'constant') {
            return flattenConstant(StuffedMemory.hexContent)
        }
        if (StuffedMemory.Offset === undefined) {
            return { FlatMem: StuffedMemory, asmCode: '', isNew: false }
        }
        let RetObj: MEMORY_SLOT
        if (StuffedMemory.Offset.type === 'variable') {
            RetObj = auxVars.getNewRegister()
            RetObj.declaration = paramDec
            retInstructions += `SET @${RetObj.asmName} $($${StuffedMemory.asmName} + $${auxVars.getMemoryObjectByLocation(StuffedMemory.Offset.addr, line).asmName})\n`
            return { FlatMem: RetObj, asmCode: retInstructions, isNew: true }
        }
        // StuffedMemory.Offset.type is 'constant'
        let FlatConstant: FLATTEN_MEMORY_RETURN_OBJECT
        switch (StuffedMemory.type) {
        case 'register':
        case 'long':
        case 'structRef':
            RetObj = auxVars.getNewRegister()
            RetObj.declaration = paramDec
            // TODO remove this and gain optimization
            if (StuffedMemory.type !== 'structRef') {
                if (StuffedMemory.Offset.value === 0) {
                    retInstructions += `SET @${RetObj.asmName} $($${StuffedMemory.asmName})\n`
                    return { FlatMem: RetObj, asmCode: retInstructions, isNew: true }
                }
            }
            FlatConstant = flattenConstant(StuffedMemory.Offset.value)
            retInstructions += FlatConstant.asmCode
            retInstructions += `SET @${RetObj.asmName} $($${StuffedMemory.asmName} + $${FlatConstant.FlatMem.asmName})\n`
            if (FlatConstant.isNew) {
                auxVars.freeRegister(FlatConstant.FlatMem.address)
            }
            return { FlatMem: RetObj, asmCode: retInstructions, isNew: true }
        case 'array':
            // Looks like an array but can be converted to regular variable
            RetObj = auxVars.getMemoryObjectByLocation(utils.addHexContents(StuffedMemory.hexContent, StuffedMemory.Offset.value), line)
            auxVars.freeRegister(StuffedMemory.address)
            return { FlatMem: RetObj, asmCode: retInstructions, isNew: true }
        default:
            throw new TypeError(`Internal error at line: ${line}. Not implemented type in flattenMemory()`)
        }
    }

    function flattenConstant (hexParam: string|number|undefined): FLATTEN_MEMORY_RETURN_OBJECT {
        hexParam = assertNotUndefined(hexParam)
        let hexString: string
        if (typeof (hexParam) === 'number') {
            hexString = hexParam.toString(16)
        } else {
            hexString = hexParam
        }
        hexString = hexString.padStart(16, '0')
        if (hexString.length > 17) {
            throw new RangeError(`At line: ${line}. Overflow on long value assignment. Value bigger than 64 bits).`)
        }
        const OptMem = auxVars.memory.find(MEM => MEM.asmName === 'n' + Number('0x' + hexString) && MEM.hexContent === hexString)
        if (OptMem) {
            return { FlatMem: OptMem, asmCode: '', isNew: false }
        }
        const RetObj = auxVars.getNewRegister()
        RetObj.declaration = paramDec
        let asmInstruction = ''
        if (hexString === '0000000000000000') {
            asmInstruction += `CLR @${RetObj.asmName}\n`
        } else {
            asmInstruction += `SET @${RetObj.asmName} #${hexString}\n`
        }
        return { FlatMem: RetObj, asmCode: asmInstruction, isNew: true }
    }

    return flattenMemoryMain()
}

/** Translate one single instruction from ast to assembly code */
export function createInstruction (AuxVars: GENCODE_AUXVARS, OperatorToken: TOKEN, MemParam1?: MEMORY_SLOT, MemParam2?: MEMORY_SLOT, rLogic?:boolean, jpFalse?: string, jpTrue?:string) : string {
    let retinstr = ''

    switch (OperatorToken.type) {
    case 'Assignment':
        return assignmentToAsm(AuxVars, assertNotUndefined(MemParam1), assertNotUndefined(MemParam2), OperatorToken.line)
    case 'Operator':
    case 'SetOperator':
        return operatorToAsm(AuxVars, OperatorToken, assertNotUndefined(MemParam1), assertNotUndefined(MemParam2))
    case 'UnaryOperator':
    case 'SetUnaryOperator':
        return unaryOperatorToAsm(OperatorToken, assertNotUndefined(MemParam1))
    case 'Comparision':
        return comparisionToAsm(AuxVars, OperatorToken, MemParam1, MemParam2, rLogic, jpFalse, jpTrue)
    case 'Push': {
        if (MemParam1 === undefined) {
            throw new TypeError(`At line: ${OperatorToken.line}. Missing parameter for PSH. BugReport please.`)
        }
        const TmpMemObj = flattenMemory(AuxVars, MemParam1, OperatorToken.line)
        retinstr += TmpMemObj.asmCode
        retinstr += 'PSH $' + TmpMemObj.FlatMem.asmName + '\n'
        if (TmpMemObj.isNew === true) {
            AuxVars.freeRegister(TmpMemObj.FlatMem.address)
        }
        return retinstr
    }
    case 'Keyword':
        return keywordToAsm(AuxVars, OperatorToken, MemParam1)
    default:
        throw new TypeError(`Internal error at line: ${OperatorToken.line}.`)
    }
}