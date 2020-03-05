import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { iRootState } from '../rematch/store';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import Layout from '../components/common/layouts/layout';
import ProfileComponent from '../components/pages/profile/Profile';

type User = {
  name?: string;
};

const Profile = () => {
  const user: User = useSelector((state: iRootState) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { access_token } = parseCookies();

    if(!access_token){
      Router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {
        isAuthenticated && (
        <Layout>
          <ProfileComponent />
        </Layout>
      )}
    </>
  );
};

export default Profile;
