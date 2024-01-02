'use strict';

/**
 * framework controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::framework.framework');
