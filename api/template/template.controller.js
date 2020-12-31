const templateService = require("./template.service");

// GET LIST
async function getTemplates(req, res) {
    const templates = await templateService.query()
    res.send(templates)
}
// GET SINGLE
async function getTemplate(req, res) {
    const template = await templateService.getById(req.params.id)
    res.send(template)
}
// DELETE
async function removeTemplate(req, res) {
    await templateService.remove(req.params.id)
    res.end()
}
// CREATE
async function addTemplate(req, res) {
    const template = await templateService.add(req.body)
    res.send(template)
}

// UPDATE
async function updateTemplate(req, res) {
    const template = await templateService.update(req.body)
    res.send(template)
}


module.exports = {
    getTemplates,
    getTemplate,
    addTemplate,
    updateTemplate,
    removeTemplate
}
