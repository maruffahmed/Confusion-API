const express = require("express");
const authenticate = require("../authenticate");
const dishRouter = express.Router();
// Models
const Dishes = require("../models/dishes.model");
// controllers
const {
  getAllDishes,
  createNewDishe,
  updateDishe,
  deleteAllDishe,
  getDishById,
  createDishById,
  updateDishById,
  deleteDishById,
  getDishCommentsById,
  createDishCommentsById,
  updateDishCommentsById,
  deleteDishCommentsById,
  getDishCommentById,
  createDishCommentById,
  updateDishCommentById,
  deleteDishCommentById,
} = require("../controllers/dish.contoller");

/**
 * @openapi
 * /dishes:
 *   get:
 *     tags:
 *       - Dishes
 *     summary: Get all dishes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/Dish'
 *
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *      tags:
 *        - Dishes
 *      summary: Create a new dish
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: object
 *                    $ref: '#/components/schemas/Dish'
 *        401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Unathorized'
 *        500:
 *         description: Internal Server Error
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  data:
 *                    type: object
 *                    properties:
 *                      error:
 *                        type: string
 *                        example: "Dishe validation failed: price: Path `price` is required., category: Path `category` is required., image: Path `image` is required., description: Path `description` is required., name: Path `name` is required."
 *
 *   delete:
 *     tags:
 *       - Dishes
 *     summary: Delete all dishes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  type: object
 *                  properties:
 *                    n:
 *                      type: number
 *                      example: 1
 *                    ok:
 *                      type: number
 *                      example: 1
 *                    deletedCount:
 *                      type: number
 *                      example: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               $ref: '#/components/schemas/Unathorized'
 *
 */

dishRouter
  .route("/")
  .get(getAllDishes)
  .post(authenticate.verifyUser, authenticate.verifyAdmin, createNewDishe)
  .put(authenticate.verifyUser, authenticate.verifyAdmin, updateDishe)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteAllDishe);

/**
 * @openapi
 * /dishes/{dishId}:
 *   get:
 *     tags:
 *       - Dishes
 *     summary: Get a dish by id
 *     parameters:
 *       - in: path
 *         name: dishId
 *         schema:
 *          type: string
 *          required: true
 *         description: The dish id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/Dish'
 *
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *    tags:
 *      - Dishes
 *    summary: Update a dish
 *    parameters:
 *      - in: path
 *        name: dishId
 *        schema:
 *          type: string
 *          required: true
 *        description: The dish id
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: Dish object that needs to be added to the store
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Dish'
 *    responses:
 *     200:
 *      description: OK
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *              example: OK
 *            data:
 *              $ref: '#/components/schemas/Dish'
 *     401:
 *       description: Unauthorized
 *       content:
 *        text/plain:
 *         schema:
 *           $ref: '#/components/schemas/Unathorized'
 *   delete:
 *    tags:
 *      - Dishes
 *    summary: Delete a dish
 *    parameters:
 *      - in: path
 *        name: dishId
 *        schema:
 *          type: string
 *          required: true
 *        description: The dish id
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  $ref: '#/components/schemas/Dish'
 */

// Dishes by id routes
dishRouter
  .route("/:dishId")
  .get(getDishById)
  .post(createDishById)
  .put(authenticate.verifyUser, authenticate.verifyAdmin, updateDishById)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteDishById);

/**
 * @openapi
 * /dishes/{dishId}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: dishId
 *         schema:
 *          type: string
 *          required: true
 *         description: The dish id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/Dish'
 *
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Dishes comments by id routes
dishRouter
  .route("/:dishId/comments")
  .get(getDishCommentsById)
  .post(authenticate.verifyUser, createDishCommentsById)
  .put(updateDishCommentsById)
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    deleteDishCommentsById
  );

// Dishes comments by id routes
dishRouter
  .route("/:dishId/comments/:commentId")
  .get(getDishCommentById)
  .post(authenticate.verifyUser, createDishCommentById)
  .put(authenticate.verifyUser, updateDishCommentById)
  .delete(authenticate.verifyUser, deleteDishCommentById);

module.exports = dishRouter;
