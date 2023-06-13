import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider, useSnackbar } from "notistack";
import { CssBaseline } from '@mui/material';
import { ConnectedRouter } from "connected-react-router";

import Message from "./view/shared/message";
import { configureStore, getHistory } from "./modules/store";
import RoutesComponent from './view/shared/routes/RoutesComponent';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

export default function App(props){
    return (
        <Provider store={store}>
        <AppWithRedux {...props} />
        </Provider>
    )

  function AppWithRedux(props) {
    return (
        <SnackbarProvider maxSnack={3}>
            <>
                <CssBaseline/>
                <AppWithSnackbar {...props}/>
            </>
        </SnackbarProvider>
    )
  }

  function AppWithSnackbar(props) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        Message.registerNotistackEnqueueSnackbar(
            enqueueSnackbar
        )
    }, [enqueueSnackbar]);

    return (
        <BrowserRouter>
            {/* <ConnectedRouter history={getHistory()}> */}
                <RoutesComponent />
            {/* </ConnectedRouter> */}
        </BrowserRouter>
    )
}
}
