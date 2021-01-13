import axios from "axios";
import { api_url } from "../../helpers/api_url";

export const registerAction = (data) => {
	return (dispatch) => {
		axios
			.post(`${api_url}/users`, data)
			.then((res) => {
				console.log(res);
				if (res.data) {
					dispatch({
						type: "LOGIN",
						payload: res.data,
					});
					localStorage.setItem("id", res.data.id);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const keepLoginAction = (id) => {
	return (dispatch) => {
		axios
			.get(`${api_url}/users/${id}`)
			.then((res) => {
				dispatch({
					type: "LOGIN",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
