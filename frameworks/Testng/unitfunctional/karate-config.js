function config() {
    // Define environment variables
    const env = karate.env; // Karate automatically detects the environment (e.g., dev, qa, prod)
    const baseUrl = env === 'dev' ? 'https://dev.example.com' : 'https://example.com';
    const username = karate.properties['user.name'];
    const password = karate.properties['user.password'];
  
    // Define reusable functions
    function login() {
      karate.call('login.feature', { username, password });
    }
  
    // Configure report generation
    karate.configure('karate-reports', {
      reportDir: 'target/reports',
      karateReportSuffix: '-karate-report',
    });
  
    // Return your configuration object
    return {
      baseUrl,
      login,
      // Add any other settings you need (e.g., headers, timeout)
    };
  }
  
  module.exports = config;
  