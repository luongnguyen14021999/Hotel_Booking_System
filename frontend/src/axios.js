import axios from 'axios';

const baseURL = 'http://localhost:9000/api/';

//Axios is mainly used to send asynchronous HTTP requests to REST endpoints
const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'multipart/form-data',
		'accept': 'application/json',
	}, 
});

export default axiosInstance;