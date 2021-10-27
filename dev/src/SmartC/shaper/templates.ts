import { SC_FUNCTION } from '../typings/contractTypes'
import { TYPE_DEFINITIONS } from '../typings/syntaxTypes'

export const defaultTypesTableTemplate: TYPE_DEFINITIONS[] = [
    {
        type: 'register',
        name: '',
        MemoryTemplate: {
            address: -1,
            name: '',
            asmName: '',
            type: 'register',
            scope: '',
            declaration: 'long',
            size: 1,
            isDeclared: true
        }
    }, {
        type: 'long',
        name: '',
        MemoryTemplate: {
            address: -1,
            name: '',
            asmName: '',
            type: 'long',
            scope: '',
            declaration: 'long',
            size: 1,
            isDeclared: false
        }
    }
]

export const APITableTemplate: SC_FUNCTION[] = [
    {
        argsMemObj: [],
        asmName: 'get_A1',
        declaration: 'long',
        name: 'Get_A1'
    },
    {
        argsMemObj: [],
        asmName: 'get_A2',
        declaration: 'long',
        name: 'Get_A2'
    },
    {
        argsMemObj: [],
        asmName: 'get_A3',
        declaration: 'long',
        name: 'Get_A3'
    },
    {
        argsMemObj: [],
        asmName: 'get_A4',
        declaration: 'long',
        name: 'Get_A4'
    },
    {
        argsMemObj: [],
        asmName: 'get_B1',
        declaration: 'long',
        name: 'Get_B1'
    },
    {
        argsMemObj: [],
        asmName: 'get_B2',
        declaration: 'long',
        name: 'Get_B2'
    },
    {
        argsMemObj: [],
        asmName: 'get_B3',
        declaration: 'long',
        name: 'Get_B3'
    },
    {
        argsMemObj: [],
        asmName: 'get_B4',
        declaration: 'long',
        name: 'Get_B4'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_A1_addr',
                type: 'long',
                scope: 'Set_A1',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_A1',
        declaration: 'void',
        name: 'Set_A1'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_A2_addr',
                type: 'long',
                scope: 'Set_A2',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_A2',
        declaration: 'void',
        name: 'Set_A2'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_A3_addr',
                type: 'long',
                scope: 'Set_A3',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_A3',
        declaration: 'void',
        name: 'Set_A3'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_A4_addr',
                type: 'long',
                scope: 'Set_A4',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_A4',
        declaration: 'void',
        name: 'Set_A4'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr1',
                asmName: 'Set_A1_A2_addr1',
                type: 'long',
                scope: 'Set_A1_A2',
                declaration: 'long',
                size: 1,
                isDeclared: true
            },
            {
                address: -1,
                name: 'addr2',
                asmName: 'Set_A1_A2_addr2',
                type: 'long',
                scope: 'Set_A1_A2',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_A1_A2',
        declaration: 'void',
        name: 'Set_A1_A2'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr1',
                asmName: 'Set_A3_A4_addr1',
                type: 'long',
                scope: 'Set_A3_A4',
                declaration: 'long',
                size: 1,
                isDeclared: true
            },
            {
                address: -1,
                name: 'addr2',
                asmName: 'Set_A3_A4_addr2',
                type: 'long',
                scope: 'Set_A3_A4',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_A3_A4',
        declaration: 'void',
        name: 'Set_A3_A4'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_B1_addr',
                type: 'long',
                scope: 'Set_B1',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_B1',
        declaration: 'void',
        name: 'Set_B1'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_B2_addr',
                type: 'long',
                scope: 'Set_B2',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_B2',
        declaration: 'void',
        name: 'Set_B2'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_B3_addr',
                type: 'long',
                scope: 'Set_B3',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_B3',
        declaration: 'void',
        name: 'Set_B3'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Set_B4_addr',
                type: 'long',
                scope: 'Set_B4',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_B4',
        declaration: 'void',
        name: 'Set_B4'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr1',
                asmName: 'Set_B1_B2_addr1',
                type: 'long',
                scope: 'Set_B1_B2',
                declaration: 'long',
                size: 1,
                isDeclared: true
            },
            {
                address: -1,
                name: 'addr2',
                asmName: 'Set_B1_B2_addr2',
                type: 'long',
                scope: 'Set_B1_B2',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_B1_B2',
        declaration: 'void',
        name: 'Set_B1_B2'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr1',
                asmName: 'Set_B3_B4_addr1',
                type: 'long',
                scope: 'Set_B3_B4',
                declaration: 'long',
                size: 1,
                isDeclared: true
            },
            {
                address: -1,
                name: 'addr2',
                asmName: 'Set_B3_B4_addr2',
                type: 'long',
                scope: 'Set_B3_B4',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'set_B3_B4',
        declaration: 'void',
        name: 'Set_B3_B4'
    },
    {
        argsMemObj: [],
        asmName: 'clear_A',
        declaration: 'void',
        name: 'Clear_A'
    },
    {
        argsMemObj: [],
        asmName: 'clear_B',
        declaration: 'void',
        name: 'Clear_B'
    },
    {
        argsMemObj: [],
        asmName: 'clear_A_B',
        declaration: 'void',
        name: 'Clear_A_And_B'
    },
    {
        argsMemObj: [],
        asmName: 'copy_A_From_B',
        declaration: 'void',
        name: 'Copy_A_From_B'
    },
    {
        argsMemObj: [],
        asmName: 'copy_B_From_A',
        declaration: 'void',
        name: 'Copy_B_From_A'
    },
    {
        argsMemObj: [],
        asmName: 'check_A_Is_Zero',
        declaration: 'long',
        name: 'Check_A_Is_Zero'
    },
    {
        argsMemObj: [],
        asmName: 'check_B_Is_Zero',
        declaration: 'long',
        name: 'Check_B_Is_Zero'
    },
    {
        argsMemObj: [],
        asmName: 'check_A_equals_B',
        declaration: 'long',
        name: 'Check_A_Equals_B'
    },
    {
        argsMemObj: [],
        asmName: 'swap_A_and_B',
        declaration: 'void',
        name: 'Swap_A_and_B'
    },
    {
        argsMemObj: [],
        asmName: 'OR_A_with_B',
        declaration: 'void',
        name: 'OR_A_with_B'
    },
    {
        argsMemObj: [],
        asmName: 'OR_B_with_A',
        declaration: 'void',
        name: 'OR_B_with_A'
    },
    {
        argsMemObj: [],
        asmName: 'AND_A_with_B',
        declaration: 'void',
        name: 'AND_A_with_B'
    },
    {
        argsMemObj: [],
        asmName: 'AND_B_with_A',
        declaration: 'void',
        name: 'AND_B_with_A'
    },
    {
        argsMemObj: [],
        asmName: 'XOR_A_with_B',
        declaration: 'void',
        name: 'XOR_A_with_B'
    },
    {
        argsMemObj: [],
        asmName: 'XOR_B_with_A',
        declaration: 'void',
        name: 'XOR_B_with_A'
    },
    {
        argsMemObj: [],
        asmName: 'add_A_to_B',
        declaration: 'void',
        name: 'Add_A_To_B'
    },
    {
        argsMemObj: [],
        asmName: 'add_B_to_A',
        declaration: 'void',
        name: 'Add_B_To_A'
    },
    {
        argsMemObj: [],
        asmName: 'sub_A_from_B',
        declaration: 'void',
        name: 'Sub_A_From_B'
    },
    {
        argsMemObj: [],
        asmName: 'sub_B_from_A',
        declaration: 'void',
        name: 'Sub_B_From_A'
    },
    {
        argsMemObj: [],
        asmName: 'mul_A_by_B',
        declaration: 'void',
        name: 'Mul_A_By_B'
    },
    {
        argsMemObj: [],
        asmName: 'mul_B_by_A',
        declaration: 'void',
        name: 'Mul_B_By_A'
    },
    {
        argsMemObj: [],
        asmName: 'div_A_by_B',
        declaration: 'void',
        name: 'Div_A_By_B'
    },
    {
        argsMemObj: [],
        asmName: 'div_B_by_A',
        declaration: 'void',
        name: 'Div_B_By_A'
    },
    {
        argsMemObj: [],
        asmName: 'MD5_A_to_B',
        declaration: 'void',
        name: 'MD5_A_To_B'
    },
    {
        argsMemObj: [],
        asmName: 'check_MD5_A_with_B',
        declaration: 'long',
        name: 'Check_MD5_A_With_B'
    },
    {
        argsMemObj: [],
        asmName: 'HASH160_A_to_B',
        declaration: 'void',
        name: 'HASH160_A_To_B'
    },
    {
        argsMemObj: [],
        asmName: 'check_HASH160_A_with_B',
        declaration: 'long',
        name: 'Check_HASH160_A_With_B'
    },
    {
        argsMemObj: [],
        asmName: 'SHA256_A_to_B',
        declaration: 'void',
        name: 'SHA256_A_To_B'
    },
    {
        argsMemObj: [],
        asmName: 'check_SHA256_A_with_B',
        declaration: 'long',
        name: 'Check_SHA256_A_With_B'
    },
    {
        argsMemObj: [],
        asmName: 'get_Block_Timestamp',
        declaration: 'long',
        name: 'Get_Block_Timestamp'
    },
    {
        argsMemObj: [],
        asmName: 'get_Creation_Timestamp',
        declaration: 'long',
        name: 'Get_Creation_Timestamp'
    },
    {
        argsMemObj: [],
        asmName: 'get_Last_Block_Timestamp',
        declaration: 'long',
        name: 'Get_Last_Block_Timestamp'
    },
    {
        argsMemObj: [],
        asmName: 'put_Last_Block_Hash_In_A',
        declaration: 'void',
        name: 'Put_Last_Block_Hash_In_A'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'A_To_Tx_After_Timestamp_addr',
                type: 'long',
                scope: 'A_To_Tx_After_Timestamp',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'A_to_Tx_after_Timestamp',
        declaration: 'void',
        name: 'A_To_Tx_After_Timestamp'
    },
    {
        argsMemObj: [],
        asmName: 'get_Type_for_Tx_in_A',
        declaration: 'long',
        name: 'Get_Type_For_Tx_In_A'
    },
    {
        argsMemObj: [],
        asmName: 'get_Amount_for_Tx_in_A',
        declaration: 'long',
        name: 'Get_Amount_For_Tx_In_A'
    },
    {
        argsMemObj: [],
        asmName: 'get_Timestamp_for_Tx_in_A',
        declaration: 'long',
        name: 'Get_Timestamp_For_Tx_In_A'
    },
    {
        argsMemObj: [],
        asmName: 'get_Ticket_Id_for_Tx_in_A',
        declaration: 'long',
        name: 'Get_Random_Id_For_Tx_In_A'
    },
    {
        argsMemObj: [],
        asmName: 'message_from_Tx_in_A_to_B',
        declaration: 'void',
        name: 'Message_From_Tx_In_A_To_B'
    },
    {
        argsMemObj: [],
        asmName: 'B_to_Address_of_Tx_in_A',
        declaration: 'void',
        name: 'B_To_Address_Of_Tx_In_A'
    },
    {
        argsMemObj: [],
        asmName: 'B_to_Address_of_Creator',
        declaration: 'void',
        name: 'B_To_Address_Of_Creator'
    },
    {
        argsMemObj: [],
        asmName: 'get_Current_Balance',
        declaration: 'long',
        name: 'Get_Current_Balance'
    },
    {
        argsMemObj: [],
        asmName: 'get_Previous_Balance',
        declaration: 'long',
        name: 'Get_Previous_Balance'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr',
                asmName: 'Send_To_Address_In_B_addr',
                type: 'long',
                scope: 'Send_To_Address_In_B',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'send_to_Address_in_B',
        declaration: 'void',
        name: 'Send_To_Address_In_B'
    },
    {
        argsMemObj: [],
        asmName: 'send_All_to_Address_in_B',
        declaration: 'void',
        name: 'Send_All_To_Address_In_B'
    },
    {
        argsMemObj: [],
        asmName: 'send_Old_to_Address_in_B',
        declaration: 'void',
        name: 'Send_Old_To_Address_In_B'
    },
    {
        argsMemObj: [],
        asmName: 'send_A_to_Address_in_B',
        declaration: 'void',
        name: 'Send_A_To_Address_In_B'
    },
    {
        argsMemObj: [
            {
                address: -1,
                name: 'addr2',
                asmName: 'Add_Minutes_To_Timestamp_addr2',
                type: 'long',
                scope: 'Add_Minutes_To_Timestamp',
                declaration: 'long',
                size: 1,
                isDeclared: true
            },
            {
                address: -1,
                name: 'addr3',
                asmName: 'Add_Minutes_To_Timestamp_addr3',
                type: 'long',
                scope: 'Add_Minutes_To_Timestamp',
                declaration: 'long',
                size: 1,
                isDeclared: true
            }
        ],
        asmName: 'add_Minutes_to_Timestamp',
        declaration: 'long',
        name: 'Add_Minutes_To_Timestamp'
    }
]