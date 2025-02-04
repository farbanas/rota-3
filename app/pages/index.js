import React, { useState, useEffect } from 'react';
import RotationInput from '../components/RotationInput';
import RotationList from '../components/RotationList';
import RotationManager from '../components/RotationManager';

const MyApp = () => {
  const [members, setMembers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const savedMembers = JSON.parse(localStorage.getItem('rotationMembers'));
    if (savedMembers) {
      setMembers(savedMembers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rotationMembers', JSON.stringify(members));
  }, [members]);

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  const removeMember = (index) => {
   const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const increaseIndex = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const decreaseIndex = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  return (
    <div>
      <h1>Rotation Management App</h1>
      <RotationInput
        addMember={addMember}
        removeMember={removeMember}
        members={members}
      />
      <RotationList members={members} activeIndex={activeIndex} />
      <RotationManager
        increaseIndex={increaseIndex}
        decreaseIndex={decreaseIndex}
        hasMembers={members.length > 0}
      />
    </div>
  );
};

export default MyApp;