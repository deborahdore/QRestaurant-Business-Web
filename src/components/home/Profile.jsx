import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {CgProfile} from "react-icons/all";
import '../../css/Card.css';

export default class Profile extends Component {
    state = {}

    componentDidMount() {
        const manager = JSON.parse(sessionStorage.getItem("currentManager"));
        if (manager != null) {
            this.setState({
                name: manager.name,
                surname: manager.surname,
                phone: manager.phone
            });
        }
    }

    render() {
        return (
            <Card className="text-justify mb-2 card">
                <Card.Body>
                    <Card.Title>
                        <h5><CgProfile className="m-2"/> Profilo</h5>
                    </Card.Title>
                    <hr/>
                    <Card.Text>

                        <li>
                            Nome: {this.state.name}
                        </li>
                        <li>
                            Cognome: {this.state.surname}
                        </li>
                        <li>
                            Numero di Telefono: {this.state.phone}
                        </li>

                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

}