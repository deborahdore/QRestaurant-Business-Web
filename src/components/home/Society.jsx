import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {IoRestaurant} from "react-icons/all";
import '../../css/Card.css';

export default class Society extends Component {


    render() {
        const {currentRestaurant} = this.props;
        return (
            <Card className="text-justify mb-2 card">
                <Card.Body>
                    <Card.Title>
                        <h5><IoRestaurant className="m-2"/>Ristorante</h5>
                    </Card.Title>
                    <hr/>

                    {(currentRestaurant === undefined || currentRestaurant === null || Object.entries(currentRestaurant).length <= 0) ?
                        (<p> Non hai selezionato nessun ristorante!</p>)
                        :
                        (
                            <Card.Text className="align-items-start">
                                <li>
                                    Nome: {" "} {currentRestaurant.societyName}
                                </li>
                                <li>
                                    Indirizzo: {" "}
                                    {currentRestaurant.street},{" "}
                                    {currentRestaurant.city},{" "}
                                    {currentRestaurant.country}

                                </li>
                                <li>
                                    Partita IVA: {" "}
                                    {currentRestaurant.vatnum}
                                </li>
                            </Card.Text>
                        )
                    }
                </Card.Body>
            </Card>
        );
    }

}