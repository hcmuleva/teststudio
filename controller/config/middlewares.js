module.exports = [

  'strapi::errors',
  'strapi::security',

  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: '*',
      headers: '*',
    },

  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::prometheus',
];