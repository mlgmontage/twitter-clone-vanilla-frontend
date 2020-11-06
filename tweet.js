const tweetId = location.hash.slice(1)
const host = `http://localhost:8080/`
const commentsBlock = document.querySelector('#commentsBlock')

console.log(tweetId)

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