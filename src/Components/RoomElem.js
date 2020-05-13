import React from 'react';
import { Card, Heading } from 'react-bulma-components';
import './RoomElem.css';

export const RoomElem = ({ playerCount, roomName, roomId }) => {

    return (
        <Card className="sir-room-card">
            <Card.Content>
                <Heading size={4}>{roomName}</Heading>
            </Card.Content>
            <Card.Footer>
                <Card.Footer.Item renderAs="div">
                    <Heading size={5}>
                        {playerCount}
                        <i className="fas fa-users card-icon"></i>
                    </Heading>
                </Card.Footer.Item>

                <Card.Footer.Item renderAs="div" className="card-connect">Присоединиться</Card.Footer.Item>

            </Card.Footer>
        </Card>
    )
}