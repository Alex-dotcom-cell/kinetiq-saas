import { USER_ROLES, STATUS_CODES, MESSAGES } from '../config/constants.js';

export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.UNAUTHORIZED,
      });
    }

    if (req.user.role !== USER_ROLES.ADMIN) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: MESSAGES.FORBIDDEN,
      });
    }

    next();
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: MESSAGES.SERVER_ERROR,
    });
  }
};

export default adminMiddleware;
