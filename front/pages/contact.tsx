import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import styles from '../styles/Contact.module.css';

const contact = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: 'Say Hi!',
		category: '',
		message: '',
	});

	const onFormElementChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/mail`,
				formData
			);
			if (res.status === 200) {
				router.push('/thankyou');
			}
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Nav />
			<div className="center-children">
				<div className="container">
					<div className={styles.headingArea}>
						<h1>Let's get in touch.</h1>
						<h2
							style={{
								margin: '2rem 0',
							}}
						>
							ATTENTION! This form is currently broken since apparently the
							tokens for Gmail expire at odd times. Please an email straight to{' '}
							<i>
								<a href="mailto:markusryoti@gmail.com">markusryoti@gmail.com</a>
							</i>{' '}
							until the issue is fixed.
						</h2>
						<p>
							Whether you want to talk business or just chat about whatever
							don't hesitate to shoot an email here!
						</p>
					</div>
					<form action="#" className={styles.form}>
						<input
							type="text"
							placeholder="Your Name"
							name="name"
							onChange={onFormElementChange}
						/>
						<input
							type="email"
							placeholder="Your Email"
							name="email"
							onChange={onFormElementChange}
						/>
						<input
							type="text"
							placeholder="Subject"
							name="subject"
							onChange={onFormElementChange}
						/>
						<select name="category" onChange={onFormElementChange}>
							<option>Say Hi!</option>
							<option>Business</option>
							<option>Coding</option>
							<option>Cars</option>
							<option>Other</option>
						</select>
						<textarea
							placeholder="Message"
							name="message"
							onChange={onFormElementChange}
						></textarea>
						<input
							type="submit"
							value="Send"
							className="btn btn-success"
							onClick={handleSubmit}
						/>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default contact;
