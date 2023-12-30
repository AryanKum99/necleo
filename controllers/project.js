const projModel = require('../models/projModel');

module.exports.getForm = (req, res) => {
    res.render('create');
}
module.exports.createForm = async (req, res) => {
    const project = new projModel(req.body);
    await project.save();
    res.redirect('/');
}
module.exports.getEditForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await projModel.findOne({ _id: projectId });
    res.render('edit', { project });
};
module.exports.editForm = async (req, res) => {
    const id = req.params.id;
    const project = await projModel.findByIdAndUpdate(id, { ...req.body });
    await project.save();
    console.log('Updated');
    res.redirect('/')
}
module.exports.deleteProject = async (req, res) => {
    const projectId = req.params.id;
    await projModel.findOneAndDelete({ _id: projectId });
    console.log('deleted');
    res.redirect('/');
}