import axios from 'axios';

const refreshToken = (callback) => {
    axios.post('/api/login/refresh', {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.data.token.accessToken;
        axios.defaults.headers.common['Set-Cookie'] = "refreshToken=" + res.data.data.token.accessToken;
        if (callback) {
            callback(true);
        }

        setTimeout(() => {
            refreshToken(null);
        }, (600 * 1000));
    })
    .catch((ex) => {
        console.log('app silent requset fail : ' + ex);
        if (callback) {
            callback(false);
        }
    })
    .finally(() => {
      console.log('refresh token request end');
    //   setLoading(true);
    });
};

export default refreshToken;
