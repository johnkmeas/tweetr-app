// App.js
  //Like function
  // $('#tweets-container').on('click', '.fa.fa-heart', function(event){
  //   //console.log($(this).data('likes'))
  //   $.ajax({
  //       url: '/tweets',
  //       data: 'some words to put in heart',
  //       method: 'PUT',
  //       success: function (morePostsHtml) {
  //         alert('Load was performed.', morePostsHtml);
  //     }
  //   });
  //   // if($(this).data('likes') === 0){
  //   //   $(this).data('likes', 1);
  //   //   $(this).css('color', 'red')
  //   // }else {
  //   //   $(this).data('likes', 0)
  //   //   $(this).css('color', '#00a087')
  //   // }
  //   // $(this).css('color', 'red')
  // })


  //Tweet.js
    //TODO Build the likes PUT function
  // tweetRoutes.put("/", function(req, res){
  //   const like = {
  //     like: req.body
  //   };

  //   // DataHelpers.saveLike(like, (err) => {
  //     if (err) {
  //       console.log("Tried to create like but failed!:  ", like);
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       console.log("Created Like:  ", like.like);
  //       res.status(201).send();
  //     }
  // })


