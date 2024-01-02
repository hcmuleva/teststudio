'use strict';

/**
 * jmeter router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::jmeter.jmeter');
