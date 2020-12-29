var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')
const branchControll = require('../controlles/branchControll')


//get branch page
router.get('/branchManagement',branchControll.branchManagement);
//get branches
router.get('/getBranches', branchControll.getBranches);
  

  module.exports = router;