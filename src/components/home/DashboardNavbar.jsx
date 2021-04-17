import React, {Component} from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton, Navbar} from "react-bootstrap";
import {FiMenu, IoLogOutOutline,} from "react-icons/all";
import "../../css/DashboardNavbar.scss";
import "../../css/DashboardNavbar.css";
import {DropdownSubmenu} from "react-bootstrap-submenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import '../../css/Button.css';
import '../../css/Icon.css';

export default class DashboardNavbar extends Component {
    state = {
        currentManager: {
            name: "",
            surname: "",
            phone: ""
        },
    };

    componentDidMount() {
        if (sessionStorage.getItem("currentManager") != null) {
            this.setState({
                currentManager: JSON.parse(
                    sessionStorage.getItem("currentManager"))
            })
        }
    }

    isPhone = () => {
        if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {onLogout, toggleSidebar, openModalForAddRestaurant, societies, setRestaurant} = this.props;
        return (
            <Navbar className="navbar border-bottom box-shadow">
                <Navbar.Brand>
                    {this.isPhone() ?
                        <DropdownButton className="button rounded-circle"
                                        id="btnDropdown"
                                        as={ButtonGroup}
                                        key={'info'}
                                        variant={'info'}
                                        title={""}
                        >
                            <Dropdown.Item eventKey="2" onClick={openModalForAddRestaurant}>Inserisci un nuovo
                                ristorante</Dropdown.Item>
                            <DropdownSubmenu title={"Scegli il ristorante"} className="dropdown-menu-bottom">
                                {
                                    (societies.length > 0) ?
                                        (societies.map(society =>
                                            <DropdownItem eventKey={society.idSociety}
                                                          onClick={() => setRestaurant({society})}>
                                                {society.societyName}
                                            </DropdownItem>
                                        ))
                                        :
                                        <DropdownItem> Non hai nessun ristorante registrato.</DropdownItem>

                                }
                            </DropdownSubmenu>
                        </DropdownButton>
                        :
                        <FiMenu size="25px" className="icon" onClick={toggleSidebar}/>
                    }

                    <span className="logo">QRestaurant</span>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    {
                        sessionStorage.getItem("currentManager") != null ?
                            <p className="profile m-1">{this.state.currentManager.name}{' '}{this.state.currentManager.surname}</p>
                            : null
                    }
                    <Button id="btnLogout" className="btn btn-primary btn-sm m-1" onClick={onLogout}>
                        Esci
                        {' '}
                        <IoLogOutOutline/>
                    </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}