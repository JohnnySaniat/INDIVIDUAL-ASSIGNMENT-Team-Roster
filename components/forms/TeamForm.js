import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, getTeams, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  mission: '',
  team_image: '',
  private: false,
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setTeams] = useState([]);
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
      updateTeam(formInput).then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.team_name ? 'Update' : 'Create'} team</h2>

      {/* Name Name  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter team's Name"
          name="team_name"
          value={formInput.team_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Team Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="team_image"
          value={formInput.team_image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* MISSION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Misson" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Mission"
          name="mission"
          value={formInput.mission}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRIVATE INPUT  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="private"
        name="private"
        label="Is Private?"
        checked={formInput.private}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            private: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    team_image: PropTypes.string,
    mission: PropTypes.string,
    firebaseKey: PropTypes.string,
    private: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
