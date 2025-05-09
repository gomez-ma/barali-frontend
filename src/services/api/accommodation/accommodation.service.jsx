import axios from "axios";

const getAll = () => {
    return axios.get("http://localhost:5000/api/accommodation");
};

const AccommodationService = {
    getAll
}

export default AccommodationService;