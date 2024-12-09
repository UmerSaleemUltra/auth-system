const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            match: [/.+@.+\..+/, 'Please enter a valid email address'] 
        },
        password: { type: String, required: true },
        number: { 
            type: String, 
            required: true, 
            match: [/^0\d{10}$/, 'Phone number must start with 0 and be 11 digits long'] 
        },
        photo: { type: String },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
