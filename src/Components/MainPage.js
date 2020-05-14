import React, { useEffect, useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Container, Hero, Section } from 'react-bulma-components';
import { setUserName, setUserId } from '../Actions';
import RoomsList from '../Components/RoomsList';
import LogIn from './LogIn'
import Navbar from './Navbar';



const MainPage = () => {

    const userName = useSelector(state => state.user.name);
    const [cookiesName, setCookiesName] = useCookies(["userName"]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cookiesName.userName && cookiesName.userName.length > 0) {
            dispatch(setUserName(cookiesName.userName))
        }
        if (cookiesName.userId && cookiesName.userId.length > 0) {
            dispatch(setUserId(cookiesName.userId))
        }
    }, [cookiesName])

    return (
        <Hero color="light" size="fullheight">
            {!userName ? (
                <LogIn></LogIn>
            ) : <Navbar></Navbar>}
            <Hero.Body>
                    <Container fluid>
                        <RoomsList></RoomsList>
                    </Container>
                <Section>
                    <Container fluid>
                    </Container>
                </Section>
            </Hero.Body>
        </Hero>
    );
}

export default MainPage;
