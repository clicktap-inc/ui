/**
 * Environment utilities.
 * These constants are evaluated at build time and tree-shaken in production.
 */

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
