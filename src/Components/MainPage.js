import React, { useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Container, Hero } from 'react-bulma-components';
import { setUserName, setUserId, setRooms, joinRoom } from '../Actions';
import axios from 'axios';
import RoomsList from '../Components/RoomsList';
import { RoomUI } from '../Components/RoomUI';
import LogIn from './LogIn'
import Navbar from './Navbar';



const MainPage = () => {

    const userName = useSelector(state => state.user.name);
    const currentRoom = useSelector(state => state.currentRoom);
    const [cookiesName] = useCookies(["userName", "userId", "currentRoom"]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (cookiesName.userName && cookiesName.userName.length > 0) {
            dispatch(setUserName(cookiesName.userName))
        }
        if (cookiesName.userId && cookiesName.userId.length > 0) {
            dispatch(setUserId(cookiesName.userId))
        }
        if (cookiesName.currentRoom && cookiesName.currentRoom.length > 0) {
            dispatch(joinRoom(cookiesName.currentRoom))
        }

        const fetchData = async () => {
            const result = await axios(
                'http://127.0.0.1:8080/rooms',
            );
            dispatch(setRooms(result.data));
        };

        fetchData();

    }, [cookiesName, dispatch])

    return (
        <Hero color="light" size="fullheight">
            {
                !userName ?
                    <LogIn />
                    :
                    <Navbar />
            }
            <Hero.Body>
                <Container fluid>
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
