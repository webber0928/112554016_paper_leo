module.exports = {
  apps: [{
    name: 'web-app',
    exec_mode: 'fork',
    instances: 1,
    script: 'npm',
    args: 'run dev',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'develop'
    }
  }, {
    name: 'web-api',
    exec_mode: 'fork',
    instances: 1,
    script: 'npm',
    args: 'run api',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'develop'
    }
  }]
}
