import { Router } from 'express';
import authController from './auth.controller';
import validationSchema from './auth.validator';
import { validator } from '../../helpers/joiValidator';

// initialize the router
const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Endpoint for user registrations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Name of the user.
 *               last_name:
 *                 type: string
 *                 description: Name of the user.
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Account created successfully.
 *                 data:
 *                   type: null
 *                   description: No data.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Bad Request
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not Found
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 */
router.post(
  '/register',
  validator.body(validationSchema.register),
  authController.register,
);

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Endpoint for user password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Password reset link sent successfully.
 *                 data:
 *                   type: null
 *                   description: No data.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Bad Request
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not Found
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 */
router.post(
  '/forgot-password',
  validator.body(validationSchema.reset),
  authController.forgot_password,
);

/**
 * @openapi
 * /auth/reset-password:
 *   patch:
 *     tags:
 *       - Authentication
 *     description: Endpoint for user to reset the password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: token of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Password reset successfully.
 *                 data:
 *                   type: null
 *                   description: No data.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Bad Request
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not Found
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 */
router.patch(
  '/reset-password',
  validator.body(validationSchema.resetpwd),
  authController.reset_password,
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Endpoint for user to login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login Success.
 *                 data:
 *                   type: object
 *                   description: User details and token.
 *                   properties:
 *                     user:
 *                      type: object
 *                      description: User details.
 *                      example:
 *                        id: 12345
 *                        username: johndoe
 *                        email: johndoe@example.com
 *                        full_name: John Doe
 *                        age: 30
 *                     tokens:
 *                      type: object
 *                      description: tokens.
 *                      properties:
 *                        access:
 *                          type: object
 *                          description: Access token.
 *                          properties:
 *                            token:
 *                              type: string
 *                              description: Access token.
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                            expiry:
 *                              type: number
 *                              description: Expiry of the access token.
 *                              example: 1600000000
 *                        refresh:
 *                          type: object
 *                          description: Refresh token.

 *                          properties:
 *                            token:
 *                              type: string
 *                              description: Access token.
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                            expiry:
 *                              type: number
 *                              description: Expiry of the access token.
 *                              example: 1600000000
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Bad Request
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not Found
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 */
router.post(
  '/login',
  validator.body(validationSchema.login),
  authController.login_user,
);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Endpoint for logout the users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access:
 *                 type: string
 *                 description: Access token of the user.
 *               refresh:
 *                 type: string
 *                 description: Access token of the user.
 *             required:
 *               - access
 *               - refresh
 *     responses:
 *       '204':
 *         description: No Content
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Bad Request
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 */
router.post(
  '/logout',
  validator.body(validationSchema.logout),
  authController.logoutUser,
);

/**
 * @openapi
 * /auth/refresh-tokens:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Endpoint for refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh:
 *                 type: string
 *                 description: Access token of the user.
 *             required:
 *               - refresh
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   type: object
 *                   description: Access and Refresh Tokens
 *                   example:
 *                     access: token
 *                     refresh: token
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Bad Request
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 403
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Forbidden
 *                 stackTrace:
 *                   type: string
 *                   description: Stack trace of the error.
 *                   example: Error occurred at line 123 in file xyz.js
 */
router.post(
  '/refresh-tokens',
  validator.body(validationSchema.refresh),
  authController.refreshTokens,
);

export default router;
