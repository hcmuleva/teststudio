'use strict';

/**
 * influxdb router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::influxdb.influxdb');
