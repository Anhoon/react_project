import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/user"; 

class CommonService {
    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }
}

export default new CommonService();

