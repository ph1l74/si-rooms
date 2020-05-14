import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';
import Configure from './Configure'
import CreateRoom from './CreateRoom'


const StarterNavbar = () => {

    const userName = useSelector(state => state.user.name);
    const [isVisibleConfig, setVisibleConfig] = useState(false);
    const [isVisibleRoomCreate, setVisibleRoomCreate] = useState(false);

    const openConfig = () => setVisibleConfig(true);
    const closeConfig = () => setVisibleConfig(false);
    const openRoomCreate = () => setVisibleRoomCreate(true);
    const closeRoomCreate = () => setVisibleRoomCreate(false);

    return (
        <Navbar
            color="light"
            fixed="top"
            active
        >
            <Navbar.Menu >
                <Navbar.Container position="end">
                    <Navbar.Item renderAs="div" className="si-navbar-name"> {userName} </Navbar.Item>
                    <Navbar.Item renderAs="div" className="si-navbar-item" onClick={openRoomCreate}>
                        <i className="fas fa-plus"></i>
                        </Navbar.Item>
                    <Navbar.Item renderAs="div" className="si-navbar-item" onClick={openConfig}>
                        <i className="fas fa-cog"></i>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
            {isVisibleRoomCreate ? <CreateRoom close={closeRoomCreate}></CreateRoom> : null}
            {isVisibleConfig ? <Configure close={closeConfig}></Configure> : null}
        </Navbar>
    )
}

export default StarterNavbar;
