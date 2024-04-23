module.exports = {
  apps : [{
    name:'flixhq',
    script: './node_modules/.bin/next',
    watch: true,
    args : "start -p 3030",
    instances:'max',
    'exec_mode':'cluster'
  }],
};
