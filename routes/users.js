const router = require('express').Router();
let User = require('../models/User.model');

////////////////
//GET Requests//
////////////////
//Get All Users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get Single User by ID
router.route('/user').get((req, res) => {
    User.findById(req.body.uid)
        .then((user) => {
            res.json(user);
        }).catch(err => res.status(400).json('Error: ' + err));
})

/////////////////
//POST Requests//
/////////////////
//Add new user
router.route('/add').post((req, res) => {
    const email = req.body.email;

    const newUser = new User({email});

    newUser.save()
        .then(() => res.json('User Saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;