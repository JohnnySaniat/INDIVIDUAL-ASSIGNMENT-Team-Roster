import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MemberCard from '../../components/MemberCard';
import { getTeamDetails } from '../../api/mergedData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});

  // TODO: Call Router Hook
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getTDetails = () => {
    getTeamDetails(firebaseKey).then(setTeamDetails);
  };

  useEffect(() => {
    getTDetails();
  }, [firebaseKey]);

  return (
    <div>{teamDetails.members?.map((member) => (
      <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTDetails} />
    ))}
    </div>
  );
}
