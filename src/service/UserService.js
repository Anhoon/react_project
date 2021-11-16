import React, {useState} from 'react';
import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/user";

const test1 = (test11) => ({
    root: test11
});

class UserService {
    getUsers() {
        return axios.get('/api/board/list', {
            headers: {
            'Content-Type': 'application/json',
            }
        });
    }
    getUsers2() {
        return axios.get('/api/user', {
            headers: {
            'Content-Type': 'application/json',
            }
        });
    }
}

export default new UserService();

