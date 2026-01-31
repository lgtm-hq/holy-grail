/**
 * Logger utility for Holy Grail documentation
 *
 * Provides structured logging with tags and data
 * Debug/info logs only show in development mode
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  tag: string;
  message: string;
  data?: unknown;
  timestamp: string;
}

const isDev = import.meta.env.DEV;

function formatLog(entry: LogEntry): string {
  return `[${entry.timestamp}] [${entry.tag}] ${entry.message}`;
}

export const logger = {
  debug: (tag: string, message: string, data?: unknown) => {
    if (isDev) {
      console.debug(formatLog({ level: 'debug', tag, message, data, timestamp: new Date().toISOString() }), data ?? '');
    }
  },

  info: (tag: string, message: string, data?: unknown) => {
    if (isDev) {
      console.log(formatLog({ level: 'info', tag, message, data, timestamp: new Date().toISOString() }), data ?? '');
    }
  },

  warn: (tag: string, message: string, data?: unknown) => {
    console.warn(formatLog({ level: 'warn', tag, message, data, timestamp: new Date().toISOString() }), data ?? '');
  },

  error: (tag: string, message: string, error?: unknown) => {
    console.error(formatLog({ level: 'error', tag, message, timestamp: new Date().toISOString() }), error);
    // Future: Send to error tracking service (Sentry, etc.)
  },
};
