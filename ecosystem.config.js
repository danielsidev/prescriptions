module.exports = {
    apps : [{
      name: 'prescriptions',
      script: 'src/server.js',
      instances: 'max',
      max_memory_restart: '256M',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true,
      env: {
        PORT_PSP: 7000,
        NODE_ENV: 'development',
      },
      env_homolog: {
        PORT_PSP: 7000,
        NODE_ENV: 'homolog'
      },
      env_production: {
        PORT_PSP: 7000,
        NODE_ENV: 'production',
      }
    }]
  };