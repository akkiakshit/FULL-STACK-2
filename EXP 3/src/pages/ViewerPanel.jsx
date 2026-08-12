import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const ViewerPanel = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="Telemetry Data Viewer">
      <div
        className="card"
        style={{
          background: 'rgba(26, 24, 48, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 242, 254, 0.4)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 0 30px rgba(0, 242, 254, 0.15)',
        }}
      >
        <div style={{ marginBottom: '24px', position: 'relative', borderRadius: '14px', overflow: 'hidden' }}>
          <img
            src="/viewer_hero.jpg"
            alt="Viewer Telemetry"
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
              <span className="role-tag-sm badge-viewer" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                ALL AUTHENTICATED ROLES
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', color: 'white' }}>
                👁️ Live Data Stream & Analytics
              </h2>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
          This panel is accessible by users with <strong>Admin</strong>, <strong>Editor</strong>, or <strong>Viewer</strong> roles. Viewers are granted read-only insight into live system metrics, telemetry feeds, and public activity logs.
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

export default ViewerPanel;
