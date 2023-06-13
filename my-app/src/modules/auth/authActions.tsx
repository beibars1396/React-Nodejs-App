import { AuthToken } from "./authToken";
import service from './authService';
import Errors from '../shared/error/errors'
import { getHistory } from "../store";
import Message from "../../view/shared/message";

const prefix = "AUTH";

const authActions = {
    ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

    UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
    UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
    UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

    FETCH_START: `${prefix}_FETCH_START`,
    FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
    FETCH_ERROR: `${prefix}_FETCH_ERROR`,

    FETCH_LIST_START: `${prefix}_FETCH_LIST_START`,
    FETCH_LIST_SUCCESS: `${prefix}_FETCH_LIST_SUCCESS`,
    FETCH_LIST_ERROR: `${prefix}_FETCH_LIST_ERROR`,

    CURRENT_USER_REFRESH_START: `${prefix}_CURRENT_USER_REFRESH_START`,
    CURRENT_USER_REFRESH_SUCCESS: `${prefix}_CURRENT_USER_REFRESH_SUCCESS`,
    CURRENT_USER_REFRESH_ERROR: `${prefix}_CURRENT_USER_REFRESH_ERROR`,

    AUTH_START: `${prefix}_START`,
    AUTH_SUCCESS: `${prefix}_SUCCESS`,
    AUTH_ERROR: `${prefix}_ERROR`,

    PASSWORD_CHANGE_START: `${prefix}_PASSWORD_CHANGE_START`,
    PASSWORD_CHANGE_SUCCESS: `${prefix}_PASSWORD_CHANGE_SUCCESS`,
    PASSWORD_CHANGE_ERROR: `${prefix}_PASSWORD_CHANGE_ERROR`,

    AUTH_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
    AUTH_INIT_ERROR: `${prefix}_INIT_ERROR`,

    doClearErrorMessage(){
        return {
            type: authActions.ERROR_MESSAGE_CLEARED
        }
    },

    doInit: () => async (dispatch: any) => {
        try{
            const token = AuthToken.get();
            let currentUser = null;

            if(token) {
                currentUser = await service.fetchMe();
            }

            dispatch({
                type: authActions.AUTH_INIT_SUCCESS,
                payload: {
                    currentUser
                }
            })
        } catch (error) {
            service.signout();
            Errors.handle(error);

            dispatch({
                type: authActions.AUTH_INIT_ERROR,
                payload: error
            });
        }
    },

    doChangePassword: (oldPassword: any, newPassword: any) => async (
        dispatch: any
    ) => {
        try{
            dispatch({
                type: authActions.PASSWORD_CHANGE_START
            });

            await service.changePassword(
                oldPassword,
                newPassword
            );

            dispatch({
                type: authActions.PASSWORD_CHANGE_SUCCESS
            });

            await dispatch(authActions.doRefreshCurrentUser());
            Message.success('Успешно');
            getHistory().push('/')
        } catch(error) {
            Errors.handle(error);
            dispatch({
                type: authActions.PASSWORD_CHANGE_ERROR
            })
        }
    },

    doRefreshCurrentUser: () => async (dispatch: any) => {
        try {
            dispatch({
                type: authActions.CURRENT_USER_REFRESH_START
            });

            let currentUser = null;
            const token = AuthToken.get();

            if(token) {
                currentUser = await service.fetchMe();
            }

            dispatch({
                type: authActions.CURRENT_USER_REFRESH_SUCCESS,
                payload: { 
                    currentUser
                }
            })

        } catch(error) {
            service.signout()
            Errors.handle(error);

            dispatch({
                type: authActions.CURRENT_USER_REFRESH_ERROR,
                payload: error
            })
        }
    },

    doUpdateProfile: (data: any) => async (dispatch: any) => {
        try {
            dispatch({
                type: authActions.UPDATE_PROFILE_START
            });

            await service.updateProfile(data);

            dispatch({
                type: authActions.UPDATE_PROFILE_SUCCESS
            })

            await dispatch(authActions.doRefreshCurrentUser());
            Message.success('Успешно');
            getHistory().push('/');

        } catch (error) {

        }
    },

    doRegisterEmailAndPassword: (
        email: any, password: any
    ) => async (dispatch: any) => {
        try {
            dispatch({ 
                type: authActions.AUTH_START 
            });

            let currentUser = null;

            const token = await service.registerWithEmailAndPassword(
                email,
                password
            );

            AuthToken.set(token, true);
            currentUser = await service.fetchMe();

            dispatch({
                type: authActions.AUTH_SUCCESS,
                payload: {
                    currentUser
                }
            });

            Message.success('Успешная Регистрация');
            getHistory().push('/');
        } catch (error) {
            await service.signout();

            if(Errors.errorCode(error) !== 400) {
                Errors.handle(error);
            }

            dispatch({
                type: authActions.AUTH_ERROR,
                payload: Errors.selectMessage(error)
            })
        }
    },

    doSignout: () => async (dispatch: any) => {
        try{
            dispatch({ type: authActions.AUTH_START });
            await service.signout();

            dispatch({
                type: authActions.AUTH_SUCCESS,
                payload: {
                    currentUser: null
                }
            })
        } catch(error) {
            Errors.handle(error);

            dispatch({
                type: authActions.AUTH_ERROR
            })
        }
    },

    doSigninWithEmailAndPassword: (
        email: string,
        password: string,
        rememberMe: boolean
    ) => async (dispatch) => {
        try {
            dispatch({
                type: authActions.AUTH_START
            });

            let currentUser = null;

            const token = await service.signinWithEmailAndPassword(
                email,
                password
            );

            AuthToken.set(token, rememberMe);
            currentUser = await service.fetchMe();

            dispatch({
                type: authActions.AUTH_SUCCESS,
                payload: { currentUser }
            });
        } catch (error) {
            await service.signout();

            if(Errors.errorCode(error) !== 400) {
                Errors.handle(error) 
            }

            dispatch({
                type: authActions.AUTH_ERROR,
                payload: Errors.selectMessage(error)
            })
        }
    }
}

export default authActions;