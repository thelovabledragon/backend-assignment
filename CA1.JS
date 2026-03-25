
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const mongoURI = "mongodb+srv://michelleegwuatu_db_user:rdut8n81d1EpN5GU@ijeamakacluster1.sg3nxd1.mongodb.net/?appName=ijeamakaCluster1";
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Database connection error:", err));


const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);


app.post('/api/submit-form/login', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ statusCode: 200, msg: 'User Login Successfull!' });
    } catch (error) {
        res.status(500).json({ msg: "Error saving to database" });
    }
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


app.put('/api/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "User updated" });
});


app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));