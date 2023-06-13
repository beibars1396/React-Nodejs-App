import actions from './authActions';

export default (store: { dispatch: (arg0: any) => void; }) => {
    store.dispatch(actions.doInit());
};