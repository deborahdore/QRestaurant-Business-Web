import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isValid} from "../common/API/APIUtils";

const PrivateRoute = ({component: Component, path, onLogout, ...rest}) => {
    return (
        <Route
            exact
            path={path}
            {...rest}
            render={(props) => {
                return isValid() ? (
                    <Component {...props} onLogout={onLogout}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                prevLocation: path,
                                error: "You need to login first!",
                            },
                        }}
                    />
                );
            }}
        />
    );
};
export default PrivateRoute;