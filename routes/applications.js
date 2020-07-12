const router = require('express').Router();
const async = require("async");
let User = require('../models/User.model');
let Application = require('../models/Application.model');
const { application } = require('express');

//Get Requests

//Get all apps
//Not to be used in production
router.route('/').get((req, res) => {
    Application.find()
        .then(applications => res.json(applications))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get user apps
// Will require further authentication
router.route('/:id').get((req, res) => {
    const uid = req.params.id;
    User.findById(uid)
        .then((user) => {
            let applicationIds = user.applications;
            let applications = [];
            
            //Create a promise for the forEach loop to finish
            new Promise((resolve, reject) => {
                applicationIds.forEach((_id, index) => {
                    Application.findById(_id)
                        .then((app) =>{
                            applications.push(app); 
                            if (index === applicationIds.length - 1) resolve();
                        });
                });
            }).then(() => {
                res.json(applications);
            });

        }).catch(err => console.log("big" + err));
});

//Post Requests

//Make new app
router.route('/add').post((req, res) => {
    const uid = req.body.uid;
    const company = req.body.company;
    const submitDate = Date.parse(req.body.submitDate);
    const url = req.body.link;
    const jobTitle = req.body.jobTitle;
    const jobId = req.body.jobId;

    const newApplication = new Application({
        uid,
        company,
        //submitDate,
        url,
        jobTitle,
        jobId,
    });
    //Add new application to the users base
    newApplication.save()
        .then((app) => { 
            User.findById(uid)
                .then((user) => {
                    let newApplications = user.applications;
                    newApplications.push(app._id);
                    user.applications = newApplications;
                    user.save().then(() => res.json("Application created and added to " + uid));
                    //.catch Delete the application and try again (Not so important rn, I can manually delete all of them myself)
                }).catch(err => res.status(400).json('Error: ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router