/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/membersData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  role: '',
  team_name: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member's Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ROLE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEAM SELECT */}
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>

        {/* TEAM INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Type the Team Name to Confirm Roster Add" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Type Team Name to Confirm"
            name="team_name"
            value={formInput.team_name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    role: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
    team_name: PropTypes.node,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
