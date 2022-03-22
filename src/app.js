const http = require("http");
const host = 'localhost';
const port = '3000';
const express = require("express");

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('./db/conn');
const User = require('./models/register');
const Logger = require('./models/statistics');
const UserCourses = require('./models/userCourses');
const {registrationValidations, isUserAuthorized} = require("./middlewares/validation");
const app = express();
app.use(express.json());



app.get('/', (req, res)=>{
  return res.send('hello')
})

app.post('/register', registrationValidations, async(req, res)=>{


  const email = await User.findOne({email: req.body.email});
  
  if(email){
    return res.send('User already exists');
  }

  const user = new User(req.body);
  const issaved = await user.save();
  if(issaved){
    res.send('saved successfully')
  }else{
      res.status(400).send("Error")
  }
})

app.post('/login', async(req, res)=>{
  const email= req.body.email;
  const password = req.body.password;
  const doesEmailExist = await User.findOne({email: email});
  if(!doesEmailExist || !doesEmailExist.email){
      return res.send('incorrect credentials');
  }else{
      const doesPasswordMatch = doesEmailExist.password === password;
      if(doesPasswordMatch){
          const logStats = new Logger({
              event:'LogIn'
          })

          const generateToken = await jwt.sign({_id: doesEmailExist._id}, "secretkeyshouldbeminimumofthirtytwocharacters")
          const saveStats = await logStats.save();
          return res.status(200).send({token: generateToken, message: "loginSuccessfull"});
      }else{
        return res.send("Passwords do not match")
      }
  }
})

app.get('/course/list', isUserAuthorized, async(req, res)=>{
  if(req.isUserValidated){
      res.send("a list of private courses")
  }else{
      res.send("a list of public courses");
  }
})

app.post('/course/subscribe', isUserAuthorized, async(req, res)=>{
    if(req.isUserValidated){
        const course = await UserCourses.findOne({courseId: req.body.courseId});
        if(!course){
       
         const newCourseSubscription = new UserCourses({courseId: req.body.courseId, userId: [req.body.userId], subscription:1});
         const isSaved = await newCourseSubscription .save();
         if(isSaved)
            return res.send("successfully subscribed to the course");
        }else if(course.subscription <5){
          
                if(course.userId.includes(req.body.userId)){
                    return res.send('User is already subscribed');
                }
                const updateCourseSubscription = await UserCourses.updateOne(
                    {courseId: req.body.courseId},
                    {
                        $inc: {subscription: 1},
                        $push: {userId: req.body.userId}
                    },
                    )

                if(updateCourseSubscription)
                   return res.send("successfully subscribed to the course");
        }
        else{
            res.send("Subscription is full")
        }
    }else{
        res.send("a list of public courses");
    }
})


app.listen(port, ()=>{
 console.log(`server is running at post ${port}`)
});