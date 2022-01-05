const {Router} = require('express');
const controller = require('../controllers/sensors.controllers');
const router = Router();

router.get('/', controller.getSensors);
router.get('/values', controller.getValues);

module.exports = router;
