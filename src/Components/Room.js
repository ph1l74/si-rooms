import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RoomPlayer } from './RoomPlayer';
import { Section, Container, Columns } from 'react-bulma-components'


export const Room = ({ id }) => {

    const initState = [{
        name: "huikin",
        image: "https://sun3-10.userapi.com/c854416/v854416613/1e1594/PK0wT8UNLyo.jpg?ava=1",
        score: 1200
    },
    {
        name: "asopfa",
        score: -1200
    },
    {
        name: "asfjap",
        score: 200
    },
    {
        name: "asfasfsa",
        score: 20
    }]
    const isAdmin = true;

    const [players, setPlayers] = useState(initState);

    useEffect(() => {
        const getPlayers = async () => {
            const result = await axios(
                'http://localhost:5000/players'
            );
            setPlayers(result.data);
        }

        // getPlayers();
    }, [])


    return (
        <Section>
            <Container>
                <Columns>
                    {players.map((player) => {
                        return (
                            <Columns.Column>
                                <RoomPlayer
                                    playerName={player.name}
                                    playerImage={player.image ? player.image : null}
                                    playerScore={player.score}
                                    adminView={isAdmin}>
                                </RoomPlayer>
                            </Columns.Column>
                        )
                    })}
                </Columns>
            </Container>
        </Section>
    )
}