'use strict';

var mongoose = require('mongoose'),
	Schema  = mongoose.Schema;

var BUSchema = new Schema({
	created: {
    type: Date,
    default: Date.now
  },
  buname:{
  	type:String,
  	required:true,
  	trim:true
  },
  description:{
  	type:String,
  	required:true,
  	trim : true
  },
  delFlag:{
    type:Number,
    required:true,
    default:1
  }
});

BUSchema.path('buname').validate(function(buname) {
  return !!buname;
}, 'buname cannot be blank');

BUSchema.path('description').validate(function(description){
  return !!description;
},'description cannot be blank');

mongoose.model('BU',BUSchema);