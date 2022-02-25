const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = 9000;
const DB_URI =  process.env.DB_URI;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
app.use(express.json());
app.use(cors());
const PostSchema = new Schema({
    userID: {
        type: 'Number',
        required: true,
    },
    id: {
        type: 'Number',
        required: true,
    },
    title: {
        type: 'String',
        required: true
    },
    body: {
        type: 'String',
        required: true
    }
});
const Post = mongoose.model('posts', PostSchema);

const connectDB = async() =>{
    try{
        const connection = await mongoose.connect(DB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log('Connected to DB!');
    }
    catch(err){
        console.log(err);

    }
}
connectDB();

app.get('/posts', async (req, res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).send({
            "success": true,
            "data": posts
        });
    }
    catch(err){
        console.log(err);
        res.status(404).send({
            "success": false,
            "error": err
        });
    }
});
app.get('/posts/:id', async(req, res)=>{
    try{
        const posts = await Post.find({id: req.params.id});
        res.status(200).send({
            "success": true,
            "data": posts
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            "success": false,
            "error": err
        });
    }
});
app.post('/posts', async(req, res)=>{
    const post = new Post({
        ...req.body
    });
    console.log(post);
    try{
        const savePost = await post.save();
        res.status(200).send({
            "success": true,
            "data": savePost
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            "success": false,
            "error": err
        });
    }
});
app.put('/posts/:id', async(req, res)=>{
    const postID = req.params.id;
    const update = {
        ...req.body
    }
    try{
        const post = await Post.findOneAndUpdate({postID : postID}, update, {new: true});
        res.status(200).send({
            "success": true,
            "data": post
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            "success": false,
            "error": err
        });
    }
});
app.delete('/posts/:id', async (req, res)=>{
    const postID = req.params.id;
    try{
        const deletePost = await Post.deleteOne({postID: postID});
        res.status(200).send({
            "success": true,
            "data": deletePost
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            "success": false,
            "error": err
        })
    }
});
app.listen(PORT, ()=>{
    console.log('Listening on PORT: ' + PORT);
});
