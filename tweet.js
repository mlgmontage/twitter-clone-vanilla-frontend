const tweetId = location.hash.slice(1)
const host = `http://localhost:8080/`
const commentsBlock = document.querySelector('#commentsBlock')
const tweetIndividual = document.querySelector("#tweetIndividual")

console.log(tweetId)

// Tweet individual 
const fetchTweet = async () => {
  const response = await fetch(`${host}api/routes/tweets/${tweetId}`)
  const tweet = await response.json()

  tweetIndividual.innerHTML += `
    <figure class="mb-3">
      <blockquote class="blockquote mb-4">
        <div class="text-dark">${tweet[0].Tweet}</div>
      </blockquote>

      <figcaption class="blockquote-footer">
        <span>${tweet[0].name} ${tweet[0].lastname}</span> |
        <a href="#" class="text-muted">@${tweet[0].login}</a>
      </figcaption>
    </figure>
  `;
  console.log(tweet[0])
}

// Fetching comments
const fetchComments = async () => {
  const response = await fetch(`${host}api/routes/comments/${tweetId}`)
  const comments = await response.json()

  console.log(comments)

  comments.forEach(comment => {
    commentsBlock.innerHTML += `
      <figure class="mb-3">

        <blockquote class="blockquote mb-4">
          <div class="text-dark text-decoration-none">${comment.Comment}</div>
        </blockquote>

        <figcaption class="blockquote-footer">
          <span class="text-black">${comment.name} ${comment.lastname}</span> |
          <a href="#" class="text-muted">@${comment.login}</a>
        </figcaption>

        <hr />

      </figure>
    `
  })
}

fetchComments()
fetchTweet()

// Posting comments