'use strict';

/**
 * runtest service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::runtest.runtest');
