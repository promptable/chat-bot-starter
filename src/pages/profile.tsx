import { FC } from 'react';

// Mock data
const mockProfile = {
   name: 'John Doe',
   age: 30,
   bio: 'Loves to hike and bake',
   interests: ['Hiking', 'Baking', 'Guitar']
};

const Profile: FC = () => {
  return (
    <div>
      <h1>{mockProfile.name}</h1>
      <h2>{mockProfile.age}</h2>
      <p>{mockProfile.bio}</p>
      <h3>Interests</h3>
      <ul>
        {mockProfile.interests.map((interest) => <li key={interest}>{interest}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
