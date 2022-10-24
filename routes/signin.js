const expressFunction = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = expressFunction.Router();

const students = require("../data/students_data");

const key = 'real_key';

const compareHash = async(plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) =>{
            if(err){
                reject(new Error ('Error bcrypt compare'))
            }else{
                resolve({status: data});
            }
        })
    })
}

const findUser = (stdid) => {
    return new Promise((resolve, reject) => {
        const index_signin = students.findIndex(x => x.stdid === stdid);
        console.log(index_signin);
        //console.log(students);
        if (index_signin == -1){
            reject(new Error('Cannot find username!'));
        }else{
            resolve(students[index_signin]);
        }
    })
}

router.route('/signin')
    .post(async(req,res) =>{
        const playload = {
            stdid: req.body.stdid,
            password: req.body.password
        };
    
        console.log(playload);

        try{
            const result = await findUser(playload.stdid);
            const loginStatus = await compareHash(playload.password, result.password);

            const status = loginStatus.status;

            if(status){
                const token = jwt.sign(result, key, {expiresIn: 60*5});
                res.status(200).json({result, token, status});
            }else{
                res.status(200).json({status});
            }

        }catch(error){
            res.status(404).send(error);
        }
    })

module.exports = router