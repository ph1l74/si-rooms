import React from 'react';
import { Card, Media, Heading, Image } from 'react-bulma-components';

export const RoomPlayer = ({ playerName, playerImage, playerScore, adminView }) => {
    return (
        <Card>
            <Card.Header>
                <Media>
                    <Media.Item renderAs="figure" position="left">
                        {playerImage ?
                            <Image size={64} alt="64x64" src={playerImage} />
                            :
                            <div className="si-avatar-quazi">
                                <i className="fas fa-user si-user"></i>
                            </div>
                        }
                    </Media.Item>
                    <Media.Item>
                        <Heading size={4} className="si-player-name">{playerName}</Heading>
                    </Media.Item>
                </Media>
            </Card.Header>
            <Card.Content>
                <Heading size={2} align="center">{playerScore}</Heading>
            </Card.Content>
            {adminView ?
                (
                    <Card.Footer>
                        <Card.Footer.Item renderAs="div" className="si-player-score-control plus"><i className="fas fa-minus"></i></Card.Footer.Item>
                        <Card.Footer.Item renderAs="div" className="si-player-score-control minus"><i className="fas fa-plus"></i></Card.Footer.Item>
                    </Card.Footer>
                )
                : (null)
            }
        </Card>
    )
}