var expressFunction = require("express");
const router = expressFunction.Router();

let courses = require("../data/course_data");

const authorization = require('../config/authorize')

router.route('/course')
    .get(authorization, (req, res) => {
        res.status(200).json(courses);
    })

router.route('/course')
    .post(authorization,(req, res) => {
        const playload = {
            course_id:  req.body.course_id,
            name: req.body.name,
            credit: req.body.credit,
            instructor: req.body.instructor
        }
        const mes ={
            message: "Add course succeccfully"
        }
            //console.log(playload);
        courses.push(playload);
        res.status(200).json(mes);
        console.log(courses);
    });

router.route('/course')
    .delete(authorization,(req, res) => {
        const index_delete = parseInt(req.body.index);
        console.log(index_delete);
        if(index_delete >= 0 && index_delete < courses.length){
            courses.splice(index_delete, 1);
            res.status(200).json({
                message: "Delete course succeccfully"
            });
        }else{
            res.status(404).json({
                message: "Cannot find course!"
            });
        }
        console.log(courses);
        
    })

module.exports = router