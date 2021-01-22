
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  name: {type:String,unique:true
  },
  age: Number,
  
});

const storySchema = Schema({
  author: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  title: String,   
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

module.exports={Story,Person}