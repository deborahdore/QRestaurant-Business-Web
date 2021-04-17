import React, {Component} from "react";
import {Col, Figure, Row} from "react-bootstrap";
import Logo from "../../images/logo.png";
import "../../css/LandingPage.css";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Footer from "../Footer";

export default class LandingPage extends Component {
    state = {
        loginForm: true,
    };

    loginForm = (value) => {
        this.setState({loginForm: value});
    };

    render() {
        return (
            <React.Fragment>
                <Row
                    xs={1}
                    md={2}
                    lg={2}
                    className="justify-content-center min-vh-100"
                    id="row"
                >
                    <Col
                        className="mx-auto justify-content-center"
                        id="col"
                    >
                        <Figure className="image">
                            <Figure.Image src={Logo}/>
                            <Figure.Caption>
                                <h6 className="text-center">
                                    Rendi automatico il processo di
                                    registrazione delle presenze.
                                    <br/>
                                    Benvenuto su QRestaurant Business!
                                </h6>
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col className="mx-auto align-items-center">
                        {this.state.loginForm ? (
                            <LoginForm
                                loginForm={this.loginForm}
                                onLogin={this.props.onLogin}
                            />
                        ) : (
                            <RegistrationForm
                                loginForm={this.loginForm}
                                onRegistration={this.props.onRegistration}
                            />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Footer/>
                </Row>
            </React.Fragment>
        );
    }
}
