var express = require('express');
var router = express.Router();
const User = require('../Schema/users')
const {hashing, hashCompare} = require('../bcrypt')

/* GET users listing. */
router.get('/', async function(req, res) {
  res.send('Users Route');
});

router.get('/display', async function(req, res) {
  try{
    const user = await User.find()
    res.send(user)
  }
  catch(err){
    console.log(err)
  }
  
});

router.post('/register', async function(req, res) {
  try{
    const {name,email,mobile, password} = req.body
    const user = await User.findOne({email:email})
    if(user)
    {
      res.status(400).json({
        message:'User already exists. Kindly login to continue further'
      })
    }
    else
    {
      let hashedPassword = await hashing(password)
      console.log(hashedPassword)
      req.body.password = hashedPassword
      const record = await new User(req.body).save()
      console.log(record)
      res.status(200).json({
        message:'Record added'
      })
    }
  }
  catch(err){
    console.log(err)
  }  
});

router.post('/login', async function(req, res) {
  try{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(user)
    { 
      const compare = await hashCompare(password, user.password)
      if(compare)
      {
        res.status(200).json({
          message:'Login Successful'
        })
      }
      else
      {
        res.send('Password wrong')
      }
    }
    else
    {      
      res.status(400).json({
        message:'No user found. Kindly register first'
      })
    }
  }
  catch(err){
    console.log(err)
  }  
});

module.exports = router;
