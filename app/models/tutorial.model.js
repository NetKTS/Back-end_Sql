const sql = require("./db.js");
// constructor function ประกาศ data member หรือ Property ให้กับ Class Tutorial
const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};
Tutorial.getAll = (title, result) => {
    let query = "SELECT * FROM tutorials";
    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    console.log("tutorials: ", res);
    result(null, res);
    });
};
Tutorial.create = (newTutorial,result) =>{
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
        result(null, { id: res.insertId, ...newTutorial });
    });
}
Tutorial.findById = (id,result) =>{
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`,(err,res) =>{
        if(err){
            console.log("error: ",err)
            result(err,null);
            return;
        }
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);

    })
}

Tutorial.remove = (id,result) => {
    sql.query(`DELETE FROM tutorials WHERE id = ${id}`,(err,res) =>{
        if(err){
            result(err, null);
        }
        result(null,{message:"deleted"})
    })
}
Tutorial.update = (newTutorial, result) =>{
    var query = "UPDATE tutorials SET ";
    var and = false;
    if(newTutorial.title != null){
        query += `title = '${newTutorial.title}' `
        and = true;
    }
    if(newTutorial.description != null){
        if(and){
            query += " , "
        }
        query += `description = '${newTutorial.description}' `
        and = true;
    }
    if(newTutorial.published != null){
        if(and){
            query += " , "
        }
        query += `published = ${newTutorial.published} `
        and = true;
    }
    query += ` WHERE id = ${newTutorial.id}`
    console.log(query)
    sql.query(query,(err,res)=>{
        if(err){
            result(err, null);
        }
        result(null,{message:"updated"})
    })
}


module.exports = Tutorial;