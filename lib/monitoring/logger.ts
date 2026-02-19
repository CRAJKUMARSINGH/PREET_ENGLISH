import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Custom log format
const customFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  
  return msg;
});

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');

// Console format (colorized for development)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  customFormat
);

// File format (JSON for production)
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: fileFormat,
  defaultMeta: {
    service: 'preet-english',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [
    // Console transport (always enabled)
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

// Add file transports only in production or if explicitly enabled
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_FILE_LOGGING === 'true') {
  // Error log
  logger.add(
    new DailyRotateFile({
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat,
    })
  );

  // Combined log
  logger.add(
    new DailyRotateFile({
      filename: path.join(logsDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat,
    })
  );

  // Info log
  logger.add(
    new DailyRotateFile({
      filename: path.join(logsDir, 'info-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '20m',
      maxFiles: '7d',
      format: fileFormat,
    })
  );
}

// Helper functions for structured logging
export const log = {
  error: (message: string, meta?: any) => logger.error(message, meta),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
  info: (message: string, meta?: any) => logger.info(message, meta),
  http: (message: string, meta?: any) => logger.http(message, meta),
  debug: (message: string, meta?: any) => logger.debug(message, meta),
};

// Request logging middleware
export function requestLogger(req: any, res: any, next: any) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http('HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });
  
  next();
}

// Database query logger
export function logDatabaseQuery(query: string, duration: number, params?: any) {
  logger.debug('Database Query', {
    query,
    duration: `${duration}ms`,
    params,
  });
}

// AI interaction logger
export function logAIInteraction(
  provider: string,
  model: string,
  tokensUsed: number,
  duration: number,
  success: boolean
) {
  logger.info('AI Interaction', {
    provider,
    model,
    tokens_used: tokensUsed,
    duration: `${duration}ms`,
    success,
  });
}

// Performance logger
export function logPerformance(operation: string, duration: number, metadata?: any) {
  const level = duration > 1000 ? 'warn' : 'info';
  logger[level]('Performance Metric', {
    operation,
    duration: `${duration}ms`,
    ...metadata,
  });
}

// Security event logger
export function logSecurityEvent(event: string, severity: 'low' | 'medium' | 'high' | 'critical', details: any) {
  logger.warn('Security Event', {
    event,
    severity,
    ...details,
  });
}

export default logger;
