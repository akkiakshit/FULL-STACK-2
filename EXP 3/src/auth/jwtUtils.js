// Utility functions for mock JWT creation, decoding, and validation

function base64UrlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
}

/**
 * Builds a base64url-encoded header.payload.signature JWT-like token.
 * Payload includes sub, role, name, iat, and exp (1 hour expiry in seconds).
 */
export function generateMockToken(user) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // 1 hour expiry in seconds

  const payload = {
    sub: user.username,
    role: user.role,
    name: user.name,
    iat: iat,
    exp: exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // Simple pseudo signature
  let hash = 0;
  const signatureInput = `${encodedHeader}.${encodedPayload}.secret_key_123`;
  for (let i = 0; i < signatureInput.length; i++) {
    const char = signatureInput.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const fakeSig = base64UrlEncode(Math.abs(hash).toString(36) + '_mock_sig');

  return `${encodedHeader}.${encodedPayload}.${fakeSig}`;
}

/**
 * Decodes the payload section of a JWT token.
 */
export function decodeToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payloadJson = base64UrlDecode(parts[1]);
    return JSON.parse(payloadJson);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

/**
 * Checks if the decoded token exp claim is past the current time.
 */
export function isTokenExpired(decoded) {
  if (!decoded || !decoded.exp) return true;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTimeInSeconds;
}
