const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const requiresAuth = require("../middleware/permissions");
const validateTaskInput = require('../validation/taskValidation')

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

        if(!isValid) {
            return res.status(400).json(error)
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
        const completeTasks = await Task.find(
            {
                user: req.user._id,
                complete: true,
            }).sort({ completedAt: -1 })

        const incompleteTasks = await Task.find({
            user: req.user._id,
            complete: false
        }).sort({ createdAt: -1 })

        return res.json({ incomplete: incompleteTasks, complete: completeTasks })

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

module.exports = router;
