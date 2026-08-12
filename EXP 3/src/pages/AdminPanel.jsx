import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="Admin Control Matrix">
      <div
        className="card"
        style={{
          background: 'rgba(26, 24, 48, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(157, 78, 221, 0.4)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.2)',
        }}
      >
        <div style={{ marginBottom: '24px', position: 'relative', borderRadius: '14px', overflow: 'hidden' }}>
          <img
            src="/admin_hero.jpg"
            alt="Admin Matrix"
            style={{ width: '100%', height: '220px', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(17, 15, 34, 0.95), transparent)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '24px',
            }}
          >
            <div>
              <span className="role-tag-sm badge-admin" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                ADMIN ROLE EXCLUSIVE
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', color: 'white' }}>
                🛡️ System Administrator Matrix
              </h2>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
          This panel is strictly restricted to users with the <strong>Admin</strong> role. As an Admin, you have unhindered control over system authentication, JWT secret rotation, user permission grants, and security compliance.
        </p>

        <div style={{ display: 'flex', gap: '14px' }}>
          <button onClick={() => navigate('/dashboard')} className="action-btn-neon">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPanel;
