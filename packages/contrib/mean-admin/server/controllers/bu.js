var mongoose=require('mongoose'),
    BU=mongoose.model('BU'),
    fs=require('fs'),
    _ = require('lodash');

exports.create=function(req,res,next){

   
	var bu = new BU(req.body);
	bu.provider = 'local';
    console.log('saving bu='+bu);

    req.assert('buname', 'buname cannot be empty').notEmpty();
    req.assert('description', 'description cannot be empty').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    bu.save(function(err) {
        console.log('save is called..');
        console.log(err);
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('buname already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400); 
        }
        res.jsonp(bu);
    });

};
exports.all = function(req, res) {
    console.log('all method called..');
    var bu = new BU(req.body);
    BU.find({delFlag:1},function(error,bu){
        console.log(bu);
        if(error){
            res.render('error', {
                status: 500
            });
        }
        else{
            res.jsonp(bu);
        }
        
    });
};

exports.bu = function(req, res, next, id) {
    console.log("Inside Find bu by ID"+id);
    BU.findOne({
            _id: id
        })
        .exec(function(err, bu) {
            console.log(err);
            if (err) return next(err);
            if (!bu) return next(new Error('Failed to load b u' + id));
            req.profile = bu;
            next();
        });
};

exports.update = function(req,res){
    var bu = req.profile;
    console.log("before extends bu in update="+bu);
    bu = _.extend(bu, req.body);
    console.log("bu in update="+bu);
    bu.delFlag=1;
    console.log('bu is called.... and undo is done..');
    bu.save(function(err) {
        res.jsonp(bu);
    });
};

exports.destroy = function(req,res){
     var bu = req.profile;
    console.log("ID of bu="+bu);
    bu.delFlag=0;
    console.log("after change="+bu);
    bu.save(function(err) {
        res.jsonp(bu);
    });
};
