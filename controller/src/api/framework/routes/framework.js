'use strict';

/**
 * framework router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::framework.framework');
