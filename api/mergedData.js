import { deleteMember, getSingleMember } from './membersData';
import { deleteSingleTeam, getSingleTeam, getTeamMembers } from './teamData';

const getMemberDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(firebaseKey).then((memberObj) => {
    getSingleTeam(memberObj.team_id).then((teamObject) => {
      resolve({ ...memberObj, teamObject });
    });
  }).catch(reject);
});

const getTeamDetails = async (firebaseKey) => {
  const team = await getSingleTeam(firebaseKey);
  const members = await getTeamMembers(team.firebaseKey);

  return { ...team, members };
};

const deleteTeamMembersRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamMembers(firebaseKey).then((teamsMemberArray) => {
    const deleteMemberPromises = teamsMemberArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getMemberDetails, getTeamDetails, deleteTeamMembersRelationship,
};
