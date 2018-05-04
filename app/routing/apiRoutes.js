const path = require("path");
const express = require("express");
const friends = require("../data/friends.js");

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        console.log(req.body);

        let totalDiff = 0;
        let userScore = req.body.scores;
        //matched name for most compatible friend
        let userName = "";
        //matched Img for most compatible friend 
        let userImg = "";

        friends.forEach(currentFriend => {
            let difference = 0;

            userScore.forEach(elem => {
                difference += Math.abs(currentFriend.scores[elem] - userScore);
            });

            if(difference > totalDiff ) {
                totalDiff = difference;
                userName = currentFriend.name;
                userImg = currentFriend.photo;
                
            }

        });

        friends.push(req.body); // Pushing user data;

        res.json({status: "OK", 
            matchedName: userName,
            matchedImage: userImg
        })
    });


}