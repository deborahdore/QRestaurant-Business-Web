import React, {Component} from "react";
import '../css/Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 bg-light">
                <span className="text-muted">© Certimeter Group</span>
            </footer>
        )
    };
}