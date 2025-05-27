import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
const Host_Add = import.meta.env.HOST_ADD;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const jsonBody = JSON.stringify(formData);

      const res = await fetch(Host_Add+'/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: jsonBody,
      });

      if (res.redirected || res.status === 200) {
        navigate('/');  // Redirect to login page
      } else {
        const html = await res.text();
        if (html.includes("Email already exists!")) {
          setError("Email already exists!");
        } else {
          setError("Registration failed.");
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Already have an account? <a onClick={() => navigate('/')}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
