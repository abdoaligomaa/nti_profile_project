const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const newService = new Service(req.body);
  try {
    const savedService = await newService.save();
    res.json(savedService);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const serviceId = req.params.id; 
  const updatedData = req.body; 

  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });

    if (!updatedService) {
      return res.status(404).send('Service not found');
    }

    res.json(updatedService);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    res.json(deletedService);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
