import React from 'react';

const RotationList = ({ members, activeIndex }) => {
  return (
    <div>
      <h2>Current Rotation</h2>
      {members.length > 0 ? (
        <ul>
          {members.map((member, index) => (
            <li
              key={index}
              style={{ opacity: index === activeIndex ? '1' : '0.5' }}
            >
              {member}
            </li>
          ))}
        </ul>
      ) : (
        <p>No members in the rotation.</p>
      )}
    </div>
  );
};

export default RotationList;