'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SpecialitySchema=new Schema({
	created: {
    type: Date,
    default: Date.now
  },
  speciality:{
  	type:String,
  	required:true,
  	trim:true
  },
  speciality_image:{
  	type:String,
  	required:false,
  	default: ['somewhere local'] 
  }
});

SpecialitySchema.path('speciality').validate(function(speciality) {
  return !!speciality;
}, 'speciality cannot be blank');

mongoose.model('Speciality',SpecialitySchema);