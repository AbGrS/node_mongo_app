const mongoose = require('mongoose');
const userCoursesSchema = new mongoose.Schema({
  userId: {
    type: [String],
    required: true
  },
  courseId: {
      type: String,
      required: true
  },
  subscription: Number

})

const UserCourses = new mongoose.model('UserCourses', userCoursesSchema);
module.exports = UserCourses;