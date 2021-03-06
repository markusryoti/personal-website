import axios from 'axios';
import router from 'next/router';
import React, { useContext, useState } from 'react';
import Nav from '../components/Nav';
import { UserContext } from '../context/UserState';
import setAuthToken from '../lib/setAuthToken';

import styles from '../styles/Signup.module.css';

const signup = () => {
	const userContext = useContext(UserContext);
	const { setUser } = userContext;

	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		registerToken: '',
	});
	const [password2, setPassword2] = useState('');

	const handleChange = (e: any) => {
		const { value, name } = e.currentTarget;
		setFormData({ ...formData, [name]: value });
	};
	const handleSignup = async e => {
		e.preventDefault();
		if (formData.password !== password2) {
			alert('Passwords dont match!');
			return;
		}

		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/`,
				formData
			);
			if (res.status === 200) {
				setUser(res.data.user);
				localStorage.setItem('token', res.data.token);
				setAuthToken(res.data.token);
				router.push('/');
				return;
			}
			console.log(res.data);
		} catch (error) {
			alert("Couldn't signup!");
			console.log(error);
		}
	};

	return (
		<>
			<Nav />
			<div className="center-children">
				<div className="container">
					<form className={styles.form}>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							name="email"
							onChange={handleChange}
						/>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							onChange={handleChange}
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={handleChange}
						/>
						<label htmlFor="password2">Confirm password</label>
						<input
							type="password"
							id="password2"
							name="password2"
							onChange={e => setPassword2(e.target.value)}
						/>
						<label htmlFor="token">Register Token</label>
						<input
							type="text"
							id="token"
							name="registerToken"
							onChange={handleChange}
						/>
						<input
							type="submit"
							value="Signup"
							className="btn btn-success"
							onClick={handleSignup}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default signup;
