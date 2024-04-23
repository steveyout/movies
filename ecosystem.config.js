module.exports = {
  apps : [{
    name:'flixhq',
    script: './node_modules/.bin/next',
    watch: true,
    args : "start",
    instances:'max',
    'exec_mode':'cluster'
  }],
};
