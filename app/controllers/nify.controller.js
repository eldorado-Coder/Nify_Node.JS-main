const Nify = require('../models/nify.model.js');


exports.create = (req, res) => {

	// Validate request
    console.log("DATA",req.body)
    if(!req.body.name) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User Data
    const user = new Nify({
        name: req.body.name, 
        email: req.body.email,
        picture:req.body.picture,
        social_site:req.body.providerId,
        uid:req.body.uid,
        id:req.body.id

    });
    console.log("DATA",user)

    // Save User Details in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating new User."
        });
    });

};

// Retrieve and check user details from the database.
exports.findAll = (req, res) => {
    console.log("Req",req.body)
	Nify.find({"Email":req.body.email,"Password":req.body.password})
    .then(login_ => {
        res.send(login_);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user details."
        });
    });
};

// Find a single note with a noteId
// exports.findOne = (req, res) => {

// };

// Update a note identified by the noteId in the request
// exports.update = (req, res) => {

// };

// Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {

// };