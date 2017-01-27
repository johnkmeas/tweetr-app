"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

function makeDataHelpersMongo(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    },
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },
    saveLike: function (user, like, callback) {
      db.scores.findOneAndUpdate(
         { "name" : "R. Stiles" },
         { $inc: { "points" : 5 } }
      )
      db.collection("tweets").find().insertOne(newTweet, (err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    },

  };
}

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = makeDataHelpersMongo;

