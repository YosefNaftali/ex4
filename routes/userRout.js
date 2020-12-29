var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')

var userControll = require('../controlles/userControl')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });

    });

router.post('/addUser',userControll.addUser);
router.get('/usersManagement', userControll.usersManagement);          //לבדוק
router.get('/getUsers',userControll.getUsers);
router.post('/deleteUser',userControll.removeUser);
router.post('/updateUser',userControll.updateUser);

 module.exports = router;
  