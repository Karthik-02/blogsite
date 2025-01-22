//Routes for CRUD
import express from 'express';
import { Blog } from '../models/blogModel.js';

const router = express.Router();


router.post('/', async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.subheading || !request.body.content){
            return response.status(400).send({message:'Request Failed to Create'});
        }
        const newBlog = {
            img:request.body.img,
            title: request.body.title,
            author:request.body.author,
            subheading:request.body.subheading,
            content:request.body.content,
            section: request.body.section
        };
        const blog = await Blog.create(newBlog);
        return response.status(201).send(blog);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.get('/',async (request,response)=>{
    try{
    const blogs = await Blog.find({});
        return response.status(200).json({
            count: blogs.length,
            data: blogs
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.get('/:id',async (request,response)=>{
    try{
    const {id} = request.params;
    const blog = await Blog.findById(id);
        return response.status(200).json({blog});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.put('/:id',async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.subheading || !request.body.content){
            return response.status(400).send({message:'Send all required fields!'});
        }
        const {id} = request.params;
        const result = await Blog.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).send('The Blog not found');
        }
        return response.status(200).send({message:'Blog Updated!'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.delete('/:id',async (request, response)=>{
    try{
        const {id} = request.params;
        const result = await Blog.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: 'blog not found'});
        }
        return response.status(200).send({message:'Blog Deleted Successfully'});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

export default router;