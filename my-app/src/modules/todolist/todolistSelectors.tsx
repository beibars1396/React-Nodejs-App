import { createSelector } from 'reselect';
import authSelectors from "modules/auth/authSelectors";
import PermissionChecker from "modules/auth/permissionChecker";
import Permissions from "security/permissions";

const selectRaw = (state) => state.todolist;

const selectLimit = createSelector([selectRaw], (raw) => {
    const pagination = raw.pagination;
    return pagination.pageSize;
});

const selectSorter = createSelector(
    [selectRaw],
    (raw) => raw.sorter || {},
);

const selectCount = createSelector(
    [selectRaw],
    (raw) => raw.count,
);

const selectHasRows = createSelector(
    [selectCount],
    (count) => count > 0,
);

const selectOffset = createSelector([selectRaw], (raw) => {
    const pagination = raw.pagination;

    if (!pagination || !pagination.pageSize) {
      return 0;
    }

    const current = pagination.current || 1;

    return (current - 1) * pagination.pageSize;
});

const selectOrderBy = createSelector([selectRaw], (raw) => {
    const sorter = raw.sorter;

    if (!sorter) {
      return null;
    }

    if (!sorter.field) {
      return null;
    }

    let direction = sorter.order === 'desc' ? 'DESC' : 'ASC';

    return `${sorter.field}_${direction}`;
});

const selectRawFilter = createSelector(
    [selectRaw],
    (raw) => {
        return raw.rawFilter;
    },
);

const selectLoading = createSelector(
    [selectRaw],
    (raw) => raw.loading,
);

const selectRows = createSelector(
    [selectRaw],
    (raw) => raw.rows,
);

const selectSelectedKeys = createSelector(
    [selectRaw],
    (raw) => {
        return raw.selectedKeys;
    },
);

const selectFilter = createSelector([selectRaw], (raw) => {
    return raw.filter;
});

const selectPagination = createSelector(
    [selectRaw, selectCount],
    (raw, count) => {
        return {
            ...raw.pagination,
            total: count,
        };
    },
);

const selectIsAllSelected = createSelector(
    [selectRows, selectSelectedKeys],
    (rows, selectedKeys) => {
        return rows.length === selectedKeys.length;
    },
);

const selectExportLoading = createSelector(
    [selectRaw],
    (raw) => raw.exportLoading,
);

const selectSelectedRows = createSelector(
    [selectRaw, selectRows],
    (raw, rows) => {
        return rows.filter((row) =>
            raw.selectedKeys.includes(row.id),
        );
    },
);

const selectPermissionToEdit = createSelector(
    [
        authSelectors.selectCurrentUser
    ],
    (currentUser) => new PermissionChecker(currentUser).match(
        Permissions.values.adminPermissions
    )
);

const selectPermissionToDestroy = createSelector(
    [
        authSelectors.selectCurrentUser
    ],
    (currentUser) => new PermissionChecker(currentUser).match(
        Permissions.values.adminPermissions
    )
);

const todolistSelectors = {
    selectFilter,
    selectSelectedKeys,
    selectExportLoading,
    selectRows,
    selectSelectedRows,
    selectLoading,
    selectIsAllSelected,
    selectHasRows,
    selectPagination,
    selectRawFilter,
    selectOffset,
    selectOrderBy,
    selectLimit,
    selectPermissionToEdit,
    selectPermissionToDestroy,
    selectSorter
}

export default todolistSelectors; 