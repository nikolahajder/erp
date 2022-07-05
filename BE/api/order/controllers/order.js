"use strict";
const { sanitizeEntity } = require("strapi-utils");
const finder = require("strapi-utils/lib/finder");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities = await strapi.services.order.find({
        ...ctx.query,
    });

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.order })
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.order.findOne({ id, user: user.Id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
  async create(ctx) {
    const { product } = ctx.request.body;

    console.log(product);
    console.log(strapi.services);

    if (!product) {
      return ctx.throw(400, "please specify a product");
    }
    const realProduct = await strapi.services.product.findOne({
      id: product.id,
    });
    if (!realProduct) {
      return ctx.throw(404, "No product wich such id");
    }
    const { user } = ctx.state;

    console.log(user);

    const BASE_URL = ctx.request.headers.origin || "http://localhost:3000";

    const newOrder = await strapi.services.order.create({
      user: user.id,
      id: product.id,
      total: product.total,
      status: "completed",
    });

    return newOrder;
  },
};
