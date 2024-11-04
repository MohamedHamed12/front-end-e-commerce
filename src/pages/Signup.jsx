import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser }from '../store/slices/authSlice';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="block w-full p-2 border mb-4"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="block w-full p-2 border mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;
