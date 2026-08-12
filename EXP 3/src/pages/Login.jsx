import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, MOCK_USERS } from '../auth/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  const fillQuickLogin = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  const getRoleBadgeClass = (role) => {
    if (role === 'Admin') return 'badge-admin';
    if (role === 'Editor') return 'badge-editor';
    return 'badge-viewer';
  };

  return (
    <div className="auth-wrapper-full">
      <div className="glowing-orb orb-1" />
      <div className="glowing-orb orb-2" />

      <div className="login-glass-card">
        <div className="auth-brand-badge">
          <div className="brand-icon">⚡</div>
          <span className="brand-title" style={{ fontSize: '1.4rem' }}>
            JWT RBAC Studio
          </span>
        </div>

        <div className="auth-header-text">
          <h2>Welcome Back</h2>
          <p>Sign in to access your role-permission portal</p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ borderRadius: '12px', marginBottom: '20px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group-dark">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="e.g. admin, editor, viewer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group-dark">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-glow-submit">
            Sign In to Portal
          </button>
        </form>

        <div className="demo-account-box">
          <h4>💡 Autofill Mock User Account</h4>
          <div className="role-autofill-grid">
            {MOCK_USERS.map((u) => (
              <button
                key={u.username}
                type="button"
                className="autofill-btn"
                onClick={() => fillQuickLogin(u.username, u.password)}
              >
                <span>
                  <strong>{u.name}</strong> ({u.username})
                </span>
                <span className={`role-tag-sm ${getRoleBadgeClass(u.role)}`}>
                  {u.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
