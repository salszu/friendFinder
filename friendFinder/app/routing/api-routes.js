var express = require('express');
var router = express.Router();
var path = require('path');
var jsonfile = require('jsonfile');
var file = './app/data/friends.js';

// Show friends
router.get('/api/friends', function(req, res) {
    res.json(jsonfile.readFileSync(file));
})

// Get friend post req
router.post('/api/friends', function(req, res) {
    // Read friends
    var friends = jsonfile.readFileSync(file);
    // Find friend
    var index = findFriend(req.body, friends);
    // Add friend
    friends.push(req.body);
    jsonfile.writeFileSync(file, friends, { spaces: 2 });
    // Respond to client with friend
    res.json({
        name: friends[index].name,
        photo: friends[index].photo,
        location: friends[index].location,
        email: friends[index].email
    });
})

function findFriend(self, friends) {
    var friend = {};
    // Loop through all friends
    for (var i in friends) {
        var diff = 0;
        // Loop through all scores
        for (var j in friends[i].scores) {

            diff += Math.abs(Number(self.scores[j]) - Number(friends[i].scores[j]));
        }
        // If there is no diff already found, add
        if (friend.diff === undefined) {
            friend.diff = diff;
            friend.index = i;
            // Else see if difference is lower then add diff and index
        } else {
            if (diff < friend.diff) {
                friend.diff = diff;
                friend.index = i;
            }
        }
    }
    console.log(friend);
    return friend.index;
}

module.exports = router;