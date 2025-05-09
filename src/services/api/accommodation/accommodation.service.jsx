import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAll = () => {
    return axios.get(`${BASE_URL}/api/accommodation`);
};

const AccommodationService = {
    getAll
}

export default AccommodationService;