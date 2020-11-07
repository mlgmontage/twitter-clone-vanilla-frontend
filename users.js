const userid = location.hash.slice(1);
const host = `http://localhost:8080/`;
const tweetsBlock = document.querySelector("#tweetsBlock");
const token = localStorage.getItem("token");

// Redirecting unauthorized users
if (!token) {
  window.location.href = "./index.html";
}

const fetchUserTweets = async () => {
  const response = await fetch(`${host}api/routes/tweets/user/${userid}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bareer ${token}`,
    },
    method: "get",
  });

  const tweets = await response.json();
  console.log(tweets);

  tweets.forEach((tweet) => {
    tweetsBlock.innerHTML += `
            <figure class="mb-3">

              <blockquote class="blockquote mb-4">
                <a href="./tweet.html#${tweet.TweetId}" class="text-dark text-decoration-none">${tweet.Tweet}</a>
              </blockquote>

              <figcaption class="blockquote-footer">
                <span class="text-black">${tweet.name} ${tweet.lastname}</span> |
                <a href="./users.html#${tweet.UserId}" class="text-muted">@${tweet.login}</a>
              </figcaption>

              <hr />

            </figure>
   `;
  });
};

fetchUserTweets();
