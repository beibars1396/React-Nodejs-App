import actions from './authActions';

const initialData = {
  currentUser: null,
  loadingInit: true,
  loadingEmailConfirmation: false,
  loadingPasswordResetEmail: false,
  loadingPasswordChange: false,
  loadingVerifyEmail: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
  errorMessageVerifyEmail: null,
  activeShift: null,
  activeShiftsList: null
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_ERROR) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (type === actions.FETCH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true
    }
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      activeShift: payload.activeShift || null,
      // activeShiftsList: payload.activeShiftsList || null,
      // ??? fetch reducer
      errorMessage: null,
      loading: false
    }
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      activeShift: null,
      // activeShiftsList: null,
      errorMessage: payload || null,
      loading: false,
    }
  }

  if (type === actions.FETCH_LIST_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true
    }
  }

  if (type === actions.FETCH_LIST_SUCCESS) {
    return {
      ...state,
      activeShiftsList: payload.activeShiftsList || null,
      errorMessage: null,
      loading: false
    }
  }

  if (type === actions.FETCH_LIST_ERROR) {
    return {
      ...state,
      activeShiftsList: null,
      errorMessage: payload || null,
      loading: false
    }
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      currentUser: null,
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_START) {
    return {
      ...state,
      loadingPasswordChange: true,
    };
  }

  if (type === actions.PASSWORD_CHANGE_SUCCESS) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_ERROR) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      currentUser: null,
      loadingInit: false,
    };
  }

  return state;
};
