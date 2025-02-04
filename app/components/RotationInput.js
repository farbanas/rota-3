import React, { useState } from 'react';

const RotationInput = ({ addMember, removeMember, members }) => {
  const [newMember, setNewMember] = useState('');

  const handleAdd = () => {
    if (newMember.trim()) {
      addMember(newMember);
      setNewMember('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Add member"
      />
      <button onClick={handleAdd} disabled={!newMember.trim()}>Add</button>
      {members.length > 0 && (
        <ul>
          {members.map((member, index) => (
            <li key={index}>
              {member}
              <button onClick={() => removeMember(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RotationInput;