// src/components/ui/DatingProfile.js
import React from 'react';

const DatingProfile = ({profile}) => {
  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.interests}</p>
      <p>{profile.about}</p>
    </div>
  );
};

export default DatingProfile;
