import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import '../../css/Home.css';
import Profile from "./Profile";
import Society from "./Society";
import {store} from 'react-notifications-component';
import ModalAddRestaurant from './ModalAddRestaurant';
import {getSocieties, postRestaurant} from "../../common/API/APIUtils";
import Reports from "./reports/Reports";
import 'react-calendar/dist/Calendar.css';
import QRCalendar from "./QRCalendar";
import Charts from "./charts/Charts";
import Footer from "../Footer";

export default class Home extends Component {
    state = {
        currentRestaurant: {},
        showModal: false,
        societies: {}
    }

    async componentDidMount() {
        if (sessionStorage.getItem("currentManager") != null) {
            this.setState({
                societies: (await getSocieties()).societies
            })
        }
        if (sessionStorage.getItem("currentRestaurant") != null && sessionStorage.getItem("currentRestaurant").length > 0) {
            this.setState({
                currentRestaurant: JSON.parse(sessionStorage.getItem("currentRestaurant")),
            },)
        }

    }

    isPhone = () => {
        if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }
    toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.add('collapsed');
        }
    }

    setRestaurant = (society) => {
        this.setState({
            currentRestaurant: society.society
        }, () => {
            if (this.state.currentRestaurant === undefined ||
                this.state.currentRestaurant === null ||
                Object.entries(this.state.currentRestaurant).length === 0) {
                this.createNotification("Errore", "Ops.. qualcosa è andato storto. Riprova.", "danger");
            } else {
                sessionStorage.setItem("currentRestaurant", JSON.stringify(this.state.currentRestaurant));
                this.createNotification("Successo", "Ristorante correttamente selezionato!", "success");
            }
        });

    }

    createNotification = (title, body, type) => {
        if (this.isPhone()) {
            alert(body);
        } else {
            store.addNotification({
                title: title,
                message: body,
                type: type,
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    pauseOnHover: true,
                    duration: 5000,
                    onScreen: true,
                    showIcon: true
                }
            });
        }
    }

    openModalForAddRestaurant = () => {
        this.setModalShow(true);
    }
    setModalShow = (value) => {
        this.setState({
            showModal: value
        });
    }
    addRestaurant = (postRestaurantRequest) => {
        postRestaurant(postRestaurantRequest).then(response => {
            if (response.society !== null && response.society !== undefined) {
                const societies = this.state.societies;
                postRestaurantRequest.idSociety = response.society.idSociety;
                societies.push(postRestaurantRequest);
                this.setState({
                    societies: societies
                })
                this.createNotification("Successo", "Ristorante correttamente inserito", "success");
            } else {
                this.createNotification("Errore", "Qualcosa è andato storto con i nostri server, riprova!", "danger");

            }
        });
        this.setModalShow(false);
    }

    render() {
        return (
            <Container>
                <Row className="rowoverlay">
                    {this.isPhone() ? null :
                        <Sidebar setRestaurant={this.setRestaurant}
                                 openModalForAddRestaurant={this.openModalForAddRestaurant}
                                 societies={this.state.societies}/>
                    }
                    <ModalAddRestaurant onHide={() => this.setModalShow(false)} addRestaurant={this.addRestaurant}
                                        show={this.state.showModal}/>
                    <Col>
                        <DashboardNavbar onLogout={this.props.onLogout} toggleSidebar={this.toggleSidebar}
                                         openModalForAddRestaurant={this.openModalForAddRestaurant}
                                         setRestaurant={this.setRestaurant}
                                         societies={this.state.societies}
                        />
                    </Col>
                </Row>

                <Row xs={1} sm={1} md={2} lg={3} id="homeRow">
                    <Col>
                        <Profile/>
                        <Charts currentRestaurant={this.state.currentRestaurant}/>
                    </Col>
                    <Col>
                        <Society currentRestaurant={this.state.currentRestaurant}/>
                        <QRCalendar currentRestaurant={this.state.currentRestaurant}
                                    createNotification={this.createNotification}/>
                    </Col>
                    <Col>
                        <Reports currentRestaurant={this.state.currentRestaurant}
                                 createNotification={this.createNotification}/>
                    </Col>

                </Row>
                <Row className="mt-3">
                    <Footer/>
                </Row>
            </Container>

        );
    }
}

