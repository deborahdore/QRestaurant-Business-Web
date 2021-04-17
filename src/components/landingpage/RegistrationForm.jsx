import React, {Component} from "react";
import {Button, Card, FormGroup, FormLabel} from "react-bootstrap";
import "../../css/Login.css";
import "../../css/Card.css";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import '../../css/Error.css';
import '../../css/Button.css';
import DownloadApp from "./DownloadApp";
import Login from "./Login";

export default class RegistrationForm extends Component {
    validationSchema = () =>
        Yup.object({
            name: Yup.string().required(
                "Inserisci il nome prima di proseguire",
            ),
            surname: Yup.string().required(
                "Inserisci il cognome prima di proseguire",
            ),
            phone: Yup.string()
                .matches(
                    /^[+]?[0-9]{9,13}$/,
                    "Il numero di telefono deve essere compreso fra 10 e 13 caratteri e sono ammessi solamente numeri",
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
            confirmPassword: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    "Le password devono corrispondere",
                )
                .required("Inserisci la password prima di proseguire"),
        });

    render() {
        return (
            <Card id="card">
                {window.innerWidth <= 768 ? (
                    <Login loginForm={this.props.loginForm}/>
                ) : null}
                <Card.Title className="pt-5 text-center title">
                    <h1>Registrazione</h1>
                </Card.Title>
                <Card.Body>
                    <Formik
                        initialValues={{
                            name: "",
                            surname: "",
                            phone: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={this.validationSchema}
                        onSubmit={(values) => {
                            const registrationRequest = {
                                manager: {
                                    idManager: 1,
                                    name: values.name,
                                    surname: values.surname,
                                    phone: values.phone,
                                    password: values.password,
                                },
                                uuid: Math.random().toString(36).substring(7),
                            };
                            this.props.onRegistration(registrationRequest);
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
                                    <FormLabel className="gold" htmlFor="name">
                                        Nome
                                    </FormLabel>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="input"
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <p className="error">
                                        {" "}
                                        {errors.name && touched.name
                                            ? errors.name
                                            : null}
                                    </p>
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel className="gold" htmlFor="surname">
                                        Cognome
                                    </FormLabel>
                                    <Field
                                        name="surname"
                                        type="text"
                                        className="input"
                                        onChange={handleChange}
                                        value={values.surname}
                                    />
                                    <p className="error">
                                        {" "}
                                        {errors.surname && touched.surname
                                            ? errors.surname
                                            : null}
                                    </p>
                                </FormGroup>
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
                                <FormGroup>
                                    <FormLabel
                                        className="gold"
                                        htmlFor="confirmPassword"
                                    >
                                        Ripeti la password
                                    </FormLabel>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className="input"
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                    />
                                    <p className="error">
                                        {" "}
                                        {errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? errors.confirmPassword
                                            : null}
                                    </p>
                                </FormGroup>
                                <Button
                                    id="btnRegistrate"
                                    variant="primary"
                                    type="submit"
                                    block
                                >
                                    Registrati
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    {window.innerWidth > 768 ? (
                        <Login loginForm={this.props.loginForm}/>
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
