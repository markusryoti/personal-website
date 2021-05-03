import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import styles from '../styles/Contact.module.css';

const contact = ({ user }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    const res = await axios.post(`http://localhost:5001/api/v1/mail`, formData);
    if (res.status === 200) {
      router.push('/thankyou');
    }
  };

  return (
    <>
      <Nav user={user} />
      <div className="center-children">
        <div className="container">
          <h1>Let's get in touch.</h1>
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
