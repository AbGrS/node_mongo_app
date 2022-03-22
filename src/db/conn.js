const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myAppTest').then(()=>{
  console.log('mongodb connected...')
}).catch((e)=>console.error(e));