const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const generateList = require("./generateList")
const update = require("./affectAddmistion")
//generateList()

update();