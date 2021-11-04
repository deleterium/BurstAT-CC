// Author: Rui Deleterium
// Project: https://github.com/deleterium/SmartC
// License: BSD 3-Clause License

import { CONTRACT } from '../typings/contractTypes'
import { SENTENCES } from '../typings/syntaxTypes'
import { assertNotUndefined } from '../repository/repository'
import { createTree } from './createTree'

/**
 * Traverse Program transforming some sentences properties from arrays of
 * tokens into an actually abstract syntax tree. Check operators
 * precedence and let operations in correct order for assembler.
 * This is parser third and final pass.
 * @param Program to be processed
 * @returns {void} but Program will be updated.
 * @throws {TypeError|SyntaxError} on any mistake.
 */
export function syntaxProcess (Program: CONTRACT) : void {
    /* * * Main function! * * */
    function syntaxProcessMain () : void {
        Program.Global.sentences.forEach(processSentence)
        Program.functions.forEach(CurrentFunction => {
            CurrentFunction.sentences.forEach(processSentence)
        })
    }

    // Process recursively one Sentence object, creating an CodeAST, that was
    //   processed sintacticly.
    function processSentence (SentenceObj: SENTENCES) {
        switch (SentenceObj.type) {
        case 'phrase':
            SentenceObj.CodeAST = createTree(
                assertNotUndefined(SentenceObj.code,
                    'Internal error. Unknow object arrived at processSentence')
            )
            delete SentenceObj.code
            break
        case 'ifElse':
            SentenceObj.falseBlock.forEach(processSentence)
        // eslint-disable-next-line no-fallthrough
        case 'ifEndif':
        case 'while':
        case 'do':
            if (assertNotUndefined(SentenceObj.condition).length === 0) {
                throw new SyntaxError(`At line ${SentenceObj.line}. Sentence condition can not be empty`)
            }
            SentenceObj.ConditionAST = createTree(SentenceObj.condition)
            delete SentenceObj.condition
            SentenceObj.trueBlock.forEach(processSentence)
            break
        case 'for':
            SentenceObj.threeSentences.forEach(processSentence)
            SentenceObj.trueBlock.forEach(processSentence)
            break
        case 'struct':
            processSentence(SentenceObj.Phrase)
            break
        }
    }

    return syntaxProcessMain()
}
