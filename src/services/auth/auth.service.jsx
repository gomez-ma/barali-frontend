import axios from "axios";

const login = (email, password) => {
    return axios
    .post(`http://localhost:5000/api/auth/signin`, { email, password})
    .then(response => {
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    });
}

const AuthService = {
    login,
}

export default AuthService;