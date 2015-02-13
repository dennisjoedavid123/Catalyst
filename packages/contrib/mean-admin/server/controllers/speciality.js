var mongoose=require('mongoose'),
	Speciality=mongoose.model('Speciality'),
	fs=require('fs'),
	_ = require('lodash');

	/**
 * Create Speciality
 */
exports.create = function(req, res, next) {
     console.log('create is called..'+req.body);
     
    var speciality = new Speciality(req.body);
    speciality.provider = 'local';

    console.log(speciality);

    // because we set our product.provider to local our models/product.js validation will always be true
    //req.assert('email', 'You must enter a valid email address').isEmail();
    //req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('speciality', 'speciality cannot be empty').notEmpty();
//    req.assert('Description', 'Description  cannot be more than 200 chars').len(1, 2000);
    
    var errors = req.validationErrors();

    console.log(errors);

    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    //user.roles = ['authenticated'];
    //product.roles = req.body.roles;
    speciality.save(function(err) {
        console.log('save is called..');
        console.log(err);
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Speciality already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }
        res.jsonp(speciality);
    });
};
exports.all = function(req, res) {
    console.log('all method called..');
    var speciality = new Speciality(req.body);
    Speciality.find({},function(error,speciality){
        console.log(speciality);
        if(error){
            res.render('error', {
                status: 500
            });
        }
        else{
            res.jsonp(speciality);
        }
        
    });
    
};

exports.speciality = function(req, res, next, id) {
    console.log("Inside Find Speciality by ID"+id);
    Speciality
        .findOne({
            _id: id
        })
        .exec(function(err, speciality) {
            console.log(err);
            if (err) return next(err);
            if (!speciality) return next(new Error('Failed to load speciality ' + id));
            req.profile = speciality;
            next();
        });
};

exports.update = function(req, res) {
    var speciality = req.profile;
    speciality = _.extend(speciality, req.body);

    speciality.save(function(err) {
        res.jsonp(speciality);
    });
};

exports.destroy = function(req, res) {
     var speciality = req.profile;
    console.log("the speciality is "+speciality);
    speciality.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(speciality);
        }
    });
};
