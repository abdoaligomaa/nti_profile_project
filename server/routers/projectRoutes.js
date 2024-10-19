const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const projectId = req.params.id; 
  const updatedData = req.body; 

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });

    if (!updatedProject) {
      return res.status(404).send('Project not found');
    }

    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err); 
    res.status(500).send('Internal Server Error');
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.json(deletedProject);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
