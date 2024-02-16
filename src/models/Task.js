/*Este modelo define a estrutura de uma tarefa, incluindo título, descrição, status de conclusão, data de criação e o ID do usuário que a criou.*/

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

