var express = require('express')
var router = express.Router()
var authService = require('../controllers/authController');

//register user by adding credentials to db
router.post('/register',authService.registerUser);

//check user is present in databse and send token
/**
 * @swagger
 * paths:
 *  /login:
 *      post:
 *          summary: Use to login in system and get authorization token
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: body
 *              name: user
 *              description: User details for login
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                  example:
 *                      email: tom@gmail.com
 *                      password: "1234"
 *          responses:
 *              '200':
 *                  description: ok
 */
router.post('/login',authService.loginUser);

//delete user based on id on request of admin
router.delete('/user/:id',authService.authenticateToken,authService.deleteUser);


//authorize user

/**
 * 
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * security:
 *  - bearerAuth: []
 * @swagger
 * paths:
 *  /authorize:
 *      get:
 *          summary: Use to authorize the users
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: ok
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.get('/authorize',authService.authenticateToken,authService.authorizeUser);

//get users email id for validation
/**
 * @swagger
 * /usersEmail:
 *  get:
 *    description: Use to request all users emails in database
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/usersEmail',authService.getUsersEmail);


module.exports = router;