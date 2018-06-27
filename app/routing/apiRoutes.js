const path = require("path");
const express = require("express");
const friends = require("../data/friends.js");

module.exports = function(app) {

	// List of all friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {

		// User input object
		let userInput = req.body;
	
		let userResponses = userInput.scores;


		// Match results for best friend
		let matchName = '';
		let matchImage = '';
		let totalDifference = 10000; 

		// Looping over all friends in the friends list
		for (var i = 0; i < friends.length; i++) {

			// getting differences for each friend
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// finding friend with the lowest amount of differences
			if (diff < totalDifference) {
	
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};