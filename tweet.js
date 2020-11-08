const tweetId = location.hash.slice(1);
const host = `http://localhost:8080/`;
const commentsBlock = document.querySelector("#commentsBlock");
const tweetIndividual = document.querySelector("#tweetIndividual");
const token = localStorage.getItem("token");
const commentFormElm = document.querySelector("#commentForm");
const submitComment = document.querySelector("#submitComment");

// Redirecting unauthorized users
if (!token) {
  window.location.href = "./index.html";
}

// Tweet individual
const fetchTweet = async (id) => {
  if (!localStorage.getItem("token")) {
    window.location.href = "./index.html";
    return;
  }

  const response = await fetch(`${host}api/routes/tweets/${id}`, {
    headers: {
      Authorization: `Bareer ${token}`,
    },
    method: "get",
  });

  if (response.status == 401 || response.status == 403) {
    localStorage.clear();
    window.location.href = "./index.html";
    return;
  }

  const tweet = await response.json();

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
};

// Fetching comments
const fetchComments = async () => {
  const response = await fetch(`${host}api/routes/comments/${tweetId}`, {
    headers: {
      Authorization: `Bareer ${token}`,
    },
    method: "get",
  });

  if (response.status == 401 || response.status == 403) {
    localStorage.clear();
    window.location.href = "./index.html";
    return;
  }

  const comments = await response.json();

  comments.forEach((comment) => {
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
    `;
  });
};

fetchTweet(tweetId);
fetchComments();

// Posting comments
submitComment.addEventListener("click", async (e) => {
  e.preventDefault();

  const commentForm = new FormData(commentFormElm);
  const body = {
    TweetId: parseInt(tweetId),
    Comment: commentForm.get("comment"),
  };
  console.log(body);

  const response = await fetch(`${host}api/routes/comments/create`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bareer ${token}`,
    },
    method: "post",
    body: JSON.stringify(body),
  });

  const comment = await response.json();

  console.log(comment);
});
