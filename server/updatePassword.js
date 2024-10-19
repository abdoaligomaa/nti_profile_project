const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

async function updatePassword(email, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedPassword });
        console.log('Password updated successfully for', email);
        mongoose.connection.close();
    } catch (err) {
        console.error('Error updating password', err);
        mongoose.connection.close();
    }
}

updatePassword('amr@gmail.com', '123456789');
