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
        populate: { users: true },
      });
    // Return the response
    return { trades };
  },

  // Override the findOne method
//   async findOne(ctx) {
//     const { id } = ctx.params;
//     const userId = ctx.state.user.id;

//     // Get the requested entry
//     const entry = await strapi.service('api::trade.trade').findOne({ id });

//     // Check if the entry exists and belongs to the authenticated user
//     if (!entry || entry.user.id !== userId) {
//       return ctx.unauthorized(`You can't access this entry`);
//     }

//     // Call the default core action
//     const { data, meta } = await super.findOne(ctx);

//     // Return the response
//     return { data, meta };
//   },
}));
