const { Schema, model } = require('mongoose');


const ToDoSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        complete: {
            type: Boolean,
            default: false
        },

        completedAt: {
            type: Date,
        }
    },

    {
        timestamps: true
    }
)

// export model
const task = model("task", ToDoSchema);
module.exports = task;