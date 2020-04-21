// K.B this is disabled because of next function in error action
/* eslint @typescript-eslint/no-unused-vars: 0 */
import logger from '../utils/logger';
import IdentityError from '../errors/identityError';
import AuthForbidden from '../errors/authForbidden';
import AuthExpiredError from '../errors/authExpiredError';
import ModelError from '../errors/modelError';

export const handleServerNotFound = (req, res): void => {
  res.status(404).json({ message: 'NOT_FOUND', code: 1404 });
};

export const handleServerError = (ex, req, res, next): any => {
  if (ex) {
    logger.error(ex,
      {
        name: process.env.npm_package_name,
        correlationId: req.correlationId(),
      });
  }

  if (ex instanceof IdentityError) return res.status(401).json({ message: 'TOKEN_INVALID', code: 1401 });

  if (ex instanceof AuthExpiredError) return res.status(401).json({ message: 'TOKEN_EXPIRED', code: 1402 });

  if (ex instanceof AuthForbidden) return res.status(403).json({ message: 'ACCESS_FORBIDDEN', code: 1403 });

  if (ex instanceof ModelError) return res.status(400).json({ message: 'MODE_VALIDATION', code: 1400, errors: ex.errors });

  if (ex instanceof ReferenceError) {
    return res.status(400).json({
      message: ex.message,
      code: 1402,
    });
  }

  return res.status(500).json({ message: 'SERVER_ERROR', code: 1500 });
};
