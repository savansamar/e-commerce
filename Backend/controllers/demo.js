const { Person, Story } = require("../models/data")
const mongoose = require('mongoose');

exports.getID=(req,res,next,id)=>{
    Person.findById(id).exec((err,data)=>{
        if(err){
            return res.json("error in person")
        }
        req.data=data
        next()
    })
}
exports.createPerson=(req,res)=>{
    const author = new Person(req.body)
      
      author.save((err,data)=>{
          if(err){
return res.json("errror")
          }
          
    return res.json(data)
       /* const story1 = new Story({
          title: 'Casino Royale',
          author: author._id    // assign the _id from the person
        });
      
        story1.save(function (err) {
          if (err) return handleError(err);
          // that's it!
        })*/
        //console.log(data)
      });
    
}

exports.Save=(req,res)=>{
    const save=new Story({
        title:req.body.title,
        author: req.data._id
    })
    save.save((err,data)=>{
        if(err) return res.json('error')

            //req.story=data
            return res.json(data)
    })

}

exports.storyId=(req,res,next,id)=>{
    
    Story.findById(id).exec((err,data)=>{
                    if(err){
                        return res.json("errror during storyId")
                    }
                    //return res.json(data)
                  req.story=data
                  next()
        })
}
exports.getAll=(req,res)=>{
    Story.
    findOne({title:req.story.title}).
    populate('author').
    exec(function (err, story) {
      if (err) return handleError(err);
        return res.json(story)
      // prints "The author is Ian Fleming"
    });
   // console.log(req.story._id)

}

