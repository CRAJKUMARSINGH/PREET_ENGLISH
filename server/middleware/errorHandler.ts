import { Request, Response, NextFunction } from 'express';
import logger from '../logger.js';

export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;

  constructor(message: string, statusCode: number, isOperational = true, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number, code?: string): AppError => {
  return new AppError(message, statusCode, true, code);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const globalErrorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err } as AppError;
  error.message = err.message;

  // Log error
  logger.error('Global Error Handler:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Database connection errors
  if (err.message.includes('SQLITE_BUSY') || err.message.includes('database is locked')) {
    error = createError('Database temporarily unavailable. Please try again.', 503, 'DB_BUSY');
  }

  // Validation errors
  if (err.message.includes('validation')) {
    error = createError('Invalid input data', 400, 'VALIDATION_ERROR');
  }

  // Rate limiting errors
  if (err.message.includes('Too many requests')) {
    error = createError('Rate limit exceeded. Please slow down.', 429, 'RATE_LIMIT');
  }

  // AI service errors
  if (err.message.includes('OpenAI') || err.message.includes('AI service')) {
    error = createError('AI service temporarily unavailable', 503, 'AI_SERVICE_ERROR');
  }

  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: error.code,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  const message = `Route ${req.originalUrl} not found`;
  logger.warn('Route not found:', { url: req.originalUrl, method: req.method });
  res.status(404).json({
    success: false,
    error: {
      message,
      code: 'ROUTE_NOT_FOUND'
    }
  });
};