/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function Showteams() {
  const [teams, setTeams] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the teams
  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  // TODO: make the call to the API to get all the teams on component render
  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/team/new" passHref>
        <Button>Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over teams here using teamCard component */}
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>
    </div>
  );
}

export default Showteams;
