/**
 * @openapi
 * components:
 *  schemas:
 *   Error:
 *      type: object
 *      properties:
 *          status:
 *              type: string
 *              example: FAILED
 *          data:
 *              type: object
 *              properties:
 *                  error:
 *                      type: string
 *                      example: "Some error message"
 *   Unathorized:
 *      type: string
 *      example: "Unauthorized"
 *  securitySchemes:
 *    bearerAuth:            # arbitrary name for the security scheme
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 */
