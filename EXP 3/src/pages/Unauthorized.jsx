import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="auth-wrapper-full">
      <div className="glowing-orb orb-2" style={{ opacity: 0.6, width: '600px', height: '600px' }} />

      <div className="login-glass-card" style={{ textAlign: 'center', borderColor: 'rgba(255, 42, 95, 0.4)' }}>
        <div
          style={{
            fontSize: '5rem',
            fontWeight: '900',
            background: 'linear-gradient(to bottom, #ff2a5f, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '12px',
          }}
        >
          403
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '8px' }}>
          RBAC Policy Violation
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '24px' }}>
          Access to this route is blocked. Your current role <strong>'{user?.role || 'Guest'}'</strong> does not hold sufficient permission claims to access this module.
        </p>

        <button onClick={() => navigate('/dashboard')} className="btn-glow-submit">
          ← Return to Safe Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
