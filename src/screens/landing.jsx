import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import GithubLogo from 'Image/github_logo';
import BookLogo from 'Image/book_logo';

const Landing = () => {
    return(
        <main>
            <Container fluid>
                <Row className="logo-row">
                    <Col
                        className="text-center"
                        xs={{ span: 6, offset: 3 }}
                    >
                        <Image src='static/img/doubleu_logo.png' className="logo" alt="DoUbleU Logo" fluid />
                    </Col>
                </Row>
                <Row className="link-row">
                    <Col
                        xl={{ span: 1, offset: 4, order: 1 }}
                        lg={{ span: 1, offset: 4, order: 1 }}
                        md={{ span: 2, offset: 3, order: 1 }}
                        xs={{ span: 4, offset: 1, order: 1 }}
                    >
                        <a href="https://github.com/wranders" target="_blank" rel="noopener noreferrer">
                            <GithubLogo/>
                            <figcaption>Github</figcaption>
                        </a>
                    </Col>
                    <Col
                        xl={{ span: 1, offset: 2, order: 2 }}
                        lg={{ span: 1, offset: 2, order: 2 }}
                        md={{ span: 2, offset: 2, order: 2 }}
                        xs={{ span: 4, offset: 2, order: 2 }}
                    >
                        <a href="https://www.doubleu.codes/docs/" target="_blank" rel="noopener noreferrer">
                            <BookLogo/>
                            <figcaption>Docs</figcaption>
                        </a>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Landing;