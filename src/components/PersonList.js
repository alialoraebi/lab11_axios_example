import React, { Component } from 'react';
import axios from "axios";
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class PersonList extends React.Component {
    state = {
        persons: []
    };

    componentDidMount() {
        fetch('https://randomuser.me/api/?results=10')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const persons = data.results;
                this.setState({ persons });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: true });
            });
    }

    getPersons = async (pageno) => {
        try {
            var res = await axios.get(`https://randomuser.me/api/?results=${pageno}`)
            console.log(res)
            console.log(res.data)
            console.log(res.data.data)
            this.setState({persons: res.data.data})
        } catch (error) {
            console.log(error)
        }
    }

    handleDetailsClick(person) {
        const details = `
        Name: ${person.name.title} ${person.name.first} ${person.name.last}
        User Name: ${person.login.username}
        Gender: ${person.gender}
        Time Zone Description: ${person.location.timezone.description}
        Address: ${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.postcode}
        Email: ${person.email}
        Birth Date and Age: ${new Date(person.dob.date).toLocaleDateString()} (${person.dob.age})
        Register Date: ${new Date(person.registered.date).toLocaleDateString()}
        Phone: ${person.phone}
        Cell: ${person.cell}
    `;
        alert(details);
    }

    render() {
        return (
            <Container>
                <h2 className="text-center bg-primary text-white py-3">User List</h2>
                <Row>
                    {this.state.persons.map((person, index) => (
                        <Col key={person.login.uuid || index} md={12} className={`mb-3 ${index % 2 === 0 ? "bg-light" : ""}`}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col md={3}>
                                            <Card.Img src={person.picture.large} />
                                        </Col>
                                        <Col md={9}>
                                            <Card.Title>{person.name.title} {person.name.first} {person.name.last}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{person.login.username}</Card.Subtitle>
                                            <Card.Text>Gender: {person.gender}</Card.Text>
                                            <Card.Text>Time Zone Description: {person.location.timezone.description}</Card.Text>
                                            <Card.Text>Address: {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.postcode}</Card.Text>
                                            <Card.Text>Email: {person.email}</Card.Text>
                                            <Card.Text>Birth Date and Age: {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age})</Card.Text>
                                            <Card.Text>Register Date: {new Date(person.registered.date).toLocaleDateString()}</Card.Text>
                                            <Card.Text>Phone: {person.phone}</Card.Text>
                                            <Card.Text>Cell: {person.cell}</Card.Text>
                                            <Button variant="primary" onClick={() => this.handleDetailsClick(person)}>Details</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }




}
