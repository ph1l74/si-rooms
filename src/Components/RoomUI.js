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
    const [timeStore, setTimeStore] = useState();
    const [isAdmin, setAdmin] = useState(false);
    const dispatch = useDispatch();


    const playerClickHandler = () => {
        if (timerState) {
            const cuurentTime = new Date().getTime();
            const time = cuurentTime - timeStore;
            socket.emit(E.SEND_PLAYER_TIME_FROM_CLIENT, { userName, time });
            setResults([...results, { userName: userName, time: time }]);
            setTimerState(false);
        }
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
            setTimerState(false);
        })

        socket.on(E.SEND_TIMER_START_FROM_SERVER, ({ timerStatus }) => {
            setTimerState(timerStatus);
            const currentTime = new Date().getTime();
            setTimeStore(currentTime);
            if (timerStatus) {
                setResults([]);
            }
        })


        if (allRooms.length > 0) {
            const currentRoomObj = allRooms.filter((room) => {
                return room._id === roomId
            });
            if (currentRoomObj.length > 0 && currentRoomObj[0].gamemaster === userId)
                setAdmin(true)
        }
    }, [roomId, dispatch, userId, results, allRooms])



    return (
        <Container >
            {
                isAdmin ?
                    <Section>
                        <Section>
                            <Button
                                fullwidth
                                rounded
                                onClick={gmTimerStart}
                                className="sir-room-admin-btn"
                            >
                                Запустить таймер
                            </Button>
                        </Section>
                        <Section>
                            <Button
                                fullwidth
                                rounded
                                onClick={gmTimerStop}
                                className="sir-room-admin-btn"
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
                            className={timerState ? "sir-room-btn active" : "sir-room-btn"}
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