
'use strict';

/* *
 * Module dependencies.*/

 var mongoose  = require('mongoose'),
 Schema    = mongoose.Schema;

var apiSchema = new Schema({
   apiName : {
       type : String,
       required: true
   },
   apiURL : {
       type : String,
       optional : true
   }
});

var modulesSchema = new Schema({
    moduleName: {
        type : String,
        required : true
    },
    moduleDesc : {
        type : String,
        optional : true
    },
    listOfAPIs : {
        type : Array,
        ref : apiSchema,
        optional : true
    }
});
var companySchema = new Schema({
   companyId : {
       type : Number,
       required : true,
       unique : true
   },

    companyName : {
        type : String,
        required : true
    }
});
 var LicenseSchema = new Schema({
 licenseType: {
 type: String,
 required: true
 },
 email: {
 type: String,
 required: true,
 unique: true
 },
 mobileNo: {
 type: Number,
 required: true,
 unique: true
 },

 username: {
 type: String,
 unique: true,
 required: true
 },
     userrole: {
         type: String,
         required: true
     },




 startDate:{
 type: String
 },

 endDate:{
 type: String
 },
     authenticationType:{
       type : String,
       default : 'Login',
       optional : true
     },
     modules : {
       type : Array,
       ref : modulesSchema,
       optional : true
     },
     company : {
       type : Object,
       ref : companySchema,
       required : true
     },


          licenseStatus : {
       type: String,
        required : true
     },


     noOfLicense: {
         type: Number,
         required :true
     },

    licenseAccess : {
         type : Object,
         optional : true
     },
     parentLicense:{
       type : mongoose.Schema.ObjectId,
       optional : true
     },

 licenseKey: {
 type: String,
 unique: true,
 required: true
 }
 });
 mongoose.model('License', LicenseSchema);