var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');

// Endpoint to fetch all tasks.
router.get('/', function (req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    return res.status(200).json(todos);
  });
});

// Endpoint to get specific task.
router.get('/:id', function (req, res, next) {
  Todo.findOne({
    _id: req.params.id
  }, function (err, todo) {
    if (err) {
      return next(err);
    }
    return res.status(200).json(todo);
  });
});

// Endpoint to create new task.
router.post('/', function (req, res, next) {
  Todo.create(req.body, function (err, todo) {
    if (err) {
      return next(err);
    }
    return res.status(201).json(todo);
  });

});

// Endpoint to update the task.
router.put('/:id', function (req, res, next) {
  var todo = {};
  if (req.body.task) {
    todo.task = req.body.task;
  }

  if (typeof req.body.isComplete !== 'undefined') {
    todo.isComplete = req.body.isComplete;
  }

  Todo.findOneAndUpdate({
    _id: req.params.id
  }, {$set: todo}, {upsert: true}, function (err) {
    if (err) {
      return next(err);
    }
    return res.status(204).json();
  });
});

// Endpoint to delete task.
router.delete('/:id', function (req, res, next) {
  var params = req.query.complete ? { isComplete: true} : { _id: req.params.id };
  Todo.remove(params, function (err) {
    if (err) {
      return next(err);
    }
    return res.status(204).json();
  });
});

module.exports = router;