const express = require('express');
const router = express.Router();
const projectCont = require('../controllers/project');
router.route('/new')
    .get(projectCont.getForm)
    .post(projectCont.createForm)

router.route('/edit/:id')
    .get(projectCont.getEditForm)
    .put(projectCont.editForm)
router.route('/:id')
    .delete(projectCont.deleteProject)
module.exports = router;
