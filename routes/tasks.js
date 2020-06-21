const express = require("express");
const task = require("../models/post");
const sucesstask = require("../models/sucesstasks");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("",(req, res, next)=>{
  task.find().then(document => {
    res.status(200).json({
      massage:'upcomming_task',
      tasks: document
    });
  });

});

router.delete("/:id",checkAuth, (req, res, next) => {
  task.deleteOne({ _id: req.params.id, creator:req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Delete successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id",checkAuth, (req, res, next) => {
  const newtask = new task({
    _id: req.body.id,
    task: req.body.task,
    date: req.body.date,
    creator: req.userData.userId
  });
  task.updateOne({ _id: req.params.id, creator:req.userData.userId }, newtask).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.post("/new",checkAuth, (req, res, next) => {
  const task_01 = new task({
    task: req.body.task,
    date: req.body.date,
    creator: req.userData.userId
  });
  task_01.save().then((createtask)=>{
    res.status(201).json({
      message: 'Task added successfully',
      taskId: createtask._id
    });

  });

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/sucess",checkAuth, (req, res, next) => {
  const sucess_task_01 = new sucesstask({
    task: req.body.task,
    date:req.body.date,
    creator: req.userData.userId
  });
  sucess_task_01.save().then((createtask)=>{
    res.status(201).json({
      message: 'Task completed successfully',
      taskId: createtask._id
    });
    ///////////sucess
  });

});

router.get("/sucess",(req, res, next)=>{
  sucesstask.find().then(document => {
    res.status(200).json({
      massage:'sucess_task',
      tasks: document
    }); //////////////sucess
  });

});

router.delete("/sucess/:id",checkAuth, (req, res, next) => {
  sucesstask.deleteOne({ _id: req.params.id }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
}); ////////suces

module.exports = router;

