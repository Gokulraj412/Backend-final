const express = require('express')
const{registerAdmin, loginAdmin} = require('../controllers/adminController')
const router = express.Router()

router.route('/admin/register').post(registerAdmin)
router.route('/admin/login').post(loginAdmin)

module.exports = router