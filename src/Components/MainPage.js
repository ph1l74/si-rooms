import React, { useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Container, Hero } from 'react-bulma-components';
import { setUserName, setUserId, setRooms, joinRoom, setConStatus } from '../Actions';
import io from 'socket.io-client';
import axios from 'axios';
import RoomsList from '../Components/RoomsList';
import { RoomUI } from '../Components/RoomUI';
import LogIn from './LogIn'
import Navbar from './Navbar';

import E from '../Events/events';

// const HOST = window.location.origin.replace(/^http/, 'ws');
let socket;

const MainPage = () => {

    socket = io.connect("ws://localhost:8888/", { reconnection: true });

    const userName = useSelector(state => state.user.name);
    const userId = useSelector(state => state.user.id);
    const currentRoom = useSelector(state => state.activeGame.room);
    const [cookies] = useCookies(["userName", "userId", "activeGame"]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (cookies.userName && cookies.userName.length > 0) {
            dispatch(setUserName(cookies.userName))
        }
        if (cookies.userId && cookies.userId.length > 0) {
            dispatch(setUserId(cookies.userId))
        }
        if (cookies.activeGame && cookies.activeGame.room && cookies.activeGame.room.length > 0) {
            dispatch(joinRoom(cookies.activeGame.room))
        }

        const fetchData = async () => {
            const result = await axios(
                'http://127.0.0.1:8888/rooms',
            );
            dispatch(setRooms(result.data));
        };

        fetchData();

        // SocketIO Handlers 

        socket.on('connect', () => {
            dispatch(setConStatus(true))
        })

        // On socketIO server echo-message
        socket.on(E.JOIN_ROOM_FROM_SERVER, ({ roomIdws, userIdws }) => {
            if (roomIdws === currentRoom && userIdws === userId) {
                console.log(roomIdws, currentRoom, userIdws, userId);
                dispatch(setConStatus(true));
            }
        });

        // On socketIo server disconnect
        socket.on('disconnected', () => {
            dispatch(setConStatus(false))
        })

    }, [cookies, dispatch, currentRoom, userId])

    return (
        <Hero color="light">
            {
                !userName ?
                    <LogIn />
                    :
                    <Navbar />
            }
            <Hero.Body>
                <Container>
                    {
                        !currentRoom ?
                            <RoomsList />
                            :
                            <RoomUI />
                    }
                </Container>
            </Hero.Body>
        </Hero>
    );
}

export default MainPage;
export { socket };
