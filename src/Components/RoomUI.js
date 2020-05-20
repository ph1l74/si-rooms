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
    const allRooms = useSelector(state => state.rooms);
    const userName = useSelector(state => state.user.name);
    const [results, setResults] = useState([]);
    const [timerState, setTimerState] = useState(false);
    const dispatch = useDispatch();
    const time = "123123";

    const checkPrivileges = () => {
        allRooms.map((room) => {
            console.log(room._id);
        })

        console.log(roomId);

        const currentRoomObj = allRooms.filter((room) => {
            return room._id === roomId
        });


        if (currentRoomObj.length > 0 && currentRoomObj[0].gamemaster === userId)
            return true;
        else
            return false;
    }


    const playerClickHandler = () => {
        socket.emit(E.SEND_PLAYER_TIME_FROM_CLIENT, { userName, time });
        setResults([...results, { userName: userName, time: time }]);
    }

    const gmTimerStart = () => {
        let timerStatus = true;
        socket.emit(E.SEND_TIMER_START_FROM_CLIENT, { timerStatus });
    }

    const gmTimerStop = () => {
        let timerStatus = false;
        socket.emit(E.SEND_TIMER_START_FROM_CLIENT, { timerStatus });
    }

    useEffect(() => {
        socket.emit(E.JOIN_ROOM_FROM_CLIENT, { roomId, userId });

        socket.on(E.SEND_PLAYER_TIME_FROM_SERVER, ({ userName, time }) => {
            setResults([...results, { userName: userName, time: time }])
        })

        socket.on(E.SEND_TIMER_START_FROM_SERVER, ({ timerStatus }) => {
            console.log(timerStatus);
            setTimerState(timerStatus);
        })

    }, [roomId, dispatch, userId, results])



    return (
        <Container >
            {checkPrivileges() ?
                <Section>
                    <Section>
                        <Button
                            fullwidth
                            rounded
                            onClick={gmTimerStart}
                            className="sir-room-btn"
                        >
                            Запустить таймер
                            </Button>
                    </Section>
                    <Section>
                        <Button
                            fullwidth
                            rounded
                            onClick={gmTimerStop}
                            className="sir-room-btn"
                        >
                            Остановить таймер
                            </Button>
                    </Section>
                </Section>
                :
                <Section>
                    <Button
                        fullwidth
                        rounded
                        className="sir-room-btn"
                        onClick={playerClickHandler}
                    >

                    </Button>
                </Section>
            }

            <Section>
                {results.map((r, i) => (
                    <Box key={"result_" + i}>
                        <Heading size={5}>
                            {r.userName}
                        </Heading>
                        <Heading subtitle size={6}>
                            {r.time}
                        </Heading>
                    </Box>)
                )
                }

            </Section>
        </Container>

    )
}