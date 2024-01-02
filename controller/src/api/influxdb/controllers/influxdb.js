'use strict';

/**
 * influxdb controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::influxdb.influxdb');
