import React from 'react';

const ProfileComponent = (props) => {

    return (
        <div>
            <h1>Profile</h1>
            <h3>Logged in User is {props.user.name} </h3>
            <br />
        </div>
    )
}

export default ProfileComponent;
