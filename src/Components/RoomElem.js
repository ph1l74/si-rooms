import React from 'react';
import { Card, Heading } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { joinRoom } from '../Actions';
import './RoomElem.css';

export const RoomElem = ({ roomName, roomId }) => {

    const [cookies, setCookies] = useCookies(["activeGame"]);

    const dispatch = useDispatch();

    const connectToRoom = () => {
        console.log(cookies)
        let activeGame = cookies.activeGame || { room: null }
        setCookies('activeGame', { ...activeGame, room: roomId }, { path: '/' });
        dispatch(joinRoom(roomId))

    }

    return (
        <Card className="sir-room-card">
            <Card.Content>
                <Heading size={4}>{roomName}</Heading>
            </Card.Content>
            <Card.Footer>

                <Card.Footer.Item renderAs="div" className="card-connect" onClick={connectToRoom}>Присоединиться</Card.Footer.Item>

            </Card.Footer>
        </Card>
    )
}