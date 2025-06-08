const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const usersRoutes = require('./users.routes');
const calendarRoutes = require('./calendar.routes');

router.use(healthRoutes.path, healthRoutes.router);
router.use(usersRoutes.path, usersRoutes.router);
router.use(calendarRoutes.path, calendarRoutes.router);

module.exports = router;
