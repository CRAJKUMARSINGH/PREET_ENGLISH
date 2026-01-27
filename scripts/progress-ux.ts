import * as fs from 'fs';
import * as path from 'path';
import { createWriteStream, WriteStream } from 'fs';

export interface ProgressOptions {
  total: number;
  title?: string;
  showPercentage?: boolean;
  showBar?: boolean;
  barLength?: number;
  outputStream?: NodeJS.WritableStream;
  logFile?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export interface ProgressUpdate {
  current: number;
  total: number;
  percentage: number;
  message?: string;
  status?: 'pending' | 'processing' | 'success' | 'error' | 'warning';
}

export class ProgressUX {
  private total: number;
  private current: number;
  private title: string;
  private showPercentage: boolean;
  private showBar: boolean;
  private barLength: number;
  private outputStream: NodeJS.WritableStream;
  private logFile?: string;
  private logLevel: 'debug' | 'info' | 'warn' | 'error';
  private startTime: Date;
  private logStream?: WriteStream;

  constructor(options: ProgressOptions) {
    this.total = options.total;
    this.current = 0;
    this.title = options.title || 'Progress';
    this.showPercentage = options.showPercentage ?? true;
    this.showBar = options.showBar ?? true;
    this.barLength = options.barLength ?? 40;
    this.outputStream = options.outputStream || process.stdout;
    this.logFile = options.logFile;
    this.logLevel = options.logLevel || 'info';
    this.startTime = new Date();

    if (this.logFile) {
      this.logStream = createWriteStream(this.logFile, { flags: 'a' });
    }
  }

  /**
   * Update progress
   */
  update(update: ProgressUpdate): void {
    this.current = update.current;

    // Clear the current line
    if (this.outputStream === process.stdout || this.outputStream === process.stderr) {
      this.outputStream.write('\r\u001b[K'); // Clear line
    }

    // Build progress string
    let progressStr = `${this.title}: `;

    if (this.showBar) {
      const filledLength = Math.floor((this.current / this.total) * this.barLength);
      const emptyLength = this.barLength - filledLength;
      const filledBar = '█'.repeat(filledLength);
      const emptyBar = '░'.repeat(emptyLength);
      progressStr += `[${filledBar}${emptyBar}] `;
    }

    if (this.showPercentage) {
      const percentage = Math.round((this.current / this.total) * 100);
      progressStr += `${percentage}% `;
    }

    progressStr += `(${this.current}/${this.total})`;

    if (update.message) {
      progressStr += ` - ${update.message}`;
    }

    // Add status indicator
    if (update.status) {
      const statusIcons = {
        pending: '⏳',
        processing: '🔄',
        success: '✅',
        error: '❌',
        warning: '⚠️'
      };
      progressStr += ` ${statusIcons[update.status]}`;
    }

    // Write to output stream
    this.outputStream.write(progressStr);

    // Log to file if specified
    if (this.logStream && update.status !== 'pending') {
      const timestamp = new Date().toISOString();
      const logLevel = update.status?.toUpperCase() || 'INFO';
      const logMessage = `${timestamp} [${logLevel}] ${progressStr}\n`;
      this.logStream.write(logMessage);
    }
  }

  /**
   * Complete progress display
   */
  complete(message?: string): void {
    const elapsed = new Date().getTime() - this.startTime.getTime();
    const elapsedSeconds = Math.round(elapsed / 1000);

    // Clear the progress line
    if (this.outputStream === process.stdout || this.outputStream === process.stderr) {
      this.outputStream.write('\r\u001b[K');
    }

    let completeStr = `${this.title}: Complete! `;
    if (message) {
      completeStr += `${message} `;
    }
    completeStr += `(Took ${elapsedSeconds}s)`;

    this.outputStream.write(completeStr + '\n');

    // Log completion
    if (this.logStream) {
      const timestamp = new Date().toISOString();
      this.logStream.write(`${timestamp} [SUCCESS] ${completeStr}\n`);
      this.logStream.end();
    }
  }

  /**
   * Fail progress display
   */
  fail(message?: string): void {
    // Clear the progress line
    if (this.outputStream === process.stdout || this.outputStream === process.stderr) {
      this.outputStream.write('\r\u001b[K');
    }

    let failStr = `${this.title}: Failed! `;
    if (message) {
      failStr += `${message}`;
    }

    this.outputStream.write(failStr + '\n');

    // Log failure
    if (this.logStream) {
      const timestamp = new Date().toISOString();
      this.logStream.write(`${timestamp} [ERROR] ${failStr}\n`);
      this.logStream.end();
    }
  }

  /**
   * Get progress percentage
   */
  getPercentage(): number {
    return Math.round((this.current / this.total) * 100);
  }

  /**
   * Get elapsed time in seconds
   */
  getElapsedSeconds(): number {
    return Math.round((new Date().getTime() - this.startTime.getTime()) / 1000);
  }

  /**
   * Get estimated time remaining in seconds
   */
  getEstimatedTimeRemaining(): number {
    if (this.current === 0) return 0;

    const elapsed = new Date().getTime() - this.startTime.getTime();
    const rate = this.current / elapsed; // items per millisecond
    const remaining = this.total - this.current;
    const estimated = remaining / rate; // milliseconds

    return Math.round(estimated / 1000);
  }
}

export interface LoggerOptions {
  logFile?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  maxFileSize?: number; // in bytes
  maxFiles?: number;
}

export class Logger {
  private logFile?: string;
  private logLevel: 'debug' | 'info' | 'warn' | 'error';
  private maxFileSize?: number;
  private maxFiles: number;
  private logStream?: WriteStream;

  constructor(options?: LoggerOptions) {
    this.logFile = options?.logFile;
    this.logLevel = options?.logLevel || 'info';
    this.maxFileSize = options?.maxFileSize;
    this.maxFiles = options?.maxFiles || 5;

    if (this.logFile) {
      this.logStream = createWriteStream(this.logFile, { flags: 'a' });
    }
  }

  /**
   * Log a debug message
   */
  debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      this.writeLog('DEBUG', message, meta);
    }
  }

  /**
   * Log an info message
   */
  info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      this.writeLog('INFO', message, meta);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      this.writeLog('WARN', message, meta);
    }
  }

  /**
   * Log an error message
   */
  error(message: string, meta?: any): void {
    if (this.shouldLog('error')) {
      this.writeLog('ERROR', message, meta);
    }
  }

  /**
   * Check if a log level should be written
   */
  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.logLevel];
  }

  /**
   * Write a log message
   */
  private writeLog(level: string, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    let logMessage = `${timestamp} [${level}] ${message}`;
    
    if (meta) {
      logMessage += ` - ${JSON.stringify(meta)}`;
    }
    
    logMessage += '\n';

    // Write to console
    const output = level === 'error' ? process.stderr : process.stdout;
    output.write(logMessage);

    // Write to file if specified
    if (this.logStream) {
      this.logStream.write(logMessage);
    }
  }

  /**
   * Close the logger
   */
  close(): void {
    if (this.logStream) {
      this.logStream.end();
    }
  }
}

export interface ConsoleUXOptions {
  verbose?: boolean;
  color?: boolean;
  timestamp?: boolean;
}

export class ConsoleUX {
  private logger: Logger;
  private verbose: boolean;
  private useColor: boolean;
  private showTimestamp: boolean;

  constructor(options?: ConsoleUXOptions) {
    this.verbose = options?.verbose ?? true;
    this.useColor = options?.color ?? true;
    this.showTimestamp = options?.timestamp ?? true;
    this.logger = new Logger();
  }

  /**
   * Log a success message
   */
  success(message: string, meta?: any): void {
    const formatted = this.formatMessage('SUCCESS', message, '\x1b[32m%s\x1b[0m'); // Green
    console.log(formatted);
    this.logger.info(message, meta);
  }

  /**
   * Log an info message
   */
  info(message: string, meta?: any): void {
    if (this.verbose) {
      const formatted = this.formatMessage('INFO', message, '\x1b[36m%s\x1b[0m'); // Cyan
      console.info(formatted);
      this.logger.info(message, meta);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string, meta?: any): void {
    const formatted = this.formatMessage('WARN', message, '\x1b[33m%s\x1b[0m'); // Yellow
    console.warn(formatted);
    this.logger.warn(message, meta);
  }

  /**
   * Log an error message
   */
  error(message: string, meta?: any): void {
    const formatted = this.formatMessage('ERROR', message, '\x1b[31m%s\x1b[0m'); // Red
    console.error(formatted);
    this.logger.error(message, meta);
  }

  /**
   * Log a debug message
   */
  debug(message: string, meta?: any): void {
    if (this.verbose) {
      const formatted = this.formatMessage('DEBUG', message, '\x1b[90m%s\x1b[0m'); // Gray
      console.log(formatted);
      this.logger.debug(message, meta);
    }
  }

  /**
   * Format a message with timestamp and colors
   */
  private formatMessage(level: string, message: string, colorCode?: string): string {
    let formatted = '';

    if (this.showTimestamp) {
      formatted += `[${new Date().toISOString()}] `;
    }

    formatted += `${level}: `;

    if (this.useColor && colorCode) {
      formatted = colorCode.replace('%s', formatted);
    }

    formatted += message;

    return formatted;
  }

  /**
   * Create a progress bar
   */
  createProgress(options: ProgressOptions): ProgressUX {
    return new ProgressUX(options);
  }

  /**
   * Display a table
   */
  table(data: any[]): void {
    console.table(data);
  }

  /**
   * Display a spinner (simple implementation)
   */
  async withSpinner<T>(message: string, operation: () => Promise<T>): Promise<T> {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    let completed = false;

    const spinner = setInterval(() => {
      if (completed) return;
      process.stdout.write(`\r${frames[i]} ${message}`);
      i = (i + 1) % frames.length;
    }, 100);

    try {
      const result = await operation();
      completed = true;
      clearInterval(spinner);
      process.stdout.write(`\r✅ ${message}\n`);
      return result;
    } catch (error) {
      completed = true;
      clearInterval(spinner);
      process.stdout.write(`\r❌ ${message}\n`);
      throw error;
    }
  }
}

// Example usage
export function createProgressUX(options: ProgressOptions): ProgressUX {
  return new ProgressUX(options);
}

export function createLogger(options?: LoggerOptions): Logger {
  return new Logger(options);
}

export function createConsoleUX(options?: ConsoleUXOptions): ConsoleUX {
  return new ConsoleUX(options);
}

// Example of how to use the progress UX
if (require.main === module) {
  (async () => {
    console.log('Example of Progress UX and Logging:');
    
    // Example 1: Basic progress bar
    console.log('\n1. Basic Progress Bar:');
    const progressBar = new ProgressUX({
      total: 100,
      title: 'Processing Items',
      showPercentage: true,
      showBar: true,
      barLength: 30
    });

    for (let i = 0; i <= 100; i += 10) {
      progressBar.update({
        current: i,
        total: 100,
        percentage: i,
        message: `Processing item ${i}`,
        status: 'processing'
      });
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate work
    }
    progressBar.complete('All items processed!');
    
    // Example 2: Console UX with different message types
    console.log('\n2. Console UX:');
    const consoleUX = new ConsoleUX({ verbose: true });
    
    consoleUX.info('This is an info message');
    consoleUX.success('This is a success message');
    consoleUX.warn('This is a warning message');
    consoleUX.error('This is an error message');
    consoleUX.debug('This is a debug message (only shown in verbose mode)');
    
    // Example 3: Logger with file output
    console.log('\n3. Logger with file output:');
    const logger = new Logger({ 
      logFile: path.join(process.cwd(), 'progress-ux.log'),
      logLevel: 'debug'
    });
    
    logger.info('Starting process...');
    logger.warn('This is a warning');
    logger.error('This is an error with metadata', { userId: 123, action: 'login' });
    logger.debug('Debug information', { params: { a: 1, b: 2 } });
    
    // Example 4: Progress with spinner
    console.log('\n4. Spinner Example:');
    await consoleUX.withSpinner('Loading data...', async () => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      return 'Data loaded';
    });
    
    console.log('\nAll examples completed!');
  })();
}