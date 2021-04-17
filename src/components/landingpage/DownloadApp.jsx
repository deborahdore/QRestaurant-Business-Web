import React, {Component} from "react";
import {Figure} from "react-bootstrap";
import Google from "../../images/google_badge.png";
import Apple from "../../images/apple_badge.svg";
import "../../css/Badges.css";

export default class DownloadApp extends Component {

    render() {
        return (
            <div>
                <Figure>
                    <Figure.Image src={Apple} id="apple"/>
                    <Figure.Image src={Google} id="android"/>
                </Figure>
            </div>
        );
    }

}