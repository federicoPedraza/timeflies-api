const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const usersRoutes = require('./users.routes');

router.use(healthRoutes.path, healthRoutes.router);
router.use(usersRoutes.path, usersRoutes.router);

module.exports = router;
