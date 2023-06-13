import { Box, Table, TableHead } from "@mui/material";


export default function TodoListTable(){


    return(
        <>
            <Box
                style={{
                    display: "block",
                    width: '100%',
                    overflowX: 'auto'
                }}
            >
                <Table
                    style={{
                        borderRadius: '5px',
                        border: '1px solid rgb(224, 224, 224)',
                        borderCollapse: 'initial'
                    }}
                >
                    <TableHead>

                    </TableHead>
                    
                </Table>
            </Box>
        </>
    )
}