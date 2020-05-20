import React, { useEffect, useState } from 'react';
import { Box, Card, Heading, Button, Section, Container } from 'react-bulma-components';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from './MainPage';


import E from '../Events/events';
import './RoomUI.css';

// import { useDispatch } from 'react-redux';
// import { joinRoom } from '../Actions';

export const RoomUI = () => {

    const roomId = useSelector(state => state.activeGame.room);
    const userId = useSelector(state => state.user.id);
    const userName = useSelector(state => state.user.name);
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();
    const time = "123123";

    const clickHandler = () => {
        socket.emit(E.SEND_PLAYER_TIME_FROM_CLIENT, { userName, time });
        setResults([...results, { userName: userName, time: time }]);
    }

    useEffect(() => {
        socket.emit(E.JOIN_ROOM_FROM_CLIENT, { roomId, userId });

        socket.on(E.SEND_PLAYER_TIME_FROM_SERVER, ({ userName, time }) => {
            console.log(userName, time);
            setResults([...results, { userName: userName, time: time }])
        })

    }, [roomId, dispatch, userId, results])



    return (
        <Container >

            <Section>
                <Button
                    fullwidth
                    rounded
                    className="sir-room-btn"
                    onClick={clickHandler}
                >

                </Button>
            </Section>
            <Section>
                {results.map((r, i) => (
                    <Box key={"result_" + i}>
                        <Heading size={5}>
                            {r.userName}
                        </Heading>
                        <Heading subtitle size={6}>
                            {r.userName}
                        </Heading>
                    </Box>)
                )
                }

            </Section>
        </Container>

    )
}