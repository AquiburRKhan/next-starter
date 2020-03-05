import React from 'react';
import Button from 'react-bootstrap/Button';
import ExampleModal from '../../common/modals/exampleModal'
import Router from 'next/router';

const HomeComponent = (props) => {

    return (
        <>
        <h3>Logged in User is {props.user.name} </h3>
        <p>
            <Button variant='primary' onClick={() => Router.push('/login')}>
            To login
            </Button>
            <Button variant='primary' onClick={() => Router.push('/profile')}>
            To profile
            </Button>
            <Button variant="primary" onClick={props.handleModalShow}>
            Launch demo modal
            </Button>
            <ExampleModal handleModalClose={props.handleModalClose} showModal={props.showModal}></ExampleModal>
            <Button variant="primary" onClick={props.logout}>
            Logout
            </Button>
        </p>
      <br />
        </>
    )
}

export default HomeComponent;
