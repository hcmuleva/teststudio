'use strict';

/**
 * influxdb service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::influxdb.influxdb');
