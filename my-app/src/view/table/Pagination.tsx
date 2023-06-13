import React from 'react';
import PropTypes from 'prop-types';
import {
  TablePagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PaginationWrapper from 'view/shared/styles/PaginationWrapper';

function Pagination(props) {
  const theme = useTheme();

  const onChangeRowsPerPage = (pageSize) => {
    props.onChange({
      current: 1,
      pageSize: pageSize || 10,
    });
  };

  const onChangePage = (event, current) => {
    const pageSize = Number(
      props.pagination.pageSize || 10,
    );
    props.onChange({
      current: current + 1,
      pageSize,
    });
  };

  const { pagination } = props;
  const { current, pageSize, total } = pagination;
  const labelDisplayedRows =
    props.labelDisplayedRows 
    // ||
    // (({ from, to, count }) =>
    //   i18n(
    //     'pagination.labelDisplayedRows',
    //     from,
    //     to,
    //     count,
    //   ));

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <PaginationWrapper>
      <TablePagination

      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={total}
      rowsPerPage={10}
      page={current-1}
      onPageChange={onChangePage} 
      labelRowsPerPage={
        isSmUp ? '' : ''
      }
      onRowsPerPageChange={(event) =>
        onChangeRowsPerPage(+event.target.value)}

        // rowsPerPageOptions={[5, 10, 25]}
        // component="div"
        // count={total}
        // rowsPerPage={Number(pageSize)}
        // page={current-1}
        // onChangePage={onChangePage}
        // onChangeRowsPerPage={(event) =>
        //   onChangeRowsPerPage(+event.target.value)
        // labelDisplayedRows={labelDisplayedRows}
        // labelRowsPerPage={
        //   isSmUp ? '' : ''
        // }
        // count={total}
        // page={current - 1}
        // onChangePage={onChangePage}
        // onChangeRowsPerPage={(event) =>
        //   onChangeRowsPerPage(+event.target.value)
        // }
      />
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  labelDisplayedRows: PropTypes.func,
};

export default Pagination;