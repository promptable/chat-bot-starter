// src/pages/api/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ProfileStore } from '../../server/mockData/ProfileStore';

const profileStore = new ProfileStore();

// Creation of mock data
profileStore.create('user1', { name: 'John Doe', interests: 'Running, Reading, Coding', about: 'Software Developer from NY' });

export default (req: NextApiRequest ,res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  res.status(200).json(profileStore.get(id as string));
};

