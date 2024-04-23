module.exports = {
  apps : [{
    name:'flixhq',
    script: 'npm run start',
    watch: '.',
    instances:'max',
    exec_mode:'cluster'
  }],

  deploy : {
    production : {
      user : 'root',
      host : '69.49.230.162',
      ref  : 'origin/main',
      repo : 'https://github.com/steveyout/movies.git',
      path : '/root/movies',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
