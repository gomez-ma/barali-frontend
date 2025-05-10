import axios from "axios";
import AuthHeader from "../../common/AuthHeader";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getPromotion = () => {
    return axios.get(`${BASE_URL}/api/accommodation/promotion`);
};

const getAll = () => {
    return axios.get(`${BASE_URL}/api/accommodation`, { headers: AuthHeader() });
};

const AccommodationService = {
    getPromotion,
    getAll
}

export default AccommodationService;