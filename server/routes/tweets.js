"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });
  //Building the likes PUT function
  tweetRoutes.put("/", function(req, res){
    const like = {
      like: req.body
    };

    // DataHelpers.saveLike(like, (err) => {
      if (err) {
        console.log("Tried to create like but failed!:  ", like);
        res.status(500).json({ error: err.message });
      } else {
        console.log("Created Like:  ", like.like);
        res.status(201).send();
      }
  })




  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();

    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        console.log("tried to save tweet, failed.  ", tweet.content.text);
        res.status(500).json({ error: err.message });
      } else {
        console.log("good tweet.  ", tweet.content.text);
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
