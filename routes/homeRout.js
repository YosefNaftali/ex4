var express = require('express');
var router = express.Router();
const homeRouter=require ('../controlles/homeControll')

/* GET home page. */
router.get('/home',homeRouter.home);

module.exports = router;