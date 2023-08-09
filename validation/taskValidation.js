const validator = require('validator')
const isEmpty = require('./isEmpty')

const validatorTaskInput = data => {
    let error = {};

    if (isEmpty(data.content)) {
        error.content = "content field should be filled with info"

    } else if (!validator.isLength(data.content, { min: 1, max: 300 })) {
        error.content = "content filed must be between 1 and 300 characters :)"
    }

    return {
        error,
        isValid: isEmpty(error)
    }
}

module.exports = validatorTaskInput;