// JWT Configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// API Response Messages
export const MESSAGES = {
  // Auth
  USER_CREATED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',

  // Content
  CONTENT_FETCHED: 'Content fetched successfully',
  CONTENT_UPDATED: 'Content updated successfully',
  CONTENT_CREATED: 'Content created successfully',
  CONTENT_DELETED: 'Content deleted successfully',
  CONTENT_NOT_FOUND: 'Content not found',

  // Errors
  INVALID_INPUT: 'Invalid input data',
  SERVER_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad request',
};

// HTTP Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};
