const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routers/auth'); 
const serviceRoutes = require('./routers/serviceRoutes');
const projectRoutes = require('./routers/projectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Use the routes
app.use('/user', userRoutes);
app.use('/services', serviceRoutes);
app.use('/projects', projectRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
