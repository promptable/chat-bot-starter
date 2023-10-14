import React from 'react';
import classNames from 'classnames';

const ProfileAvatar: React.FC = () => {
    // UI for avatar and profile
    return (
        <div className={classNames('daisy-avatar')}>  
            <img src='avatar.png' alt='Profile avatar' className={classNames('avatar-image')}/>
            <p className={classNames('username')}>Username</p>
        </div>
    );
};

export default ProfileAvatar;
