

// // export default Login;
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../store/slices/authSlice';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(loginUser(formData));
//     if (loginUser.fulfilled.match(resultAction)) {
//       navigate('/'); // Redirect to home after successful login
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Log In</h2>
//       <input
//         type="text"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="email"
//         className="block w-full p-2 border mb-4"
//       />
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//         className="block w-full p-2 border mb-4"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">Log In</button>
//     </form>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors as the user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate the form before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const resultAction = await dispatch(loginUser(formData)).unwrap();
      setSuccess(true);
      setFormData({ email: '', password: '' }); // Clear form on success
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setErrors({
        form: error.message || "Login failed. Please try again.",
        ...error?.errors
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen m-auto p-40 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Login successful! Redirecting...
          </div>
        )}

        {/* Error Messages */}
        {errors.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.form}
          </div>
        )}

        {/* email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className={`block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
