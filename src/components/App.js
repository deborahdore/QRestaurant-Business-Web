import React, {Component} from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./PrivateRoute";
import {login, logout, registration} from "../common/API/APIUtils"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants/Constants";
import Home from "./home/Home";
import {createBrowserHistory} from 'history';

export let history = createBrowserHistory();
export default class App extends Component {

    isFluid = () => {
        return !this.isPhone();
    };

    isPhone = () => {
        if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    };
    onRegistration = (registrationRequest) => {
        registration(registrationRequest).then((response) => {
            if (response.code === 0) {
                sessionStorage.setItem("currentManager", JSON.stringify(response.manager));
                sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
                sessionStorage.setItem(REFRESH_TOKEN, response.refreshToken);
                history.replace("/home", {});
                window.location.reload();
            }
        });
    };


    onLogin = (loginRequest) => {
        login(loginRequest).then(response => {
            if (response.code === 0) {
                sessionStorage.setItem("currentManager", JSON.stringify(response.manager));
                sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
                sessionStorage.setItem(REFRESH_TOKEN, response.refreshToken);
                history.replace("/home", {});
                window.location.reload();
            }
        });
    }

    onLogout = () => {
        logout().then(response => {
            if (response.code === 0) {
                sessionStorage.clear();
                window.location.href = "/";
                window.location.reload();
            }
        })
    }

    render() {
        return (
            <Container fluid={this.isFluid()} className="min-vh-100">
                <Router>
                    <Switch>
                        <PrivateRoute
                            component={Home}
                            path="/home"
                            onLogout={this.onLogout}
                            {...this.props}
                        />
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <LandingPage
                                    onLogin={this.onLogin}
                                    onRegistration={this.onRegistration}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            </Container>
        );
    }
}
