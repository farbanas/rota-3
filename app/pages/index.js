import React, { useState, useEffect } from 'react';
import RotationInput from '../components/RotationInput';
import RotationList from '../components/RotationList';
import RotationManager from '../components/RotationManager';

const MyApp = () => {
  const [rotations, setRotations] = useState([]);
  const [activeRotationIndex, setActiveRotationIndex] = useState(0);

  useEffect(() => {
    const savedRotations = JSON.parse(localStorage.getItem('rotations'));
    if (savedRotations) {
      setRotations(savedRotations.rotations);
      setActiveRotationIndex(savedRotations.activeRotationIndex);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rotations', JSON.stringify({ rotations, activeRotationIndex }));
  }, [rotations, activeRotationIndex]);

  const addRotation = () => {
    const newRotations = [...rotations, []];
    setRotations(newRotations);
    setActiveRotationIndex(newRotations.length - 1);
  };

  const addMember = (member, rotationIndex) => {
    const newRotations = [...rotations];
    newRotations[rotationIndex] = [...newRotations[rotationIndex], member];
    setRotations(newRotations);
  };

  const removeMember = (index, rotationIndex) => {
    const newRotations = [...rotations];
    newRotations[rotationIndex] = newRotations[rotationIndex].filter((_, i) => i !== index);
    setRotations(newRotations);
  };

  const increaseIndex = (rotationIndex) => {
    const newIndex = (rotationIndex + 1) % rotations[rotationIndex].length;
    if (newIndex !== 0) {
      const newRotations = [...rotations];
      newRotations[rotationIndex] = rotations[rotationIndex].slice(newIndex).concat(rotations[rotationIndex].slice(0, newIndex));
      setRotations(newRotations);
    }
  };

  const decreaseIndex = (rotationIndex) => {
    const newIndex = (rotationIndex - 1 + rotations[rotationIndex].length) % rotations[rotationIndex].length;
    if (newIndex !== rotations[rotationIndex].length - 1) {
      const newRotations = [...rotations];
      newRotations[rotationIndex] = rotations[rotationIndex].slice(newIndex).concat(rotations[rotationIndex].slice(0, newIndex));
      setRotations(newRotations);
    }
  };

  const setActiveRotation = (index) => {
    setActiveRotationIndex(index);
  };

  return (
    <div>
      <h1>Rotation Management App</h1>
      <button onClick={addRotation} disabled={rotations.length >= 5}>Add New Rotation</button> {/* Limit to 5 rotations for simplicity */}
      {rotations.map((rotation, rotationIndex) => (
        <div key={rotationIndex} style={{ marginBottom: '20px' }}>
          <h2>Rotation {rotationIndex + 1}</h2>
          <RotationInput
            addMember={(member) => addMember(member, rotationIndex)}
            removeMember={(index) => removeMember(index, rotationIndex)}
            members={rotation}
          />
          <RotationList members={rotation} activeIndex={rotation.indexOf(rotation[activeRotationIndex])} />
          <RotationManager
            increaseIndex={() => increaseIndex(rotationIndex)}
            decreaseIndex={() => decreaseIndex(rotationIndex)}
            hasMembers={rotation.length > 0}
          />
          <button onClick={() => setActiveRotation(rotationIndex)} style={{ marginTop: '10px' }}>Activate</button>
        </div>
      ))}
    </div>
  );
};

export default MyApp;