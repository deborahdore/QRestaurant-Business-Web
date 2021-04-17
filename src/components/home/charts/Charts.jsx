import {Card, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React, {Component} from "react";
import {GrLineChart} from "react-icons/all";
import '../../../css/Button.css';
import BarNotifications from "./BarNotifications";
import BarAttendances from "./BarAttendances";

export default class Charts extends Component {

    state = {
        segnalazioni: true,
        presenze: false
    }

    handleChange = (value) => {
        if (value === 1) {
            this.setState({
                segnalazioni: true,
                presenze: false
            });
        } else {
            this.setState({
                segnalazioni: false,
                presenze: true
            });
        }
    }

    render() {
        return (
            <Card className="text-justify mb-2 card">
                <Card.Body>
                    <Card.Title>
                        <h5><GrLineChart className="m-2"/> Statistiche </h5>
                    </Card.Title>
                    <hr/>
                    {this.state.segnalazioni ?
                        <BarNotifications currentRestaurant={this.props.currentRestaurant}/>
                        : null}
                    {this.state.presenze ?
                        <BarAttendances currentRestaurant={this.props.currentRestaurant}/>
                        : null}
                </Card.Body>
                <ToggleButtonGroup className="rounded-0" type="radio" name="options" defaultValue={1}
                                   onChange={(e) => this.handleChange(e)} style={{zIndex: 0}}>
                    <ToggleButton id="btnReports" value={1}>Segnalazioni</ToggleButton>
                    <ToggleButton id="btnAttendances" value={2}>Presenze</ToggleButton>
                </ToggleButtonGroup>
            </Card>
        );
    }

}