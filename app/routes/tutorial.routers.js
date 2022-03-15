const express = require('express')
const router = express.Router()
const tutorialsController = require('../controllers/tutorial.controller')

router.get('/', tutorialsController.findAll)
router.get('/published',tutorialsController.published)
router.post('/', tutorialsController.create)
router.get('/:id',tutorialsController.findById)
router.get('/title/:keyword',tutorialsController.findByTitle)
router.delete('/:id',tutorialsController.delete)
router.put('/:id', tutorialsController.updateById)

module.exports = router
