import axios from "axios";
import { api_url } from "../../helpers/api_url";
import {
	API_PRODUCT_FILL,
	API_PRODUCT_START,
	API_PRODUCT_SUCCESS,
} from "../types";

export const fetchProductsAction = (condition) => {
	return (dispatch) => {
		dispatch({
			type: API_PRODUCT_START,
		});
		if (condition) {
			axios
				.get(`${api_url}/products`)
				.then((res) => {
					dispatch({
						type: API_PRODUCT_FILL,
						payload: res.data,
					});
					dispatch({
						type: API_PRODUCT_SUCCESS,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.get(`${api_url}/products?isAvailable=0`)
				.then((res) => {
					dispatch({
						type: API_PRODUCT_FILL,
						payload: res.data,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
};

export const deleteProductAction = (id) => {
	return (dispatch) => {
		axios
			.put(`${api_url}/products/${id}`)
			.then((res) => {
				dispatch(fetchProductsAction());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
