console.log("tweet")
const tweetsBlock = document.querySelector("#tweetsBlock")
const host = `http://localhost:8080/`

const fetchTweets = async () => {
  const response = await fetch(`${host}api/routes/tweets`)
  const tweets = await response.json()
  console.log(tweets)

  tweets.forEach(tweet => {
    tweetsBlock.innerHTML += `
            <figure class="mb-3">

              <blockquote class="blockquote mb-4">
                <a href="" class="text-dark text-decoration-none">${tweet.Tweet}</a>
              </blockquote>

              <figcaption class="blockquote-footer">
                <span class="text-black">${tweet.name} ${tweet.lastname}</span> |
                <a href="#" class="text-muted">@${tweet.login}</a>
              </figcaption>

            </figure>
   `;
  })
}

fetchTweets()