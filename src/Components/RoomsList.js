import React from 'react';
import { Columns } from 'react-bulma-components';
import { useSelector } from 'react-redux';
import { RoomElem } from './RoomElem';

const RoomsList = () => {

    const rooms = useSelector(state => state.rooms);

    return (
        <Columns>
            {rooms.map((room, i) => {
                return (
                    <Columns.Column size={3} key={'room' + i}>
                        <RoomElem
                            roomName={room.roomname}
                            roomId={room._id}
                        >
                        </RoomElem>
                    </Columns.Column>
                )
            })}
        </Columns>
    )
}

export default RoomsList;