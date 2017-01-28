// Database design example for Tweeter App
collection => tweeter

tweets:
  [
    { // Tweet Id
      "_id" : ObjectId("588a9d590af9803cde7968c3"),
      "user": { // User Id
        "id": ObjectId("UsesrId:cc84183c3b8459db")
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "likes":
        [ // Id of Users that like this tweet
          "_id" : ObjectId("UserId:70af9803cde7968c4"),
          "_id" : ObjectId("UserId:1c0b281c466099857"),
          "_id" : ObjectId("UserId:81c0b281c46609985")
        ]
      "created_at": 1461116232227
    }
  ]

users:
  [ // Id is all we need everything
    "_id" : ObjectId("UserId:cc84183c3b8459db"),
    "user": {
      "name": "Newton",
      "handle": "@SirIsaac",
      "bio": "I like to think alot.",
      "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },//Tweets created
      "tweets": [
        ObjectId("588a9d590af9803cde7968c3")
        ObjectId("418a9a81c0b281c466099856"),
        ObjectId("288a9a81c0b281c466099857"),
        ],//Tweets liked
      "likes": [
        ObjectId("272a9d590af9803cde7968c3"),
        ObjectId("121a9a81c0b281c466099856"),
        ObjectId("876a9a81c0b281c466099857"),
      ]
    }
  ]