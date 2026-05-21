import React, { useState } from 'react';

// --- Signup Component ---
const Signup = () => {
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill all fields.');
      return;
    }
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || `Signup failed (${res.status})`);
        return;
      }
      // on success: optionally auto-login or redirect
    } catch (err) {
      console.error('Signup network error:', err);
      setError(`Network error: could not reach ${API}.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        {error && <div className="p-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;