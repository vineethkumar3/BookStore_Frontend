import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
require('dotenv').config();

const Host_Add = process.env.HOST_ADD;


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await fetch(Host_Add+'/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
        localStorage.setItem('token', data.token);
      navigate('/home');  // ✅ Redirect without alert
    } else {
      setError(data.message || 'Invalid credentials');
    }
  } catch (err) {
    setError('Server error. Please try again later.');
    console.error(err);
  }
};


  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p><a onClick={() => navigate('/register')}>Create new account</a></p>
        <p><a href="#">Login with Google</a></p>
      </div>
    </div>
  );
};

export default Login;
