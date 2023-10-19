/* eslint-disable @next/next/no-img-element */
import { Card } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Card style={{ width: '11rem', margin: '25px' }}>
        <Card.Img variant="top" src={user.photoURL} alt={user.displayName} style={{ height: '150px' }} />
        <Card.Body>
          <Card.Title>{user.displayName}</Card.Title>
          <Card.Text>{user.email}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
