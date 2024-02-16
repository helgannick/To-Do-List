const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

//Rota para obter todas as tarefas de um usuário
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Rota para criar uma nova tarefa
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user.id,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para marcar uma tarefa como concluída
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    task.completed = true;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Rota para excluir uma tarefa
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    await task.remove();
    res.json({ message: "Tarefa excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Neste arquivo, definimos quatro rotas para manipular tarefas: obter todas as tarefas de um usuário, criar uma nova tarefa, marcar uma tarefa como concluída e excluir uma tarefa.

module.exports = router;
