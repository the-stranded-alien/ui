import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import {
    AiOutlineHome,
    AiOutlineCheck,
    AiOutlineClose
} from 'react-icons/ai';
import logo from '../assets/logo.png';

const NavBar = () => {
    const [expand, updateExpand] = useState(false);
    const [navBar, updateNavBar] = useState(false);

    function scrollHandler() {
        if (window.scrollY >= 25) {
            updateNavBar(true);
        } else {
            updateNavBar(false);
        }
    }

    window.addEventListener('scroll', scrollHandler);

    return (
        <Navbar expanded={expand} fixed="top" expand="md" className={navBar ? 'sticky' : 'navbar'}>
            <Container>
                <Navbar.Brand href="/" className="d-flex">
                    <h2><b>Asset Monitoring</b></h2>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => {
                        updateExpand(expand ? false : 'expanded');
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" defaultActiveKey="#home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" onClick={() => updateExpand(false)}>
                                <AiOutlineHome style={{ marginBottom: '2px' }} /> Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/transformer" onClick={() => updateExpand(false)}>
                                <AiOutlineCheck  style={{ marginBottom: '2px' }} /> Transformer
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/motor" onClick={() => updateExpand(false)}>
                                <AiOutlineCheck  style={{ marginBottom: '2px' }} /> Motor
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/generator" onClick={() => updateExpand(false)}>
                                <AiOutlineCheck  style={{ marginBottom: '2px' }} /> Generator
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/turbine" onClick={() => updateExpand(false)}>
                                <AiOutlineCheck  style={{ marginBottom: '2px' }} /> Turbine
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
