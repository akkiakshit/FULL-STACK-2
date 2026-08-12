import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AppLayout from '../components/AppLayout';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'Admin';
  const isEditor = user?.role === 'Editor';
  const isViewer = user?.role === 'Viewer';

  return (
    <AppLayout title="RBAC Control Center">
      {/* Featured Role Hero Cards Grid (Inspired by the Reference Image!) */}
      <div className="hero-grid">
        {/* Admin Card */}
        <div className="hero-card hero-card-admin">
          <div className="card-bg-overlay">🛡️</div>
          <div className="card-header-top">
            <span className="card-badge">RESTRICTED: ADMIN ONLY</span>
            <span style={{ fontSize: '1.2rem' }}>⭐ Level 3</span>
          </div>

          <div className="card-content-area">
            <h2 className="card-title-lg">Admin Management Matrix</h2>
            <p className="card-desc">
              Full administrative privileges, user management, and JWT secret key configuration.
            </p>
            <ul className="permission-list">
              <li className="permission-item">
                <span className="check-dot" /> User Role Assignment & Revocation
              </li>
              <li className="permission-item">
                <span className="check-dot" /> Access Control Audit Logs
              </li>
            </ul>
          </div>

          {isAdmin ? (
            <button onClick={() => navigate('/admin')} className="action-btn-neon">
              Go to Admin Panel →
            </button>
          ) : (
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              🔒 Locked for role '{user?.role}'
            </div>
          )}
        </div>

        {/* Editor Card */}
        <div className="hero-card hero-card-editor">
          <div className="card-bg-overlay">✏️</div>
          <div className="card-header-top">
            <span className="card-badge">ADMIN & EDITOR ACCESS</span>
            <span style={{ fontSize: '1.2rem' }}>✨ Level 2</span>
          </div>

          <div className="card-content-area">
            <h2 className="card-title-lg">Content & Media Editor Studio</h2>
            <p className="card-desc">
              Publish content, edit system articles, and manage uploaded media files.
            </p>
            <ul className="permission-list">
              <li className="permission-item">
                <span className="check-dot" /> Live Article Publishing & Editing
              </li>
              <li className="permission-item">
                <span className="check-dot" /> Media Asset Management
              </li>
            </ul>
          </div>

          {isAdmin || isEditor ? (
            <button onClick={() => navigate('/editor')} className="action-btn-neon">
              Go to Editor Panel →
            </button>
          ) : (
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              🔒 Locked for role '{user?.role}'
            </div>
          )}
        </div>

        {/* Viewer Card */}
        <div className="hero-card hero-card-viewer">
          <div className="card-bg-overlay">👁️</div>
          <div className="card-header-top">
            <span className="card-badge">ALL AUTHENTICATED ROLES</span>
            <span style={{ fontSize: '1.2rem' }}>🌐 Level 1</span>
          </div>

          <div className="card-content-area">
            <h2 className="card-title-lg">Read-Only Analytics Viewer</h2>
            <p className="card-desc">
              Accessible by Admin, Editor, and Viewer roles to inspect telemetry data.
            </p>
            <ul className="permission-list">
              <li className="permission-item">
                <span className="check-dot" /> Public Dashboard Analytics
              </li>
              <li className="permission-item">
                <span className="check-dot" /> System Status Monitor
              </li>
            </ul>
          </div>

          {(isAdmin || isEditor || isViewer) && (
            <button onClick={() => navigate('/viewer')} className="action-btn-neon">
              Go to Viewer Panel →
            </button>
          )}
        </div>
      </div>

      {/* Portrait Grid Section (Like Popular Albums in the Image!) */}
      <div className="section-header">
        <h2 className="section-title-text">Role Modules & Access Grid</h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Click to test route protection
        </span>
      </div>

      <div className="portrait-grid">
        <div className="portrait-card">
          <div className="portrait-img-wrapper">
            <img src="/admin_hero.jpg" alt="Admin Cyber Shield" />
          </div>
          <h3 className="portrait-title">Admin Shield</h3>
          <p className="portrait-sub">Requires 'Admin' Role Claim</p>
          <button
            onClick={() => navigate('/admin')}
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.8rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {isAdmin ? 'Access Admin' : 'Test Lock (403)'}
          </button>
        </div>

        <div className="portrait-card">
          <div className="portrait-img-wrapper">
            <img src="/editor_hero.jpg" alt="Editor Studio" />
          </div>
          <h3 className="portrait-title">Editor Studio</h3>
          <p className="portrait-sub">Requires 'Admin' or 'Editor'</p>
          <button
            onClick={() => navigate('/editor')}
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.8rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {isAdmin || isEditor ? 'Access Editor' : 'Test Lock (403)'}
          </button>
        </div>

        <div className="portrait-card">
          <div className="portrait-img-wrapper">
            <img src="/viewer_hero.jpg" alt="Viewer Analytics" />
          </div>
          <h3 className="portrait-title">Data Stream Viewer</h3>
          <p className="portrait-sub">Requires Any Auth Role</p>
          <button
            onClick={() => navigate('/viewer')}
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.8rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Access Viewer
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
