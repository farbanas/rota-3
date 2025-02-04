import React from 'react';

const RotationManager = ({ increaseIndex, decreaseIndex, hasMembers }) => {
  return (
    <div>
      <button disabled={!hasMembers} onClick={decreaseIndex}>
        Backward
      </button>
      <button disabled={!hasMembers} onClick={increaseIndex}>
        Forward
      </button>
    </div>
  );
};

export default RotationManager;