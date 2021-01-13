const INITIAL_STATE = {
	id: 0,
	email: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
			};

		default:
			return state;
	}
};
