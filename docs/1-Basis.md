[Back](./)

## Language rules
This project aims to be as close to C as possible. But given special characteristics in Signum assembly language (derived from CIYAM) some differences will occur.

### Comments
As C, can be one line `//` or multi-line `/* .... */`;

### Keywords
Some keywords have the same meaning and use in C: `asm`, `break`, `continue`, `do`, `else`, `for`, `goto`, `if`, `long`, `return`, `struct`, `void`, `while`. Note differences for keywords:
* `const`: Actually this will tell compiler to set a value to a variable at the contract creation. No problem setting it a value and then changing it later. It can be used during variable declaration or later, but it can be set only once. Using const can reduce the number of codepages of your program. Examples: `const long i=5;` to seta long; `long a[4]; const a[0]=5;` to set values for array.

There are also additional keywords:
* `sleep N`: Puts the contract in 'sleep' mode during N blocks. Argument N must be specified and can be an expression. `sleep 1;` makes your contract to stop being processed at current block and resumes it at next one.
* `exit`: Puts the contract in 'stop' mode and set program to restart from main function ('finished' mode). It will be inactive until a new transaction is received. Once a tx is received, it will start execution at `void main(void)` function. If main function is not defined, it will start again from beginning of code. `exit` takes no argument. If contract activation amount is zero, contract will resume execution on next block.
* `halt`: Puts the contract in 'stop' mode. It will be inactive until a new transaction is received, then it will resume execution at next instruction. It takes no argument. If contract activation amount is zero, contract will resume execution on next block.

Others keyword have no assembly support. They are disabled: `auto`, `double`, `float`, `register`, `volatile`. For future implementation these keywords can be added: `case`, `char`, `default`, `enum`, `extern`, `int`, `short`, `sizeof`, `signed`, `static`, `switch`, `typedef`, `union`, `unsigned`.

### Macros
Some special features can be enabled/disable via preprocessor directives:
#### #program
* `#program name YourProgramName`: Set program's name. Only regular letters and numbers allowed, max 30 chars in length.
* `#program description Your program description`: Set program's description. No new lines and max length is 1000 chars.
* `#program activationAmount 100000000`: Set program's activation amount in NQT (1 Signum = 100000000 NQT). If an incoming transaction has an amount is less than this value, it will not be processed by program (but the amount will be received!). Set a low value but bigger than worst case amount needed to run in your program. If set too low, your program will be frozen during execution (out of gas). If set too high, program balance will be high after execution (unburned balance). Remember to handle this case if creating serious program!
#### #include
* `#include APIFunctions [true/false/1/0/]`: Make Signum API functions available for use as functions. Default value is `false`. It can be enabled by declaring it with empty argument, `true` or `1`. Function names follow the [ciyam at documentation](https://ciyam.org/at/at_api.html). All API names and a pseudo-code are avaliable also in section **API Pseudo-Code**.
#### #define
* `#define CNAME`: Just define CNAME with an empty value, or delete its content if it was previously defined.
* `#define CNAME value or expression`: Replaces all ocurrences of 'CNAME' to 'value or expression' starting on next line. Compiler defines: `true` for 1; `false` and `NULL` for 0; `SMARTC` with empty value.
* `#undef CNAME`: Undefine CNAME.
* `#ifdef CNAME`: Start a block to be included if CNAME is defined. Note that CNAME value does not matter and can be empty value. Block must end with a '#endif' directive. Blocks can be nested.
* `#ifndef CNAME`: Complementary of '#ifdef'. Includes a block if CNAME is not defined.
* `#else`: Can be used with '#ifdef' or '#ifndef' to toggle the addition of some source code block.
* `#endif`: Ends a block to be included.

#### #pragma
* `#pragma codeStackPages N`: Code pages are used during function calls, to store the instruction pointer return position (also know as Program Counter). Default value is zero if not needed, or one if needed. Every page allows to store 16 values. Tweak this value if using many nested functions or recursive functions. Maximum value is 10 pages.
* `#pragma userStackPages N`: User pages are used during function calls to pass arguments values, to store function return value, or to store function scope variables during recursive calls. Default value is zero if not needed, or one if needed. Tweak this value if using more than 16 arguments on functions or recursive functions. Maximum value is 10 pages.
* `#pragma enableRandom [true/false/1/0/]`: Makes labels for jumps and conditionals receive a random value. Default value is `false`. Default behaviour is labels having an increasing number starting with 1 (number is base 36).
* `#pragma enableLineLabels [true/false/1/0/]`: Adds line number to labels in assembly. Only usefull for debug purposes. Default value is `false`.
* `#pragma globalOptimization [true/false/1/0/]`: Adds a final step to the compiler where generated code will be optimized. Default value is `false` until more tests are done. Makes generated assembly code even less readable, removing labels not referenced by jumps.
* `#pragma maxAuxVars N`: Used to tell compiler how many auxiliary variables will be available (they are used as registers). Default value is `3`, min value is `1` and max is `10`. If you are under memory pressure, try to reduce to minimal necessary for compiling. Simple contracts will use around 2 values, but this number depends on nested operations.
* `#pragma maxConstVars N`: Compiler will create variable from 1 to maxConstVars. Variables will be named 'n1', 'n2', ... 'n10'. It is very usefull to use, because compiler will change all numbers references to these variables and optimize code, making code much much smaller! Default min value is `0` (deactivated) and max is `10`.
* `#pragma reuseAssignedVar [true/false/1/0/]`: When set, compiler will try to use a variable on left side of and `Assignment` as a register. If variable is also used on right side, the compiler will not reuse it. This can save one assembly instruction for every expression used! Default value is `true` and it is highly recomended to maintain it active.
* `#pragma version N`: Informs which compiler's version the code was developed. Must be set if not using development version. To skip this check, set it to `dev`.
* `#pragma warningToError [true/false/1/0/]`: All warnings to compiler errors. Default value is `true`. Warning messages begin with WARNING, other ones are actually errors.
* `#pragma outputSourceLineNumber[true/false/1/0/]`: Adds a comment in assembly output with the corresponding line number to the C source code. Very usefull for debug.

### Variables
At the moment, only `long` values are implemented. User can assign them with decimal values (default) (floating point not allowed) `i=2;`, hexadecimal values `i=0xff;`, strings (up to 8 bytes) `msg="Hello!";` or Signum addresses `addr="S-297Z-EKMN-4AVV-7YWXP";` (also valid starting with BURST or TS). Long values can be assigned during their declaration.
Arrays can be declared but can be initialized only at a later instruction. Declaration of an array with 5 elements (0 to 4): `long arr[5];`. Use as in C: `arr[1]=4;`. Multi-long values can be set `arr[]='This is a text message';`. To clear the entire array: `arr[]=0;`. It is possible to get an array length a member operation: `size = arr.length;` 
Structs use same notation in C. Structs pointers can also be used. To access a member, use `.` or `->` depending if struct is already allocated in memory  or if it is a pointer to the memory location. Arrays of structs, arrays inside structs and recursive pointer definition are also supported.
All variables are initialized with value `0` at the first time the contract is executed, unless other value is set by `const` statement.
All variables are similar to `static` in C. So every time a function is called or the smart contract receives a transaction, all variables will keep their last value. To avoid this behavior in functions, declare variables setting them a initial value: `long i=0;`.
Global variables are available in all functions. Functions variables can only be used inside the function.
Variables declarations can not be inside other sentences, like `for (long i; i<10; i++)` or `if (a){ long i=0; ...}`.

### Functions
As avaliable in C, the developer can make use of functions to make coding easier or reuse code from other projects. There is no need to put function prototypes at the beginning, the function can be used before it is declared, because their definitions are collected a step before the compiling process. Functions arguments and return values are passed using user stack. Recursive functions are allowed but developer must set manually and carefully a new size for "user stack pages" thru macro definition. There are two special functions: `void main(void)` explained before and `void catch(void)` explained at **Contract states** topic. It is not obligatory to use them.
Functions can return also arrays and structs; the returning values can be used directly: example `if ( arrFn(a)[2] == 25 )` or `b = structFn(a)->value;`

### Global statements
All global statements are grouped at the beginning of assembly code (even if after functions or end of file). When the contracted is executed first time, it does not begin at main function, but will start at the beginning of file and run all global statements. If there is a main function, it will be then executed during this first run. If you stop execution in global statements (with `exit`), the main function will not be processed and the starting point for next transactions will be the start of code. In this case (not using main function) use `halt` keyword to wait next transaction.

### Contract states
* Finished: Contract execution ended at a `exit` instruction or at the end of 'main' function. On next activation it will start at 'main'.
* Stopped: Contract execution ended at a `halt` of `sleep` instruction. On next resume it will start just after current point.
* Frozen: Execution was suspended because there was no more balance in contract account (no gas!). To resume execution, contract must receive a new transaction with an amount greater or equal its minimum activation. If transaction is below this amount, it will stay frozen even with some balance.
* Dead: Execution raised one of these exceptions: 1) division by zero; 2) trying to read/set a variable outside memory range; or 3) stack overflow/underflow for user/code stack. The default behaviour is all contract balance to be distributed as fee for current block forger. Also any next transaction to that dead contract will be transformed in fee. To avoid this situation, it is possible to define a special function `void catch(void)`. When the exception is found, the execution will jump to 'catch' function and a new entry point for next incoming transactions will be set. A use case for 'catch' function is to send all balance to creator to avoid losing contract balance. When using 'catch' function the contract will never reach dead state.

### Designing tips
If you plan to use a number many times, declare it globally with `const` keyword and name it with `nVALUE`: example `const long n65535=65535`. This can save one instruction for each use and also make your code smaller. But if you use it only a few times, or is under memory pressure, you can use constants at your code but making machine code bigger. For big programs it is more common be under codesize pressure, so this is a great exchange. The exception is Zero. Setting a variable to zero has an special assembly code. Comparisons against zero are also smaller than comparisons against variables. Comparisons against numbers are long assembly instrunctions. Try it to see assembly code genereated! If you are under memory pressure (or want to code smallest code possible) use global variables, because exchanging variables thru functions will cause they to be declared twice, pushed onto stack and popped at function.

### Main differences from C
* signed or unsigned: There is no difference between signed and unsigned longs. The rule is that all values behave as signed when comparing values or during arithmetic operations, but treated as unsigned during bit operations. Keep this in mind if developing with gcc.
* Precedence of operators: Rules are simpler in SmartC. Note differences in special for bitwise OR. Check assembly code or use parenthesis if in doubt.
* static: Variables by default are static in SmartC. Set values at the start of function if needed. Their values will not be changed in other functions unless variable is global.
* Initial value: By default all values are set to zero ar contract creation, so it is not need to initialize them with zero when needed.
* register: By default there are 3, from r0..r2. They can be used without declaration, but inspect assembly code to ensure they are not changed during other instructions. Different from registers in modern CPUs, these registers in SmartC are just regular variables created and used by compiler.

## Notes
* Run testcases to check tested operations. It shall be no failed cases.
* Please report a bug if any strange behavior is found.

[Back](./)
