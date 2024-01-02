'use strict';

/**
 * framework service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::framework.framework');
