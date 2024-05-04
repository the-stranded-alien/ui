import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Card, ListGroup, CardGroup } from 'react-bootstrap';
import Particle from '../components/Particle';

const HomePage = () => {

    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetch('https://ec2-3-6-87-196.ap-south-1.compute.amazonaws.com:5000/assets')
            .then(response => response.json())
            .then(data => {
                setAssets(data);
            })
            .catch(err => console.log(err.message));
    }, []);

    const renderAssets = () => {
        return assets.map((asset, index) => (
                <Card style={{ width: '20rem' }} key={index}>
                    <Card.Header style={{ background: '#e0b0ff' }}>{ asset.type }({ (asset.assets.length) })</Card.Header>
                    <ListGroup variant='flush' key={index}>
                        {asset.assets.map((as, idx) => (
                            <ListGroup.Item key={idx}>{ as.name }</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
        ));
    };


    return (
        <section>
            <Container fluid className="home-section" id="home">
                <Particle />
            </Container>
            <CardGroup style={{ marginTop: '100px', gap: '5px', padding:'10px' }}>
                    {renderAssets()}
            </CardGroup>
        </section>
    );
};

export default HomePage;
