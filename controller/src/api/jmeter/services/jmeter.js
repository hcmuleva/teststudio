'use strict';

/**
 * jmeter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jmeter.jmeter');
