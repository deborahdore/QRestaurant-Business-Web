import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import '../../../css/Report.css';
import {FiAlertTriangle} from "react-icons/all";
import 'react-confirm-alert/src/react-confirm-alert.css'
import {getAttendanceInfected} from "../../../common/API/APIUtils"; // Import css
export default class Report extends Component {


    state = {
        showDialog: false
    }
    exportClients = () => {
        const {createNotification} = this.props;
        if (window.confirm("Vuoi esportare la lista di clienti che potrebbero essere venuti in contatto con la persona risultata positiva?")) {

            getAttendanceInfected(this.props.id).then(response => {
                    const filename = response.headers["content-disposition"].split("=")[1];
                    const FileSaver = require('file-saver');
                    const blob = new Blob([response.data], {type: "text/plain;charset=utf-8"});
                    FileSaver.saveAs(blob, filename);
                    createNotification("Successo", "File correttamente esportato", "success");
                }
            ).catch(error => {
                createNotification("Errore", "Qualcosa è andato storto con il salvataggio del file! Riprova!", "danger");
            })
        } else {
            createNotification("Avviso", "Esportazione annullata", "info");
        }
    }

    render() {
        const {date, time} = this.props;
        return (
            <Button className="rounded btn-primary" id="report" onClick={this.exportClients}>
                <li>
                    <FiAlertTriangle/>
                    <Card.Text>{date}</Card.Text>
                </li>
                <li>
                    <Card.Text>{time}</Card.Text>
                </li>

            </Button>
        );
    }

}