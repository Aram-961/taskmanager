const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const requiresAuth = require("../middleware/permissions");
const validateTaskInput = require("../validation/taskValidation");
const task = require("../models/task");

// @route   GET /api/tasks/test
// @desc    Test the tasks route
// @access  Public

router.get("/test", (req, res) => {
    res.send("Task route is working properly");
});

// @route   POST /api/tasks/test
// @desc    Create a new task
// @access  Private

router.post("/new", requiresAuth, async (req, res) => {
    try {
        const { isValid, error } = validateTaskInput(req.body);

        if (!isValid) {
            return res.status(400).json(error);
        }
        // create a new task
        const newTask = new Task({
            user: req.user._id,
            title: req.body.title,
            content: req.body.content,
            complete: false,
        });

        // save the new task

        await newTask.save();

        return res.json(newTask);
    } catch (error) {
        console.log(error);

        return res.status(500).send(error.message);
    }
});

// @route   POST /api/tasks/current
// @desc    Current users tasks
// @access  Private

router.get("/current", requiresAuth, async (req, res) => {
    try {
        const completeTasks = await Task.find({
            user: req.user._id,
            complete: true,
        }).sort({ completedAt: -1 });

        const incompleteTasks = await Task.find({
            user: req.user._id,
            complete: false,
        }).sort({ createdAt: -1 });

        return res.json({ incomplete: incompleteTasks, complete: completeTasks });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});

// @route   PUT /api/tasks/:taskId/complete
// @desc    Current users tasks
// @access  Private

router.put("/:taskId/complete", requiresAuth, async (req, res) => {
    try {
        const taskToDo = await task.findOne({
            user: req.user._id,
            _id: req.params.taskId,
        });

        if (!taskToDo) {
            return res.status(404).json({ error: "could not find task" });
        }

        if (taskToDo.complete) {
            return res.status(400).json({ error: "Task is already complete" });
        }

        const updatedTask = await task.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.taskId,
            },

            {
                complete: true,
                completedAt: new Date(),
            },

            {
                new: true,
            }
        );
        return res.json(updatedTask);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});

// @route   PUT /api/tasks/:taskId/incomplete
// @desc    Current users tasks
// @access  Private

router.put("/:taskId/incomplete", requiresAuth, async (req, res) => {
    try {

        const taskToDo = await task.findOne({
            user: req.user._id,
            _id: req.params.taskId,
        });

        if (!taskToDo) {
            return res.status(404).json({ error: "Could not find ToDo" });
        }

        if (!taskToDo.complete) {
            return res.status(400).json({ error: "ToDo is already incomplete" });
        }

        const updatedTask = await task.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.taskId,
            },

            {
                complete: false,
                completedAt: null,
            },

            {
                new: true,
            }
        );
        return res.json(updatedTask);

    } catch (error) {
        console.log(error);
        return res.send(500).send(error.message)
    }
});

// i marked here to not get losttttt

// @route   PUT /api/tasks/:taskId/incomplete
// @desc    Update a users tasks
// @access  Private

router.put("/:taskId", requiresAuth, async (req, res) => {
    try {
        const taskToDo = await task.findOne({
            user: req.user._id,
            _id: req.params.taskId,
        });

        if (!taskToDo) {
            return res.status(404).json({ error: "Could not find ToDo" });
        }


        const { isValid, error } = validateTaskInput(req.body);

        if (!isValid) {
            return res.status(400).json(error)
        }

        const updatedTask = await task.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.taskId,
            },

            {
                content: req.body.content,
            },

            {
                title: req.body.title
            },

            {
                new: true,
            }
        );
        return res.json(updatedTask)

    } catch (error) {
        console.log(error);
        return res.send(500).send(error.message)
    }
});

// @route   DELETE /api/tasks/:taskId
// @desc    Delete a task
// @access  Private

router.delete('/:taskId', requiresAuth, async (req, res) => {
    try {
        const deleteTask = await task.findOne({
            user: req.user._id,
            _id: req.params.taskId
        })

        if (!deleteTask) {
            return res.send(404).json({ error: 'could not find task' })
        }

        await task.findOneAndRemove({
            user: req.user._id,
            _id: req.params.taskId
        })

        return res.json({ success: true })

    } catch (error) {
        console.log(error);
        return res.json(500).send(error.message)
    }
})

module.exports = router;
