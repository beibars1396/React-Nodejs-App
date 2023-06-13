import authService from "../../auth/authService";
import { getHistory } from '../../store';
import Message from "../../../view/shared/message";

const DEFAULT_ERROR_MESSAGE = 'errors.defaultErrorMessage';

function selectErrorKeyOrMessage(error: any) {
    if (error && error.response && error.response.data) {
        const data = error.response.data;
    
        if (data.error && data.error.message) {
            return data.error.message;
        }
    
        return String(data);
    }
  
    return error.message || DEFAULT_ERROR_MESSAGE;
}
  
function selectErrorMessage(error: any) {
    const key = selectErrorKeyOrMessage(error);

    return key;
}

function selectErrorCode(error: any) {
    if(error && error.response && error.response.status) {
        return error.response.status;
    }

    return 500;
}

export default class Errors {
    static handle(error: any) {
        if (process.env.NODE_ENV !== 'test') {
            console.error(selectErrorMessage(error));
            console.error(error);
        }

        if (selectErrorCode(error) === 401) {
            authService.signout();
            (window as any).location.reload();
            return;
        }

        if (selectErrorCode(error) === 403) {
            getHistory().push('/403');
            return;
        }

        if ([400, 429].includes(selectErrorCode(error))) {
            Message.error(selectErrorMessage(error));
            return;
        }
  
        getHistory().push('/500');
    }
  
    static errorCode(error: any) {
        return selectErrorCode(error);
    }
  
    static selectMessage(error: any) {
        return selectErrorMessage(error);
    }
  
    static showMessage(error: any) {
        Message.error(selectErrorMessage(error));
    }
}
  