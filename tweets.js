const tweetsBlock = document.querySelector("#tweetsBlock");
const host = `http://localhost:8080/`;
const token = localStorage.getItem("token");

// Redirecting unauthorized users
if (!token) {
  window.location.href = "./index.html";
}

const fetchTweets = async () => {
  const response = await fetch(`${host}api/routes/tweets`, {
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

  const tweets = await response.json();

  tweets.forEach((tweet) => {
    const dateFromNow = moment(tweet.Date).fromNow();
    tweetsBlock.innerHTML += `
            <figure class="mb-3">

              <blockquote class="blockquote mb-4">
                <a href="./tweet.html#${tweet.TweetId}" class="text-dark text-decoration-none">${tweet.Tweet}</a>
              </blockquote>

              <figcaption class="blockquote-footer">
                <span class="text-black">${tweet.name} ${tweet.lastname}</span> |
                <a href="./users.html#${tweet.UserId}" class="text-muted">@${tweet.login}</a> |
                <span class="text-muted">${dateFromNow}</span>
              </figcaption>

              <hr />

            </figure>
   `;
  });
};

fetchTweets();

// Post tweets

const tweetFormElm = document.querySelector("#tweetForm");
const tweetSubmit = document.querySelector("#submitTweet");

tweetSubmit.addEventListener("click", async (event) => {
  event.preventDefault();

  const tweetForm = new FormData(tweetFormElm);
  const body = {
    UserId: 3,
    Tweet: tweetForm.get("tweet"),
  };

  const response = await fetch(`${host}api/routes/tweets/create`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bareer ${token}`,
    },
    method: "post",
    body: JSON.stringify(body),
  });
  const tweet = await response.json();

  tweetFormElm.reset();
  console.log(tweet);
  const dateFromNow = moment(tweet[0].Date).fromNow();

  tweetsBlock.innerHTML =
    `
            <figure class="mb-3">

              <blockquote class="blockquote mb-4">
                <a href="./tweet.html#${tweet[0].TweetId}" class="text-dark text-decoration-none">${tweet[0].Tweet}</a>
              </blockquote>

              <figcaption class="blockquote-footer">
                <span class="text-black">${tweet[0].name} ${tweet[0].lastname}</span> |
                <a href="./users.html#${tweet[0].UserId}" class="text-muted">@${tweet[0].login}</a> |
                <span class="text-muted">${dateFromNow}</span>
              </figcaption>

              <hr />

            </figure>
   ` + tweetsBlock.innerHTML;
});
