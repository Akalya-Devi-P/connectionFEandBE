var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res){
  res.send('<h1>Welcome to Home page</h1>');
});


module.exports = router;
