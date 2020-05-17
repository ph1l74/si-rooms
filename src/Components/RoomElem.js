import React from 'react';
import { Card, Heading } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { joinRoom } from '../Actions';
import './RoomElem.css';

export const RoomElem = ({ roomName, roomId }) => {

    const [, setCookiesName] = useCookies(["currentRoom"]);

    const dispatch = useDispatch();

    const connectToRoom = () => {
        dispatch(joinRoom(roomId))
        setCookiesName('currentRoom', roomId, { path: '/' });
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