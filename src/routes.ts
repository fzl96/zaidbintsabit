/**
 * List of public routes
 * These routes are accessible by everyone
 * @type {string[]}
 */
export const publicRoutes = ["/", "/profil", "/keuangan", "/tahsin", "/post"];

/**
 * List of admin and pengurus routes
 * These routes will redirect non-admin users to the home page
 * @type {string[]}
 */
export const adminRoutes = ["/dashboard"];

/**
 * List of auth routes
 * These routes will redirect logged in users to the home page
 * @type {string[]}
 */
export const authRoutes = ["/auth/masuk"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
