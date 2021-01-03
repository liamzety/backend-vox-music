const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getTemplates,
    getTemplate,
    addTemplate,
    updateTemplate,
    removeTemplate } = require('./template.controller')
const router = express.Router()

router.get('/', getTemplates)
router.get('/:id', getTemplate)
router.put('/:id', updateTemplate)
router.post('/', addTemplate)
router.delete('/:id', removeTemplate)

module.exports = router


