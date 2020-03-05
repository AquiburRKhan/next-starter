import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '../rematch/store';
import Router from 'next/router';

const useRematchDispatch = <D extends {}, MD>(selector: (dispatch: D) => MD) => {
  const dispatch = useDispatch<D>()
  return selector(dispatch)
}

const Login: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useRematchDispatch((dispatch: RootDispatch) => ({
      login: (credentials) => dispatch.user.login(credentials)
    }));

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      await login({ email, password });
      Router.push('/');
    };

    return (
        <div className="authBox">
            <form className="authForm" onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div>
                    <input placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;
