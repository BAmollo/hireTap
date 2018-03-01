module.exports = {
    addstudent: (req, res) =>{
       let {name, id} = req.body
       req.app.get('db').create_student(name, id). then((results) =>{
           console.log(results);
           res.status(200).send(results)
       })
    },

    

























}