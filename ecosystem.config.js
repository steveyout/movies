module.exports = {
  apps : [{
    name:'flixhq',
    script: 'node_modules/next/dist/bin/next',
    watch: '.',
    instances:'max',
    args: "start -p 3030",
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
