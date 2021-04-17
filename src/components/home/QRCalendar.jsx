import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {Card} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import {BiCalendarCheck} from "react-icons/all";
import '../../css/Calendar.css';
import {getAttendancesForDate} from "../../common/API/APIUtils";
import {END_DINNER, END_LUNCH, START_DINNER, START_LUNCH} from "../../constants/Constants";

export default class QRCalendar extends Component {

    state = {
        value: new Date(),
        lunch: -1,
        dinner: -1
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentRestaurant !== prevProps.currentRestaurant) {
            this.setState({
                value: new Date(),
                lunch: -1,
                dinner: -1
            }, () => this.getClientAttendance(this.state.value));

        }
    }

    checkTime = (date) => {
        const arrivalTime = new Date(date);
        const startLunch = new Date(date).setHours(START_LUNCH, 0, 0, 0);
        const endLunch = new Date(date).setHours(END_LUNCH, 0, 0, 0);
        const startDinner = new Date(date).setHours(START_DINNER, 0, 0, 0);
        const endDinner = new Date(date).setHours(END_DINNER, 0, 0, 0);

        if (startLunch <= arrivalTime && arrivalTime <= endLunch) {
            return "lunch";
        } else if (startDinner <= arrivalTime && arrivalTime <= endDinner) {
            return "dinner";
        } else {
            return "error";
        }


    }

    getClientAttendance = (value) => {
        const {currentRestaurant, createNotification} = this.props;
        if (currentRestaurant === undefined || currentRestaurant === null || Object.entries(currentRestaurant).length <= 0) {
            createNotification("Errore", "Devi selezionare un ristorante prima di poterne visualizzare le presenze", "danger");

        } else {
            const datetime = new Date(value);
            const date = datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate();
            getAttendancesForDate(currentRestaurant.idSociety, date).then(response => {
                    if (response.numClients === 0) {
                        this.setState({
                            lunch: 0,
                            dinner: 0
                        });
                    } else {
                        let numLunch = 0;
                        let numDinner = 0;
                        let clients = [];
                        clients.push(response.clients);
                        clients.forEach(c => {
                            c.forEach(client => {
                                const time = this.checkTime(client.arrivalTime);
                                if (time === "lunch") {
                                    numLunch = numLunch + 1;
                                } else if (time === "dinner") {
                                    numDinner = numDinner + 1;
                                }
                            })
                        });
                        this.setState({
                            lunch: numLunch,
                            dinner: numDinner
                        });
                    }

                }
            );

        }

    }
    onChange = (value) => {
        this.setState({
            value: new Date(value)
        });
        this.getClientAttendance(value);
    }

    render() {
        return (
            <Card className="text-justify mb-2 card">
                <Card.Body>
                    <Card.Title>
                        <h5><BiCalendarCheck className="m-2"/> Visite</h5>
                    </Card.Title>
                    <hr/>

                    <Calendar className="calendar"
                              onChange={this.onChange}
                              value={this.state.value}
                    />
                    <hr/>
                    {this.state.lunch < 0 && this.state.lunch < 0 ?
                        <h5 className="text-center">Seleziona un ristorante e una data per vederne le presenze.</h5>
                        :
                        <ul>
                            <li>
                                <h5>Ospiti a pranzo: {this.state.lunch}</h5>
                            </li>
                            <li>
                                <h5>Ospiti a cena: {this.state.dinner}</h5>
                            </li>
                        </ul>
                    }
                </Card.Body>
            </Card>
        );
    }

}