'use strict';

/**
 * trade controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::trade.trade', ({ strapi }) => ({
  // Override the find method
  async find(ctx) {
    // Get the authenticated user's ID

    const userId = ctx.state.user.id
    console.log("userId",userId)
    const trades = await strapi.db.query('api::trade.trade').findMany({
        select: ['*'],
        where: { users: {
            id:userId
        } },
        // populate: '*'
        populate: { users: true, journal:true },
      });
    // Return the response
    return { trades };
  },
  async create(ctx) {
    // Get the authenticated user from the context (based on the JWT token)
    const user = ctx.state.user;
console.log("user",ctx.state.user)
if (!user) {
  return ctx.unauthorized(`You must be logged in to create a trade.`);
}

// Append the user_id to the trade's data
const { data } = ctx.request.body;
data.users = user.id;  // Assuming the relation field is called `user`

console.log("data",data)
    // Proceed with the default creation process
    const entity = await strapi.service('api::trade.trade').create({ data });
console.log("entity",entity)
// Sanitize the output to prevent exposing sensitive information
const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
console.log("sanitizedEntity",sanitizedEntity)

    return ctx.body = sanitizedEntity;
  },

}));
