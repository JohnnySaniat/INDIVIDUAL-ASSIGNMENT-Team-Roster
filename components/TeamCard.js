/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamMembersRelationship } from '../api/mergedData';
import lock from '../images/logos/lock.png';

function TeamCard({ teamObj, onUpdate }) {
  const deleteTeam = () => {
    if (window.confirm(`Do you want to delete ${teamObj.team_name}?`)) {
      deleteTeamMembersRelationship(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.team_image} alt={teamObj.team_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <span>{teamObj.mission}</span>
        <h6> {teamObj.private}</h6>
        <p className="card-text bold">{teamObj.private && (
        <span>
          <img alt="lock" src={lock.src} />
        </span>
        )} {teamObj.private}
        </p>
        <br />
        {/* DYNAMIC LINK TO VIEW THE team DETAILS  */}
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE team DETAILS  */}
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    team_image: PropTypes.string,
    mission: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
    private: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
