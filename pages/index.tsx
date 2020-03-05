import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { iRootState, RootDispatch } from '../rematch/store';
import { parseCookies } from 'nookies';
import { checkServer } from '../rematch/checkServer';
import Router from 'next/router';
import Layout from '../components/common/layouts/layout';
import HomeComponent from '../components/pages/home/Home';

type User = {
  name?: string;
}

const useRematchDispatch = <D extends {}, MD>(selector: (dispatch: D) => MD) => {
    const dispatch = useDispatch<D>()
      return selector(dispatch)
    }

const Home = () => {
  const user: User = useSelector((state: iRootState) => state.user);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useRematchDispatch((dispatch: RootDispatch) => ({
    logout: () => dispatch.user.logout()
  }));

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <Layout>
      <HomeComponent 
      handleModalShow={handleModalShow} 
      handleModalClose={handleModalClose} 
      user={user} 
      logout={logout}
      showModal={showModal}
      />
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  const { access_token } = parseCookies(ctx);

  if(!access_token){
    if(checkServer()){
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    } else {
      Router.push('/login');
    }
  }

  return {
    isAuthorized: access_token ? true : false
  };
};

export default Home;