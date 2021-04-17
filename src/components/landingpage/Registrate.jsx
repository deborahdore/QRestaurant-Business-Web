import React, {Component} from "react";

export default class Registrate extends Component {

    render() {
        const {loginForm} = this.props;
        return (
            <div className="mt-3">
                <h6 className="text-center title">
                    Non sei ancora registrato?{" "}
                    <button
                        id="button"
                        type="button"
                        className="link"
                        onClick={() => loginForm(false)}
                    >
                        <p className="gold">Registrati ora!</p>
                    </button>
                </h6>
                {" "}
            </div>
        );
    }

}