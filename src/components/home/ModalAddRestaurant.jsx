import {Button, FormGroup, FormLabel, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import '../../css/Login.css';
import '../../css/Modal.css';
import '../../css/Error.css';
import '../../css/Button.css';

export default function ModalAddRestaurant(props) {
    return (

        <Modal show={props.show}
               className="my-modal"
               {...props}
               size="md"
               aria-labelledby="contained-modal-title-vcenter"
               centered

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Aggiungi un nuovo ristorante
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{societyName: "", street: "", city: "", country: "Italia", vatnum: ""}}
                    validationSchema={
                        Yup.object({
                            societyName: Yup.string().required("Inserisci il nome del ristorante prima di proseguire"),
                            street: Yup.string().required("Inserisci l'indirizzo prima di proseguire"),
                            city: Yup.string().required("Inserisci la città prima di proseguire"),
                            vatnum: Yup.number().typeError("La Partita IVA può contenere solo caratteri numerici")
                                .required("La Partita IVA può contenere solo caratteri numerici")
                        })
                    }
                    onSubmit={(values) => {
                        const addRestaurantRequest = {
                            idSociety: -1,
                            societyName: values.societyName,
                            street: values.street,
                            city: values.city,
                            country: "Italia",
                            vatnum: values.vatnum
                        };
                        props.addRestaurant(addRestaurantRequest);

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
                                <FormLabel className="text">
                                    Nome ristorante
                                </FormLabel>
                                <Field
                                    name="societyName"
                                    type="text"
                                    className="input"
                                    onChange={handleChange}
                                    value={values.societyName}
                                />
                                <p className="error">
                                    {" "}
                                    {errors.societyName && touched.societyName
                                        ? errors.societyName
                                        : null}
                                </p>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    className="text"
                                >
                                    Indirizzo
                                </FormLabel>
                                <Field
                                    name="street"
                                    type="input"
                                    className="input"
                                    onChange={handleChange}
                                    value={values.street}
                                />
                                <p className="error">
                                    {" "}
                                    {errors.street && touched.street
                                        ? errors.street
                                        : null}
                                </p>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    className="text"
                                >
                                    Città
                                </FormLabel>
                                <Field
                                    name="city"
                                    type="input"
                                    className="input"
                                    onChange={handleChange}
                                    value={values.city}
                                />
                                <p className="error">
                                    {" "}
                                    {errors.city && touched.city
                                        ? errors.city
                                        : null}
                                </p>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    className="text"
                                >
                                    Partita IVA
                                </FormLabel>
                                <Field
                                    name="vatnum"
                                    type="input"
                                    className="input"
                                    onChange={handleChange}
                                    value={values.vatnum}
                                />
                                <p className="error">
                                    {" "}
                                    {errors.vatnum && touched.vatnum
                                        ? errors.vatnum
                                        : null}
                                </p>
                            </FormGroup>
                            <Button
                                variant="primary"
                                type="submit"
                                block
                                id="btnAdd"
                            >
                                Aggiungi
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}