import Errors from 'modules/shared/error/errors';
import TodolistService from './todolistService';
import Message from 'view/shared/message';
import selectors from './todolistSelectors';
// import StatusesService from 'modules/statuses/statusesService';

const prefix = 'TODOLIST_LIST';

const todolistActions = {
    TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
    TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
    CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

    FETCH_STARTED: `${prefix}_FETCH_STARTED`,
    FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
    FETCH_ERROR: `${prefix}_FETCH_ERROR`,

    PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
    SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

    EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
    EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
    EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

    DESTROY_ALL_SELECTED_STARTED: `${prefix}_DESTROY_ALL_SELECTED_STARTED`,
    DESTROY_ALL_SELECTED_SUCCESS: `${prefix}_DESTROY_ALL_SELECTED_SUCCESS`,
    DESTROY_ALL_SELECTED_ERROR: `${prefix}_DESTROY_ALL_SELECTED_ERROR`,

    DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
    DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
    DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

    RESETED: `${prefix}_RESETED`,

    doFetch: (filter?, rawFilter?, keepPagination = false) => async (
        dispatch,
        getState,
    ) => {
        try {
            dispatch({
                type: todolistActions.FETCH_STARTED,
                payload: { filter, rawFilter, keepPagination },
            });

            const response = await TodolistService.fetchTodolist(
                filter,
                selectors.selectOrderBy(getState()),
                selectors.selectLimit(getState()),
                selectors.selectOffset(getState()),
            );

            dispatch({
                type: todolistActions.FETCH_SUCCESS,
                payload: {
                    rows: response,
                    // rows: response.rows,
                    count: response.count,
                },
            });
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: todolistActions.FETCH_ERROR,
            });
        }
    },

    doChangeSort: (sorter) => async (dispatch, getState) => {
        dispatch({
          type: todolistActions.SORTER_CHANGED,
          payload: sorter,
        });
    
        const filter = selectors.selectFilter(getState());
        const rawFilter = selectors.selectRawFilter(getState());
        dispatch(todolistActions.doFetch(filter, rawFilter, true));
      },

    doClearAllSelected() {
        return {
            type: todolistActions.CLEAR_ALL_SELECTED,
        };
    },

    doReset: () => async (dispatch) => {
        dispatch({
          type: todolistActions.RESETED,
        });

        dispatch(todolistActions.doFetch());
    },  

    doDestroyAllSelected: () => async (
        dispatch,
        getState,
    ) => {
        try {
          const selectedRows = selectors.selectSelectedRows(
            getState(),
          );

          dispatch({
            type: todolistActions.DESTROY_ALL_SELECTED_STARTED,
          });

          await TodolistService.destroy(
            selectedRows.map((row) => row.id),
          );

          dispatch({
            type: todolistActions.DESTROY_ALL_SELECTED_SUCCESS,
          });

          Message.success(
            'Успешно',
          );

          dispatch(todolistActions.doFetchCurrentFilter());
        } catch (error) {
          Errors.handle(error);

          dispatch({
            type: todolistActions.DESTROY_ALL_SELECTED_ERROR,
          });

          dispatch(todolistActions.doFetchCurrentFilter());
        }
    },

    doDestroy: (id) => async (dispatch, getState) => {
        try {
            dispatch({
                type: todolistActions.DESTROY_STARTED,
            });

            await TodolistService.destroy([id]);

            dispatch({
                type: todolistActions.DESTROY_SUCCESS,
            });

            Message.success('Успешно');

            dispatch(todolistActions.doFetchCurrentFilter());
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: todolistActions.DESTROY_ERROR,
            });

            dispatch(todolistActions.doFetchCurrentFilter());
        }
    },

    doFetchCurrentFilter: () => async (
        dispatch,
        getState,
    ) => {
        const filter = selectors.selectFilter(getState());
        const rawFilter = selectors.selectRawFilter(getState());
        dispatch(todolistActions.doFetch(filter, rawFilter, true));
    },

    doChangePagination: (pagination) => async (
        dispatch,
        getState,
    ) => {
        dispatch({
            type: todolistActions.PAGINATION_CHANGED,
            payload: pagination,
        });

        dispatch(todolistActions.doFetchCurrentFilter());
    },

    doToggleOneSelected(id) {
        return {
            type: todolistActions.TOGGLE_ONE_SELECTED,
            payload: id,
        };
    },

    doToggleAllSelected() {
        return {
            type: todolistActions.TOGGLE_ALL_SELECTED,
        };
    },
}

export default todolistActions;