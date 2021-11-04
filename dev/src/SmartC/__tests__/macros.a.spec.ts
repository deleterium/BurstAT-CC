import { SmartC } from '../smartc'

/* preprocessor macros test are in preprocessor folder */
describe('#program', () => {
    it('should compile: name', () => {
        const code = '#program name tEst2\n long a;  a++;'
        const assembly = '^program name tEst2\n^declare r0\n^declare r1\n^declare r2\n^declare a\n\nINC @a\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
        expect(compiler.getMachineCode().PName).toBe('tEst2')
    })
    it('should compile: description', () => {
        const code = '#program description test teste tesssttt\n long a;  a++;'
        const assembly = '^program description test teste tesssttt\n^declare r0\n^declare r1\n^declare r2\n^declare a\n\nINC @a\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
        expect(compiler.getMachineCode().PDescription).toBe('test teste tesssttt')
    })
    it('should compile: description with escaping new line', () => {
        const code = '#program description test teste te\\\nsssttt\n long a;  a++;'
        const assembly = '^program description test teste tesssttt\n^declare r0\n^declare r1\n^declare r2\n^declare a\n\nINC @a\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
        expect(compiler.getMachineCode().PDescription).toBe('test teste tesssttt')
    })
    it('should compile: activationAmount', () => {
        const code = '#program activationAmount 100000\n long a;  a++;'
        const assembly = '^program activationAmount 100000\n^declare r0\n^declare r1\n^declare r2\n^declare a\n\nINC @a\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
        expect(compiler.getMachineCode().PActivationAmount).toBe('100000')
    })
    test('should throw: forbidden char in name', () => {
        expect(() => {
            const code = '#program name test-2\n long a;  a++;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: description bigger than 1000 chars', () => {
        expect(() => {
            const code = '#program description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur mollis mauris eu pretium. Vivamus ut nisl eget elit aliquam finibus eget a ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vel neque risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Sed eget lacinia lorem, et luctus orci. Praesent ut lorem pretium, iaculis dui eu, convallis sem. Ut lorem metus, eleifend eu velit in, volutpat ullamcorper sem. Donec hendrerit ornare posuere. Curabitur vitae lacus non dolor lacinia mollis. Sed ex felis, fringilla ac fringilla id, lobortis condimentum mi. Vestibulum nec orci vel lectus pulvinar imperdiet sit amet id nulla. Morbi quis orci tristique, pharetra libero pharetra, fermentum nunc. Nulla vestibulum felis risus, at cursus leo blandit ut. Praesent interdum commodo ex, sed vehicula sem luctus eu. Ut sed diam quis lectus lobortis maximus. Etiam hendrerit tincidunt ligula nec efficitur. Donec pulvinar mauris ac integer.\nlong a;  a++;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: forbidden char in name', () => {
        expect(() => {
            const code = '#program name test2 d\n long a;  a++;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: forbiden activation amount in hex', () => {
        expect(() => {
            const code = '#program activationAmount 0xff\n long a;  a++;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    it('should compile: allow _ in activationAmount', () => {
        const code = '#program activationAmount 5_0000_0000'
        const assembly = '^program activationAmount 500000000\n^declare r0\n^declare r1\n^declare r2\n\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
        expect(compiler.getMachineCode().PActivationAmount).toBe('500000000')
    })
    it('should compile: codeStackPages', () => {
        const code = '#program codeStackPages    10   \nlong a; void test(void) { a++; return; a++; }'
        const assembly = '^program codeStackPages 10\n^declare r0\n^declare r1\n^declare r2\n^declare a\n\nFIN\n\n__fn_test:\nINC @a\nRET\nINC @a\nRET\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    it('should compile: codeStackPages  userStackPages ', () => {
        const code = '#program codeStackPages    0   \n#program userStackPages 5\n long a; void test(long aa) { a++; return; a++; }'
        const assembly = '^program userStackPages 5\n^declare r0\n^declare r1\n^declare r2\n^declare a\n^declare test_aa\n\nFIN\n\n__fn_test:\nPOP @test_aa\nINC @a\nRET\nINC @a\nRET\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    test('should throw: codeStackPages wrong usage', () => {
        expect(() => {
            const code = '#program codeStackPages a\n#program userStackPages  0\nlong a; void test(void) { a++; return; a++; }'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: userStackPages wrong usage', () => {
        expect(() => {
            const code = '#program codeStackPages 1\n#program userStackPages  100\nlong a; void test(void) { a++; return; a++; }'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: unknow value', () => {
        expect(() => {
            const code = '#program abdeabdes 1'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
})

describe('#pragma', () => {
    it('should compile: outputSourceLineNumber', () => {
        const code = '#pragma outputSourceLineNumber\nlong a=5;\nif (a==6){\na--;\n}\n'
        const assembly = '^declare r0\n^declare r1\n^declare r2\n^declare a\n\n^comment line 2\nSET @a #0000000000000005\n^comment line 3\nSET @r0 #0000000000000006\nBNE $a $r0 :__if1_endif\n__if1_start:\n^comment line 4\nDEC @a\n__if1_endif:\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    it('should compile: maxAuxVars', () => {
        const code = '#pragma maxAuxVars 6'
        const assembly = '^declare r0\n^declare r1\n^declare r2\n^declare r3\n^declare r4\n^declare r5\n\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    it('should compile: maxConstVars', () => {
        const code = '#pragma maxConstVars 3'
        const assembly = '^declare r0\n^declare r1\n^declare r2\n^declare n1\n^const SET @n1 #0000000000000001\n^declare n2\n^const SET @n2 #0000000000000002\n^declare n3\n^const SET @n3 #0000000000000003\n\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    it('should compile: reuseAssignedVar', () => {
        const code = '#pragma reuseAssignedVar false\nlong a, b;a = b+1;'
        const assembly = '^declare r0\n^declare r1\n^declare r2\n^declare a\n^declare b\n\nSET @r0 $b\nINC @r0\nSET @a $r0\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    it('should compile: enableRandom', () => {
        const code = '#pragma maxAuxVars 1\n#pragma enableRandom true\nlong a; if (a) a++;'
        const assembly = /^\^declare r0\n\^declare a\n\nBZR \$a :__if\w{5}_endif\n__if\w{5}_start:\nINC @a\n__if\w{5}_endif:\nFIN\n$/g
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toMatch(assembly)
    })
    it('should compile: enableLineLabels', () => {
        const code = '#pragma enableLineLabels true\nlong a;\nif (a) a++;'
        const assembly = '^declare r0\n^declare r1\n^declare r2\n^declare a\n\nBZR $a :__if3_1_endif\n__if3_1_start:\nINC @a\n__if3_1_endif:\nFIN\n'
        const compiler = new SmartC({ language: 'C', sourceCode: code })
        compiler.compile()
        expect(compiler.getAssemblyCode()).toBe(assembly)
    })
    test('should throw: expecting other compiler version', () => {
        expect(() => {
            const code = '#pragma version abcd\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^This compiler is version/)
    })
    test('should throw: maxAuxVars invalid parameter', () => {
        expect(() => {
            const code = '#pragma maxAuxVars a\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: maxAuxVars invalid parameter', () => {
        expect(() => {
            const code = '#pragma maxAuxVars 22\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: maxConstVars invalid parameter', () => {
        expect(() => {
            const code = '#pragma maxConstVars a\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: maxConstVars invalid parameter', () => {
        expect(() => {
            const code = '#pragma maxConstVars 22\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: wrong boolean value', () => {
        expect(() => {
            const code = '#pragma enableLineLabels 10\nlong a;\nif (a) a++;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
})
describe('#include and misc', () => {
    test('should throw: unknow directive', () => {
        expect(() => {
            const code = '#include apiapi abcd\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
    test('should throw: unknow #directive', () => {
        expect(() => {
            const code = '#inclu APIFunctions\nlong a;'
            const compiler = new SmartC({ language: 'C', sourceCode: code })
            compiler.compile()
        }).toThrowError(/^At line/)
    })
})
