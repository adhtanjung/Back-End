import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { keepLoginAction } from "./redux/actions";

function App(props) {
	useEffect(() => {
		const id = localStorage.getItem("id");
		if (id !== 0) {
			props.keepLoginAction(id);
		}
	}, [props.userID]);
	return (
		<div>
			<NavigationBar />
			<Route path="/" exact component={HomePage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
		</div>
	);
}
const mapStateToProps = ({ user }) => {
	return {
		userID: user.id,
	};
};
export default connect(mapStateToProps, { keepLoginAction })(App);
