import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Input } from "reactstrap";
import { registerAction } from "../redux/actions";

let input = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};
function RegisterPage(props) {
	const [registerInfo, setregisterInfo] = useState(input);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(props.userID);
		props.registerAction(registerInfo);
	};
	const handleInput = (e) => {
		setregisterInfo({ ...registerInfo, [e.target.id]: e.target.value });
	};

	return (
		<div>
			<div className="container" style={{ width: "400px" }}>
				<form onSubmit={handleSubmit}>
					<h4>Username</h4>
					<Input
						type="text"
						onChange={handleInput}
						id="username"
						value={registerInfo.username}
					/>
					<h4>Email</h4>
					<Input
						type="email"
						onChange={handleInput}
						id="email"
						value={registerInfo.email}
					/>
					<h4>Password</h4>
					<Input
						type="password"
						onChange={handleInput}
						id="password"
						value={registerInfo.password}
					/>
					<h4>Confirm Password</h4>
					<Input
						type="password"
						onChange={handleInput}
						id="confirmPassword"
						value={registerInfo.confirmPassword}
					/>
					<Button>SIGN UP</Button>
				</form>
			</div>
		</div>
	);
}
const mapStateToProps = ({ user }) => {
	return {
		userID: user.id,
		email: user.email,
	};
};
export default connect(mapStateToProps, { registerAction })(RegisterPage);
