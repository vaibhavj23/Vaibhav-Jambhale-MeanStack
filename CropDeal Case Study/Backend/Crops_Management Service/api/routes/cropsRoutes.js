var express = require('express')
var router = express.Router()
var cropsController = require('../controllers/cropsController');

//publish crop by adding  to db
router.post('/publishCrop',cropsController.publishCrop);

//update published crop 
router.put('/publishCrop/:id',cropsController.updatePublishedCrop);

//delete published crop 

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
 *  /publishedCrop/{id}:
 *      delete:
 *          summary: Use to delete published crop of a farmer
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
 *              description: published crop id which is to be deleted
 *          responses:
 *              '200':
 *                  description: successful deletion of crop
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.delete('/publishedCrop/:id',cropsController.deletePublishedCrop);

//Send (all)crops published by farmers to dealers which are still published and not soldout

/**
 * @swagger
 * paths:
 *  /publishedCrop/:
 *      get:
 *          summary: Use to get all published crops which are not sold out
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: success in getting data
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/publishedCrop/',cropsController.sendPublishedCrops);

//Send (all)crops published by all farmers to admin


/**
 * @swagger
 * paths:
 *  /allPublishedCrop/:
 *      get:
 *          summary: Use to get all published crops by all farmers
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *          responses:
 *              '200':
 *                  description: successin getting data
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.get('/allPublishedCrop/',cropsController.sendAllPublishedCrops);


//send published crop to farmer filter by published ID which is not sold out.

/**
 * @swagger
 * paths:
 *  /publishedCrop/inStock/{id}:
 *      get:
 *          summary: Use to get a published crop of a farmer by a particular published id
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
 *              description: published crop id
 *          responses:
 *              '200':
 *                  description: success in getting of crop data
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/publishedCrop/inStock/:id',cropsController.getPublishedCropById);

//send all published crops to farmer filter by farmer email id which are not sold out.

/**
 * @swagger
 * paths:
 *  /publishedCrops/inStock/{farmerId}:
 *      get:
 *          summary: Use to get all published crops of a particular farmer
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: path
 *              name: farmerId
 *              schema:
 *                  type: string
 *              required: true
 *              description: email id of the farmer to get published crops
 *          responses:
 *              '200':
 *                  description: ok
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/publishedCrops/inStock/:farmerId',cropsController.getAllPublishedCropByFarmerId);

//send published crops which are subscribed by particular dealer

/**
 * @swagger
 * paths:
 *  /publishedCrops/subscribed/{dealerId}:
 *      get:
 *          summary: Use to get only those published crops which are subscribed by a dealer
 *          security:
 *              - bearerAuth: []
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
 *              description: email id of the dealer to those published crops which are subscribed
 *          responses:
 *              '200':
 *                  description: ok
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.get('/publishedCrops/subscribed/:dealerId',cropsController.getPublishedCropsSubscribedByDealerId);

//add purchase details of a published crop in purchasedCrop collection

/**
 * @swagger
 * paths:
 *  /purchaseCrop/{publishedCropId}:
 *      post:
 *          summary: Use to purchase a particular crop
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
 *              name: publishedCropId
 *              schema:
 *                  type: string
 *              required: true
 *              description: published crop id which is to be purchased
 *            - in: body
 *              name: crop details
 *              description: purchase crop details
 *              schema:
 *                  type: object
 *                  properties:
 *                      quantityPurchased:
 *                          type: string
 *                      pricePerKg:
 *                          type: number
 *                      totalPrice:
 *                          type: number
 *                      purchaseMethod:
 *                          type: string
 *                  example:
 *                      quantityPurchased: 50
 *                      pricePerKg: 20
 *                      totalPrice: 1000
 *                      purchaseMethod: Razorpay
 *          responses:
 *              '200':
 *                  description: success in purchasing crop
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.post('/purchaseCrop/:publishedCropId',cropsController.purchaseCrop)

//send purchased crops list of a particular dealer

/**
 * @swagger
 * paths:
 *  /purchasedCrops/{dealerId}:
 *      get:
 *          summary: Use to get purchased crops of a dealer
 *          security:
 *              - bearerAuth: []
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
 *              description: email id of the dealer whose purchased crops list is required
 *          responses:
 *              '200':
 *                  description: ok
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */

router.get('/purchasedCrops/:dealerId',cropsController.getPurchasedCropsList);

//send purchased crops of all dealers to admin

/**
 * @swagger
 * paths:
 *  /purchasedCrops:
 *      get:
 *          summary: Use to get all purchased crops by all the dealers
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

router.get('/purchasedCrops',cropsController.getAllPurchasedCropsList);

//send sold crops list of a particular farmer


/**
 * @swagger
 * paths:
 *  /soldCrops/{farmerId}:
 *      get:
 *          summary: Use to get sold crops of a farmer 
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: path
 *              name: farmerId
 *              schema:
 *                  type: string
 *              required: true
 *              description: email id of the farmer whose solds crops list is required
 *          responses:
 *              '200':
 *                  description: ok
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.get('/soldCrops/:farmerId',cropsController.getSoldCropsList);

//send receipt of sold/purchased crops by farmer/dealer


/**
 * @swagger
 * paths:
 *  /receipt/{transactionId}:
 *      get:
 *          summary: Use to get receipt of a sold/purchased crop
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: header
 *              name: Authorization
 *              description: an authorization header
 *              type: string
 *            - in: path
 *              name: transactionId
 *              schema:
 *                  type: string
 *              required: true
 *              description: transaction id is required
 *          responses:
 *              '200':
 *                  description: success in getting receipt
 *              '401':
 *                  description: token not present
 *              '403':
 *                  description: token is invalid
 */
router.get('/receipt/:transactionId',cropsController.getReceipt);

module.exports = router;