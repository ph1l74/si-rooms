import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { exitRoom } from '../Actions';
import Configure from './Configure'
import CreateRoom from './CreateRoom'

import './Navbar.css';


const StarterNavbar = () => {

    const userName = useSelector(state => state.user.name);
    const activeGame = useSelector(state => state.activeGame);
    const connected = useSelector(state => state.activeGame.conStatus);
    const [isVisibleConfig, setVisibleConfig] = useState(false);
    const [isVisibleRoomCreate, setVisibleRoomCreate] = useState(false);
    const [, setActiveGame] = useCookies(["activeGame"]);
    const dispatch = useDispatch();

    const openConfig = () => setVisibleConfig(true);
    const closeConfig = () => setVisibleConfig(false);
    const openRoomCreate = () => setVisibleRoomCreate(true);
    const closeRoomCreate = () => setVisibleRoomCreate(false);

    const exitRoomByClick = () => {
        setActiveGame('activeGame', null, { path: '/' });
        dispatch(exitRoom());
    }

    return (
        <Navbar
            color="light"
            fixed="top"
            active
        >
            <Navbar.Menu >
                <Navbar.Container position="start">
                    {activeGame.room ?
                        <Navbar.Item id="conStatus" renderAs="div" className={connected ? "si-navbar-name connected" : "si-navbar-name disconnected"}>
                            <i className="fas fa-dot-circle"></i>
                        </Navbar.Item>
                        :
                        null
                    }
                </Navbar.Container>
                <Navbar.Container position="end">
                    <Navbar.Item renderAs="div" className="si-navbar-name"> {userName} </Navbar.Item>
                    {!activeGame.room ?
                        <Navbar.Item renderAs="div" className="si-navbar-item" onClick={openRoomCreate}>
                            <i className="fas fa-plus"></i>
                        </Navbar.Item>
                        :
                        null
                    }
                    <Navbar.Item renderAs="div" className="si-navbar-item" onClick={openConfig}>
                        <i className="fas fa-cog"></i>
                    </Navbar.Item>
                    <Navbar.Item renderAs="div" className="si-navbar-item" onClick={exitRoomByClick}>
                        <i className="fas fa-sign-out-alt"></i>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
            {isVisibleRoomCreate ? <CreateRoom close={closeRoomCreate}></CreateRoom> : null}
            {isVisibleConfig ? <Configure close={closeConfig}></Configure> : null}
        </Navbar>
    )
}

export default StarterNavbar;
