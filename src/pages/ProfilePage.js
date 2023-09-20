// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import DatingProfile from '../components/ui/DatingProfile.js';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch('/api/user1')
            .then(response => response.json())
            .then(data => setProfile(data));
    }, []);

    return (
        <div>
            {profile ? <DatingProfile profile={profile} /> : <p>Loading...</p>}
        </div>
    );
};

export default ProfilePage;
