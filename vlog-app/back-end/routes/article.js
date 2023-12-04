const express= require ('express');
const router = express.Router();
const Article = require('../models/article');
const multer = require('multer');

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

router.post('/addAll',upload.any('image'),async(req,res)=>
{try{
    data =req.body;
  
    article=new Article(data);
    article.date= new Date();
    article.image=filename;
    article.tags= data.tags.split(',');
    savedarticle = await article.save();
    filename='';
    //res.send(user.save())
    res.send(savedarticle)
}catch(error){res.send(error)}
})

router.get('/all',(req,res)=>{
    Article.find({}).then(
        (art)=>{
            res.status(200).send(art);
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
    article =await Article.findOne({_id : myId});
    res.send(article);
    } catch (error) {
        res.send(error);
        
    }
})

router.get('/getbyidauthor/:id',async(req,res)=>{
    try {
        myId=req.params.id;
    article =await Article.find({idAuthor : myId});
    res.send(article);
    } catch (error) {
        res.send(error);
        
    }
})

router.delete('/supprimer/:id',async(req,res)=>{
    try {
        myId =req.params.id;
        darticle=await Article.findOneAndDelete({_id : myId});
        res.send(darticle);
    } catch (error) {
        res.send(error);
    }
})

router.put('/update/:id',upload.any('image'),async(req,res)=>{
    try {
        myId = req.params.id;
        NewData=req.body;
        NewData.tags = data.tags.split(',');
        if(filename.length> 0){
            NewData.image = filename ;
        }
        updated=await Article.findByIdAndUpdate({_id: myId},NewData);
        filename='';
        res.send(updated);
    
       } catch (error) {
        res.send(ereor);
        
       }
})




module.exports=router;