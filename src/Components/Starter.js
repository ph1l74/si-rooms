import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Container, Hero, Heading, Section } from 'react-bulma-components';


const Starter = () => {

    return (
        <Hero color="light" gradient size="fullheight">
            <Hero.Body>
                <Section>
                    <Container fluid>
                        <Heading subtitle size={2} className="si-heading">
                            Комнаты для своей игры
                </Heading>
                    </Container>
                </Section>
                <Section>
                    <Container fluid>
                        <Link to='/rooms'>
                            <Button color="info" rounded={true}>
                                К комнатам
                            </Button>
                        </Link>
                    </Container>
                </Section>
            </Hero.Body>
        </Hero>
    )
}

export default Starter;
