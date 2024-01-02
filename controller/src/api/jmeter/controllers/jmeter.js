'use strict';

/**
 * jmeter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::jmeter.jmeter');
