const tweetsBlock = document.querySelector("#tweetsBlock")
const host = `http://localhost:8080/`

const fetchTweets = async () => {
  const response = await fetch(`${host}api/routes/tweets`)
  const tweets = await response.json()

  tweets.forEach(tweet => {
    tweetsBlock.innerHTML += `
            <figure class="mb-3">

              <blockquote class="blockquote mb-4">
                <a href="./tweet.html#${tweet.TweetId}" class="text-dark text-decoration-none">${tweet.Tweet}</a>
              </blockquote>

              <figcaption class="blockquote-footer">
                <span class="text-black">${tweet.name} ${tweet.lastname}</span> |
                <a href="#" class="text-muted">@${tweet.login}</a>
              </figcaption>

              <hr />

            </figure>
   `;
  })
}

fetchTweets()

// Post tweets

const tweetFormElm = document.querySelector("#tweetForm")
const tweetSubmit = document.querySelector("#submitTweet")


tweetSubmit.addEventListener("click", async (event) => {
  event.preventDefault()
  
  const tweetForm = new FormData(tweetFormElm)
  const body = {
    UserId: 3,
    Tweet: tweetForm.get("tweet")
  }

  const response = await fetch(`${host}api/routes/tweets/create`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(body)
  })
  const data  = await response.json()

  tweetFormElm.reset()
  console.log(data)

})