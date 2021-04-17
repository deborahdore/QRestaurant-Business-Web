import React, {Component} from "react";

export default class Login extends Component {

    render() {
        const {loginForm} = this.props;
        return (
            <div className="mt-3">
                <h6 className="text-center title">
                    Sei già registrato?{" "}
                    <button
                        id="button"
                        type="button"
                        className="link"
                        onClick={() => loginForm(true)}
                    >
                        <p className="gold">Accedi!</p>
                    </button>
                </h6>
                {" "}
            </div>
        );
    }

}