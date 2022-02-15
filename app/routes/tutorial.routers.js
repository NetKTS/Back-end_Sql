const express = require('express')
const router = express.Router()
const tutorialsController = require('../controllers/tutorial.controller')

router.get('/', tutorialsController.findAll)
router.post('/', tutorialsController.create)
router.get('/:id',tutorialsController.findById)
router.delete('/:id',tutorialsController.delete)
router.put('/:id', tutorialsController.updateById)

module.exports = router
