import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {IoAlertOutline} from "react-icons/all";
import {getNotifications} from "../../../common/API/APIUtils";
import Report from "./Report";
import '../../../css/Reports.css';
import {END_DINNER, END_LUNCH, START_DINNER, START_LUNCH} from "../../../constants/Constants";
import '../../../css/Card.css';

export default class Reports extends Component {
    state = {
        reports: []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentRestaurant !== prevProps.currentRestaurant) {
            getNotifications(this.props.currentRestaurant.idSociety).then(response => {
                this.setState({
                    reports: response.notifications,
                })
            })
        }
    }

    componentDidMount() {
        if (this.props.currentRestaurant.idSociety !== undefined) {
            getNotifications(this.props.currentRestaurant.idSociety).then(response => {
                this.setState({
                    reports: response.notifications,
                })
            })
        }
    }

    checkTime = (arrivalTime) => {
        let startLunch = new Date(arrivalTime).setHours(START_LUNCH, 0, 0, 0);
        let endLunch = new Date(arrivalTime).setHours(END_LUNCH, 0, 0, 0);
        let startDinner = new Date(arrivalTime).setHours(START_DINNER, 0, 0, 0);
        let endDinner = new Date(arrivalTime).setHours(END_DINNER, 0, 0, 0);

        if (startLunch <= arrivalTime && arrivalTime <= endLunch) {
            return "11:00 - 15:00";
        } else if (startDinner <= arrivalTime && arrivalTime <= endDinner) {
            return "19:00 - 23:00";
        } else {
            return "";
        }
    }

    render() {
        return (
            <Card className="text-justify-start mb-2 card">
                <Card.Body>
                    <Card.Title>
                        <h5><IoAlertOutline size="10%" className="m-2"/>Segnalazioni</h5>
                    </Card.Title>
                    <hr/>
                    {this.state.reports === null || this.state.reports === undefined || Object.entries(this.state.reports).length === 0 ?
                        <Card.Text>Non ci sono segnalazioni!</Card.Text>
                        :
                        <div className="align-content-center scrollable">
                            {this.state.reports.map(report => {
                                const date = new Date(report.attendance.arrivalTime).toLocaleDateString();
                                const time = this.checkTime(new Date(report.attendance.arrivalTime));
                                return <Report key={report.idNotification} id={report.idNotification} date={date}
                                               time={time} createNotification={this.props.createNotification}/>
                            })}
                        </div>
                    }
                </Card.Body>
            </Card>
        );
    }

}