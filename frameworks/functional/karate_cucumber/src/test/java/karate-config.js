function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);

  if (!env) {
    env = 'dev'; // a custom default
  }

  var config = {
    // your global config here
    baseUrl: 'https://example.com' // replace with your base URL
  };

  if (env === 'dev') {
    // override only those that need to be different
    config.baseUrl = 'https://dev.example.com';
  } else if (env === 'e2e') {
    config.baseUrl = 'https://e2e.example.com';
  }

  return config;
}
