const express = require('express')

const router = express.Router();

const Author = require ('../models/author.js')
const multer = require('multer');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken')
filename ='';
const myStorage = multer.diskStorage({
    destination:'./uploads',
    filename: (req,file,redirect)=>{
        let date = Date.now();
        let fl = date +'.' +file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
        
    
})


const upload =multer({storage:myStorage});

router.post('/register',upload.any('image'),(req,res)=>{

    data = req.body;
    auth = new Author( data);

    auth.image = filename;
    salt = bcrypt.genSaltSync(10);
    auth.password = bcrypt.hashSync(data.password,salt);

    auth.save().then (
        (savedauth)=>{
            filename='';
            res.status(200).send(savedauth)
        }
    ).catch(
        (err)=>{
            res.send(err);
        }
    )


})
router.post('/login',(req,res)=>{
    let data = req.body;
    Author.findOne({email:data.email})
    .then(
        (auth)=>{
            let valid = bcrypt.compareSync(data.password, auth.password);
            if(!valid){
                res.send("mail or password invalid")
            }else{
                let payload ={
                    _id : auth._id,
                    email :auth.email,
                    fullname :auth.name +''+auth.lastname

                }

                let token = jwt.sign(payload,'1312');
                res.send({mytoken : token})
            }
        }
    ).catch(
        err=>{
            res.send(err);
        }
    )
})
router.get('/getAll',(req,res)=>{
    Author.find({}).then(
        (auth)=>{
            res.status(200).send(auth);
        }
    ).catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})
router.get('/getbyid/:id',async(req,res)=>{
    try {
        myId=req.params.id;
    author =await Author.findOne({_id : myId});
    res.send(author);
    } catch (error) {
        res.send(error);
        
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try {
        myId =req.params.id;
        dauthor=await Author.findOneAndDelete({_id : myId});
        res.send(dauthor);
    } catch (error) {
        res.send(error);
    }
})
router.put('/update/:id',(req,res)=>{
    
})










module.exports= router;