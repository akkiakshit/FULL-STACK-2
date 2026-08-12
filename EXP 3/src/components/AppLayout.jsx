import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { decodeToken } from '../auth/jwtUtils';

const AppLayout = ({ children, title = "Dashboard" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(3600);

  const rawToken = localStorage.getItem('token');
  const decoded = rawToken ? decodeToken(rawToken) : null;

  useEffect(() => {
    if (!decoded || !decoded.exp) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, decoded.exp - Math.floor(Date.now() / 1000));
      setSecondsLeft(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [decoded]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyToken = () => {
    if (rawToken) {
      navigator.clipboard.writeText(rawToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'Admin';
  const isEditor = user?.role === 'Editor';

  const getRoleBadgeClass = (role) => {
    if (role === 'Admin') return 'badge-admin';
    if (role === 'Editor') return 'badge-editor';
    return 'badge-viewer';
  };

  return (
    <div className="app-shell">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">⚡</div>
          <span className="brand-title">JWT RBAC Studio</span>
        </div>

        <div className="nav-section-label">Navigation</div>
        <ul className="nav-menu">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-item-btn ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `nav-item-btn ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">🛡️</span>
                <span>Admin Panel</span>
              </NavLink>
            </li>
          )}

          {(isAdmin || isEditor) && (
            <li>
              <NavLink
                to="/editor"
                className={({ isActive }) =>
                  `nav-item-btn ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">✏️</span>
                <span>Editor Panel</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/viewer"
              className={({ isActive }) =>
                `nav-item-btn ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">👁️</span>
              <span>Viewer Panel</span>
            </NavLink>
          </li>
        </ul>

        <div className="nav-section-label">RBAC Guard</div>
        <div style={{ padding: '0 8px', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>
          Routes validate JWT role claims dynamically on navigation.
        </div>

        {/* Sidebar User Profile Widget */}
        <div className="sidebar-user-widget">
          <div className="user-avatar-sm">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="user-info-sm">
            <div className="user-name-sm">{user?.name}</div>
            <span className={`role-tag-sm ${getRoleBadgeClass(user?.role)}`}>
              {user?.role}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="main-viewport">
        {/* Top Header */}
        <header className="top-header">
          <div className="window-dots">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
          </div>

          <div className="header-title-container">
            <h1 className="page-title">{title}</h1>
            <div className="header-status-badge">
              <span className="status-pulse" />
              <span>Session Authenticated</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Logged in as: <strong>{user?.username}</strong>
            </span>
          </div>
        </header>

        {/* Main Page Content Area */}
        <div className="content-body">{children}</div>

        {/* Bottom Persistent Token Inspector Bar (Styled like Music Player Bar!) */}
        <div className="player-token-bar">
          <div className="player-left-info">
            <div className="player-avatar">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="player-track-details">
              <span className="player-username">{user?.name}</span>
              <span className="player-role-indicator">
                Sub: {decoded?.sub} | Role: {decoded?.role}
              </span>
            </div>
          </div>

          <div className="player-center-controls">
            <div className="token-preview-strip">
              <span className="token-label-badge">JWT Bearer</span>
              <span className="token-mono-text">
                {rawToken || 'No Token'}
              </span>
            </div>

            <div className="playback-bar-wrapper">
              <span className="time-stamp">EXP</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(100, (secondsLeft / 3600) * 100)}%` }}
                />
              </div>
              <span className="time-stamp">{formatTime(secondsLeft)}</span>
            </div>
          </div>

          <div className="player-right-actions">
            <button
              onClick={handleCopyToken}
              className="icon-btn-round"
              title="Copy Raw Token"
            >
              {copied ? '✓' : '📋'}
            </button>

            <button
              onClick={() => setShowTokenModal(true)}
              className="icon-btn-round"
              title="Inspect Decoded Claims"
            >
              🔍
            </button>

            <button onClick={handleLogout} className="logout-pill-btn">
              Logout
            </button>
          </div>
        </div>
      </main>

      {/* Modal for Token Inspection */}
      {showTokenModal && (
        <div className="modal-backdrop" onClick={() => setShowTokenModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">🔐 Mock JWT Payload Inspector</h3>
              <button
                onClick={() => setShowTokenModal(false)}
                className="icon-btn-round"
                style={{ width: '32px', height: '32px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Raw Bearer Token:
              </strong>
              <pre
                style={{
                  background: '#090814',
                  padding: '12px',
                  borderRadius: '10px',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap',
                  marginTop: '6px',
                  maxHeight: '100px',
                  overflowY: 'auto',
                }}
              >
                {rawToken}
              </pre>
            </div>

            <div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Decoded Claims JSON:
              </strong>
              <pre
                style={{
                  background: '#090814',
                  padding: '14px',
                  borderRadius: '10px',
                  color: '#a7f3d0',
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  marginTop: '6px',
                }}
              >
                {JSON.stringify(decoded, null, 2)}
              </pre>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setShowTokenModal(false)}
                className="action-btn-neon"
                style={{ fontSize: '0.8rem', padding: '8px 18px' }}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
