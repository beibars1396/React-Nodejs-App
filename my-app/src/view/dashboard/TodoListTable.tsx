import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import TableCellCustom from "view/table/TableCellCustom";
import selectors from 'modules/todolist/todolistSelectors';
import actions from 'modules/todolist/todolistActions';
import Spinner from "view/shared/Spinner";
import Pagination from "view/table/Pagination";
import { useAppDispatch } from "modules/store";

export default function TodoListTable(){
    const dispatch = useAppDispatch();

    const loading = useSelector(selectors.selectLoading);
    const hasRows = useSelector(selectors.selectHasRows);
    const sorter = useSelector(selectors.selectSorter);
    const rows = useSelector(selectors.selectRows);
    const pagination = useSelector(selectors.selectPagination);

    const doChangeSort = (field) => {
        const order = sorter.field === field && field.order === 'asc' ? 'desc' : 'asc'
        dispatch(
            actions.doChangeSort({
                field,
                order
            })
        )
    } 

    const doChangePagination = (pagination) => {
        dispatch(actions.doChangePagination(pagination));
    };

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
                        <TableRow>
                            <TableCellCustom
                                onSort={doChangeSort}
                                hasRows={hasRows}
                                sorter={sorter}
                                name={'userName'}
                                label={'Имя Пользователя'}
                            />
                            <TableCellCustom
                                onSort={doChangeSort}
                                hasRows={hasRows}
                                sorter={sorter}
                                name={'createdByEmail'}
                                label={'Email'}
                            />
                            <TableCellCustom
                                onSort={doChangeSort}
                                hasRows={hasRows}
                                sorter={sorter}
                                name={'TextTask'}
                                label={'Текст Задачи'}
                            />
                            <TableCellCustom
                                onSort={doChangeSort}
                                hasRows={hasRows}
                                sorter={sorter}
                                name={'status'}
                                label={'статус'}
                            />
                            {/* <TableCellCustom>
                                Имя Пользователя
                            </TableCellCustom>
                            <TableCellCustom>
                                Email
                            </TableCellCustom>
                            <TableCellCustom>
                                Текст Задачи
                            </TableCellCustom>
                            <TableCellCustom>
                                Статус
                            </TableCellCustom> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={100}>
                                    <Spinner />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && !hasRows && (
                            <TableRow>
                                <TableCell colSpan={100}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        Пусто
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={10}
                page={pagination.current-1}
                onPageChange={doChangePagination}
                // onRowsPerPageChange={(event) =>
                //     onChangeRowsPerPage(+event.target.value)}
            /> */}
            <Pagination
                onChange={doChangePagination}
                disabled={loading}
                pagination={pagination}
            />
        </>
    )
}