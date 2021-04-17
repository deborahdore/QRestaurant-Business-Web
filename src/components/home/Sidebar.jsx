import {Menu, MenuItem, ProSidebar, SubMenu} from 'react-pro-sidebar';
import '../../css/Sidebar.scss';
import '../../css/Sidebar.css';
import {Component} from "react";
import {IoRestaurantSharp} from "react-icons/all";
import '../../css/Link.css';

export default class Sidebar extends Component {

    render() {
        const {setRestaurant, openModalForAddRestaurant} = this.props;
        return (
            <ProSidebar className="collapsed sidebar" id="sidebar">
                <Menu iconShape="square">
                    <MenuItem icon={<IoRestaurantSharp size="60%"/>}>Ristoranti</MenuItem>

                    <SubMenu title="Scegli il ristorante">
                        {
                            (this.props.societies.length > 0) ?
                                (this.props.societies.map(society =>
                                    <MenuItem key={society.idSociety} active={true}
                                              onClick={() => setRestaurant({society})} className="link">
                                        {society.societyName}
                                    </MenuItem>
                                )) : <p> Non hai nessun ristorante registrato.</p>

                        }
                    </SubMenu>
                    <SubMenu title="Aggiungi un nuovo ristorante" onClick={openModalForAddRestaurant}
                             className="link"/>
                </Menu>
            </ProSidebar>
        );
    }
}