const tutorialModel = require("../models/tutorial.model")
exports.findAll = (req, res) => {
    console.log("controller findall")
    const title = req.query.title;
    tutorialModel.getAll(title, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    // ตรวจสอบ request ว่าว่างเปล่าหรือไม่
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // สร้างเรคอร์ดหนังสือใหม่ อ่านค่าจาก request มาใส่ทีละฟิลด์
    const tutorial = new tutorialModel({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
    });
    // บันทึกลง database ด้วยการเรียก method create ที่เราเขียนไว้ใน models
    tutorialModel.create(tutorial, (err, data) => {
    if (err)
        res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Tutorial."
    });
    else res.send(data);
    });
};
exports.findById = (req,res) =>{
    tutorialModel.findById(req.params.id,(err,data) => {
        if(err){
            res.status(500).send({message:"err: ",err})
        }
        else res.send(data)
    })
}
exports.delete = (req,res) =>{
    tutorialModel.remove(req.params.id,(err,data) => {
        if(err){
            res.status(500).send({message: err})
        }
        else res.send(data)
    })
}
exports.updateById = (req,res) =>{
    const newTutorial = {
        id: req.params.id
    }
    req.body.title != null ? newTutorial.title = req.body.title: "";
    req.body.description != null ? newTutorial.description = req.body.description: "";
    req.body.published != null ? newTutorial.published = req.body.published: "";

    tutorialModel.update(newTutorial,(err,data) =>{
        if(err){
            res.status(500).send({message: "err:",err})
        }
        else res.send(data)
    })
}