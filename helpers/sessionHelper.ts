import nookies from 'nookies';

export const seed = (data: any) => {
    if (data.access_token) {
        nookies.set(null, 'access_token', data.access_token, {});
    }

    if (data.refresh_token) {
        nookies.set(null, 'refresh_token', data.refresh_token, {});
    }
}

export const logout = () => {
    nookies.destroy(null, 'access_token');
    nookies.destroy(null, 'refresh_token');
}