'use strict';

/**
 * runtest router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::runtest.runtest');
