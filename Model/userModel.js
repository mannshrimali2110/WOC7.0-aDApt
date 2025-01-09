const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unqiue: true,
        trim: true,
        minlength: [4, 'Username must be at least 4 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is Required'],
        unqiue: true,
        trim: true,
        minlength: [4, 'email must be at least 4 characters'],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        trim: true,
        minlength: [4, 'Password must be at least 4 characters'],
    },
     role: {
        type: String,
        required: [true, 'Email is Required'],
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserData = mongoose.model('Users', userSchema);

module.exports = UserData;
