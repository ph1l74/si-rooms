import React, { useState, useEffect } from 'react';
import { Columns, Container, Section } from 'react-bulma-components';
import axios from 'axios';
import { RoomElem } from './RoomElem';

const RoomsList = () => {

    const initState = [
        {
            name: "Фишбар",
            players: [12124124, 124124124, 123123123, 2412421],
            id: 111
        },
        {
            name: "Мантисса",
            players: [124124, 124122, 12124124, 1241124],
            id: 222
        },
        {
            name: "Покос",
            players: [],
            id: 231
        }]

    const [rooms, setRooms] = useState(initState)

    return (
        <Columns>
            {rooms.map((room) => {
                return (
                    <Columns.Column size={3}>
                        <RoomElem
                            playerCount={room.players.length}
                            roomName={room.name}
                            roomId={room.id}>
                        </RoomElem>
                    </Columns.Column>
                )
            })}
        </Columns>
    )
}

export default RoomsList;