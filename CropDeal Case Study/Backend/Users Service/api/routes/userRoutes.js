var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController');

//register user by adding  to db
router.post('/register',userController.registerUser);

//view user profile

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
 * /
/**
 * @swagger
 * paths:
 *  /user/{id}:
 *      get:
 *          summary: Use to get user profile by user id
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: email id of the user to get profile
 *          responses:
 *              '200':
 *                  description: ok
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/user/:id',userController.viewProfile);

//update user
router.put('/user/:id',userController.updateProfile);

//delete user
router.post('/user/:id',userController.deleteUser);

//get Farmers List

/**
 * @swagger
 * paths:
 *  /farmers:
 *      get:
 *          summary: Use to get list of farmers in the applications
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */


router.get('/farmers',userController.getFarmersList);

//get Dealers List

/**
 * @swagger
 * paths:
 *  /dealers:
 *      get:
 *          summary: Use to get list of dealers in the applications
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/dealers',userController.getDealersList);

//rate Farmer by dealer or dealer by farmer

/**
 * @swagger
 * paths:
 *  /rating:
 *      post:
 *          summary: Use to give rating to dealers by farmers and by dealers to farmers 
 *          security:
 *              - bearerAuth: []
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: body
 *              name: user
 *              description: Rating details
 *              schema:
 *                  type: object
 *                  properties:
 *                      farmerEmail:
 *                          type: string
 *                      dealerEmail:
 *                          type: string
 *                      rating:
 *                          type: number
 *                  example:
 *                      farmerEmail: tom@gmail.com
 *                      dealerEmail: sam@gmail.com
 *                      rating: 4
 *          responses:
 *              '200':
 *                  description: success in posting rating data
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.post('/rating',userController.rateUser);

//send all ratings given by dealer to admin

/**
 * @swagger
 * paths:
 *  /farmerRating:
 *      get:
 *          summary: Use to get ratings given by dealer to farmer
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/farmerRating',userController.viewFarmerRatings);

//send all ratings given by farmer to admin

router.post('/rating',userController.rateUser);

//send all ratings given by dealer to admin

/**
 * @swagger
 * paths:
 *  /dealerRating:
 *      get:
 *          summary: Use to get ratings given by farmer to dealer
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/dealerRating',userController.viewDealerRatings);

//send farmer name and contact while publishing crops to crops management service

/**
 * @swagger
 * paths:
 *  /farmerNameAndContact:
 *      get:
 *          summary: Use to get farmer name and contact during publishing of crop
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.get('/farmerNameAndContact',userController.sendFarmerContactAndName);

//send dealer name and contact while publishing crops to crops management service

/**
 * @swagger
 * paths:
 *  /dealerNameAndContact:
 *      get:
 *          summary: Use to get dealer name and contact while purchasing of crop
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/dealerNameAndContact',userController.sendDealerContactAndName);

//add subscribed crops to subscribed crops array

/**
 * @swagger
 * paths:
 *  /dealer/subscribeCrops/{dealerId}:
 *      put:
 *          summary: Use to subscribe to particular crop
 *          security:
 *              - bearerAuth: []
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: path
 *              name: dealerId
 *              schema:
 *                  type: string
 *              required: true
 *              description: email id of the dealer to subscribe crop
 *            - in: body
 *              name: user
 *              description: Subcribe crop details
 *              schema:
 *                  type: object
 *                  properties:
 *                      cropType:
 *                          type: string
 *                      cropName:
 *                          type: string
 *                  example:
 *                      cropType: fruit
 *                      cropName: mango
 *          responses:
 *              '200':
 *                  description: success in posting subscription data
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.put('/dealer/subscribeCrops/:dealerId',userController.addSubscribedCrops);

//delete subscribed crop from subscribed crops array on request of dealer
router.delete('/dealer/subscribedCrops/:subscribedCropId',userController.deleteSubscribedCrop);

//send subscribed crops list on request of dealer

/**
 * @swagger
 * paths:
 *  /dealer/subscribedCrops/{dealerId}:
 *      get:
 *          summary: Use to get subscribed crops list of a particular dealer
 *          security:
 *              - bearerAuth: []
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: path
 *              name: dealerId
 *              schema:
 *                  type: string
 *              required: true
 *              description: email id of the dealer to get subscribe crop list
 *          responses:
 *              '200':
 *                  description: success in getting subscribed crops list
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/dealer/subscribedCrops/:dealerId',userController.sendSubscribedCropsList);

module.exports = router;