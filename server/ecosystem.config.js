// https://pm2.keymetrics.io/docs/usage/application-declaration/
// # Start all applications
// pm2 start ecosystem.config.js
//
// # Stop all
// pm2 stop ecosystem.config.js
//
// # Restart all
// pm2 restart ecosystem.config.js
//
// # Reload all
// pm2 reload ecosystem.config.js
//
// # Delete all
// pm2 delete ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'nestjs-prod',
      script: './dist/main.js', // cluster mode run with node only, not npm
      args: '',
      exec_mode: 'cluster', // default fork
      instances: 2, //"max",
      kill_timeout: 4000,
      wait_ready: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'production',
        MONGO_URI: 'mongodb+srv://tomas:0gYrXPVCOFKvyqtl@foodmaps.qkl530y.mongodb.net/?retryWrites=true&w=majority',
        PORT: '5050',
        TEST_PORT: '5001',
        GOOGLE_MAPS_API_KEY: 'AIzaSyBu_Gfu-PgU-rRJ7hYP2-0K9Vb3qxqGt0s'
      }
    }
  ]
};
