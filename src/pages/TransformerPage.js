import React, { useState, useEffect } from 'react';
import { Text, Container, Card, ListGroup, CardGroup } from 'react-bootstrap';
import Particle from '../components/Particle';

const TransformerPage = () => {
    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        fetch('http://ec2-3-6-87-196.ap-south-1.compute.amazonaws.com:5000/sensors/asset-type/Transformer')
            .then(response => response.json())
            .then(data => {
                setSensors(data);
            })
            .catch(err => console.log(err.message));
    }, []);

    const getAssetData = (asset_id) => {
        return fetch(`http://ec2-3-6-87-196.ap-south-1.compute.amazonaws.com:5000/realtime/asset/${asset_id}`)
            .then(response => response.json())
            .catch(err => console.log(err.message));
    };

    const [assetData, setAssetData] = useState({});

    useEffect(() => {
        sensors.forEach(sensor => {
            getAssetData(sensor.asset_id)
                .then(data => {
                    setAssetData(prevState => ({
                        ...prevState,
                        [sensor.asset_id]: data
                    }));
                })
                .catch(err => console.log(err.message));
        });
    }, [sensors]);

    const alarmStatus = (value, alarm, warning) => {
        if (value >= alarm) return 'red';
        else if (value < alarm && value >= warning) return 'orange';
        else return 'green';
    };

    const timeFormat = (timestamp) => {
        return new Date(timestamp).toUTCString();
    };

    const getAssetName = (asset_id, sensor_id) => {
        const asset = sensors.find(asset => asset.asset_id === asset_id);
        if (!asset) return null;
        const sensor = asset.sensors.find(sensor => sensor.id === sensor_id);
        if (!sensor) return null;
        return sensor.name;
    };

    const renderSensors = () => {
        return sensors.map((sensor, index) => (
            <Card style={{ width: '20rem' }} key={index}>
                <Card.Header style={{ background: '#e0b0ff' }}>
                    Asset: {sensor.sensors[0].asset_name}
                </Card.Header>
                <Card.Body>
                    <ListGroup variant='flush' key={index}>
                        {sensor.sensors.map((s, idx) => (
                            <ListGroup.Item key={idx}>
                                <Card>
                                    <Card.Header style={{ background: '#e0b0ff' }}>Sensor: {s.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Text style={{ color: 'red' }}>Alarm Limit: {s.alarm_limit}</Card.Text>
                                        <Card.Text style={{ color: 'orange' }}>Warning Limit: {s.warning_limit}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {renderAssetData(sensor.asset_id)}
                </Card.Body>
            </Card>
        ));
    };

    const renderAssetData = (asset_id) => {
        return (
            <ListGroup>
                {assetData[asset_id]?.map((data, idx) => (
                    <ListGroup.Item key={idx} style={{ background: '#e0b0ff' }}>
                        Sensor: {getAssetName(asset_id, data.sensor_id)}
                        {data?.values?.map((row, i) => (
                            <ListGroup.Item key={i} style={{ color: alarmStatus(row.value, row.alarm_limit, row.warning_limit)}}>
                                {timeFormat(row.timestamp)} - {row.value}
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    };

    return (
        <section>
            <Container fluid className="home-section" id="home">
                <Particle />
            </Container>
            <CardGroup style={{ marginTop: '100px', gap: '5px', padding: '10px' }}>
                {renderSensors()}
            </CardGroup>
        </section>
    );
};

export default TransformerPage;
