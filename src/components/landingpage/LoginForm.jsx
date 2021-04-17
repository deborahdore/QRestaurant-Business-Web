import React, {Component} from "react";
import {Button, Card, FormGroup, FormLabel} from "react-bootstrap";
import "../../css/Login.css";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import '../../css/Error.css';
import '../../css/Button.css';
import '../../css/Icon.css';
import '../../css/Card.css';
import DownloadApp from "./DownloadApp";
import Registrate from "./Registrate";

export default class LoginForm extends Component {
    validationSchema = () =>
        Yup.object({
            phone: Yup.string()
                .matches(
                    /^[+]?[0-9]{9,13}$/,
                    "Il numero di telefono deve essere compreso fra 9 e 13 caratteri e sono ammessi solamente numeri",
                )
                .required(
                    "Inserisci il numero di telefono prima di proseguire",
                ),
            password: Yup.string()
                .matches(
                    /^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{6,}$/,
                    "La password deve contenere almeno 6 caratteri, una lettera maiuscola, una minuscola e un numero",
                )
                .required("Inserisci la password prima di proseguire"),
        });

    render() {
        return (
            <Card id="card">
                {window.innerWidth <= 768 ? (
                    <Registrate loginForm={this.props.loginForm}/>
                ) : null}
                <Card.Title className="pt-5 text-center title">
                    <h1>Login</h1>
                </Card.Title>
                <Card.Body>
                    <Formik
                        initialValues={{phone: "", password: ""}}
                        validationSchema={this.validationSchema}
                        onSubmit={(values) => {
                            const loginRequest = {
                                phone: values.phone,
                                password: values.password,
                                uuid: Math.random().toString(36).substring(7),
                            };
                            this.props.onLogin(loginRequest);
                        }}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              values,
                              errors,
                              touched,
                          }) => (
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}
                            >
                                <FormGroup>
                                    <FormLabel className="gold" htmlFor="phone">
                                        Numero di Telefono
                                    </FormLabel>
                                    <Field
                                        name="phone"
                                        type="text"
                                        className="input"
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                    <p className="error">
                                        {" "}
                                        {errors.phone && touched.phone
                                            ? errors.phone
                                            : null}
                                    </p>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel
                                        className="gold"
                                        htmlFor="password"
                                    >
                                        Password
                                    </FormLabel>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="input"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    <p className="error">
                                        {" "}
                                        {errors.password && touched.password
                                            ? errors.password
                                            : null}
                                    </p>
                                </FormGroup>
                                <Button
                                    id="btnLogin"
                                    variant="primary"
                                    type="submit"
                                    block
                                >
                                    Accedi
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    {window.innerWidth > 768 ? (
                        <Registrate loginForm={this.props.loginForm}/>
                    ) : null}
                    <div className="mt-1">
                        <h6 className="text-center">
                            <DownloadApp/>
                        </h6>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}
