import App from 'next/app';
import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import '../styles/styles.scss';

import withRematch from '../rematch/withRematch';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/integration/react';

interface Props {
  reduxStore: Store;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const persistor = getPersistor();
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withRematch(MyApp);
