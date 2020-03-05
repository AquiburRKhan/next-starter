import { createModel } from '@rematch/core';
import * as sessionHelper from '../../helpers/sessionHelper';
import * as authApi from '../../api/authApi';
import Router from 'next/router';

type credentials = {
    email: string,
    password: string
}

const user = createModel({
    state: {}, // initial state
    reducers: {
        // handle state changes with pure functions
        saveUser(state, payload) {
            if(payload){
                return payload;
            }

            return state;
        },
        deleteUser() {
            Router.push('/login');
            return {};
        }
    },
    effects: {
        async login(payload: credentials) {
            try{
                const config = {
                    params: {
                        remember_me: false
                    }
                }

                const res = await authApi.login(payload, config)

                sessionHelper.seed(res.data);
                
                const response = await authApi.me();
                
                this.saveUser(response.data);
            } catch(e){
                console.log(e.response)
                this.saveUser(null);
            }
        },
        async logout() {
            sessionHelper.logout();
            this.deleteUser(null);
        }
    },
});

export default user