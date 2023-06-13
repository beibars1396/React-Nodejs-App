import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import authSelectors from "../../../modules/auth/authSelectors";
import routes from "../../routes";
import CustomLoadable from "../CustomLoadable";
import ProgressBar from "../ProgressBar";

export default function RoutesComponent(props) {
    const isInitialMount = useRef(true);

    const authLoading = useSelector(
        authSelectors.selectLoadingInit
    )

    const loading = authLoading 
    
    const currentUser = useSelector(
        authSelectors.selectCurrentUser
    )

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current=false;
            ProgressBar.start();
            return;
        }
        if(!loading) {
            ProgressBar.done()
        }
    }, [loading]);

    if(loading){
        return <div />;
    }

    return(
        <Routes>
            {/* {routes.publicRoutes.map((route) => (
                <PublicRoute
                    key={route.path}
                    exact
                    path={route.path}
                    currentUser={currentUser}
                    component={CustomLoadable({
                        loader: route.loader
                    })}
                />
            ))}
            {routes.privateRoutes.map((route) => (
                <PrivateRoute
                    key={route.path}
                    currentUser={currentUser}
                    permissionRequired={route.permissionRequired}
                    path={route.path}
                    component={CustomLoadable({
                        loader: route.loader
                    })}
                    exact={Boolean(route.exact)}              
                />
            ))} */}
            {routes.simpleRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    Component={CustomLoadable({
                        loader: route.loader
                    })}
                />
            ))}
        </Routes>
    )
}