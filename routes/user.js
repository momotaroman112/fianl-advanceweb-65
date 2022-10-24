var expressFunction = require("express");
const router = expressFunction.Router();
const bcrypt = require("bcryptjs");

const students = require("../data/students_data");

const makeHash = async(plainText) =>{
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                stdid: req.body.stdid,
                password: hashText,
                name: req.body.name,
                sex: req.body.sex,
                age: req.body.age,
                major: req.body.major,
                tel: req.body.tel
            }
            const mes ={
                message: "Sign up succeccfully"
            }
            //console.log(playload);
            students.push(playload);
            res.status(200).json(mes);
            console.log(students);
        })
        .catch(err=>{})
    });

module.exports = router