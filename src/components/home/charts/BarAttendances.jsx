import {Bar} from 'react-chartjs-3';
import React, {Component} from "react";
import {getAttendance} from "../../../common/API/APIUtils";
import '../../../css/Card.css';
import '../../../css/Link.css';

export default class BarAttendances extends Component {
    state = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sept: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0
    }
    data = () => {
        const data = {
            labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            datasets: [
                {
                    label: "Presenze",
                    backgroundColor: 'rgb(127,181,207)',
                    borderColor: 'rgb(127,181,207)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(127,181,207)',
                    hoverBorderColor: 'rgb(127,181,207)',
                    data: [this.state.Jan, this.state.Feb, this.state.Mar, this.state.Apr, this.state.May, this.state.Jun,
                        this.state.Jul, this.state.Aug, this.state.Sept, this.state.Oct, this.state.Nov, this.state.Dec]


                }
            ]
        };
        return data;
    }

    componentDidMount() {
        if ((this.props.currentRestaurant.idSociety) !== undefined) {
            this.setState({
                Jan: 0,
                Feb: 0,
                Mar: 0,
                Apr: 0,
                May: 0,
                Jun: 0,
                Jul: 0,
                Aug: 0,
                Sept: 0,
                Oct: 0,
                Nov: 0,
                Dec: 0,
            }, () => {
                getAttendance(this.props.currentRestaurant.idSociety).then(
                    response => {
                        if (response.numAttendances > 0)
                            this.checkMonth(response.attendance);
                    }
                )
            });

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentRestaurant !== prevProps.currentRestaurant) {
            this.setState({
                Jan: 0,
                Feb: 0,
                Mar: 0,
                Apr: 0,
                May: 0,
                Jun: 0,
                Jul: 0,
                Aug: 0,
                Sept: 0,
                Oct: 0,
                Nov: 0,
                Dec: 0,
            }, () => {
                getAttendance(this.props.currentRestaurant.idSociety).then(
                    response => {
                        if (response.numAttendances > 0)
                            this.checkMonth(response.attendance);

                    }
                )
            })
        }
    }

    checkMonth = (values) => {
        let data = [this.state.Jan,
            this.state.Feb,
            this.state.Mar,
            this.state.Apr,
            this.state.May,
            this.state.Jun,
            this.state.Jul,
            this.state.Aug,
            this.state.Sept,
            this.state.Oct,
            this.state.Nov,
            this.state.Dec]
        values.forEach(value => {
            const month = new Date(value.arrivalTime).getMonth();
            data[month] = data[month] + 1;
        })
        this.setState({
            Jan: data[0],
            Feb: data[1],
            Mar: data[2],
            Apr: data[3],
            May: data[4],
            Jun: data[5],
            Jul: data[6],
            Aug: data[7],
            Sept: data[8],
            Oct: data[9],
            Nov: data[10],
            Dec: data[11]
        })
    }

    render() {
        return (
            <Bar
                data={this.data}
                width={250}
                height={300}
                options={{
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                precision: 0
                            }
                        }]
                    }
                }}
            />
        );
    }

}