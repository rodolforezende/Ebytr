const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  taskTitle: {
    type:String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  taskDescription: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  userTask: {
    type:String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  versionKey: false,
}
);


module.exports = mongoose.model('Task', taskSchema, 'task');