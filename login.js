// Login

const loginFormElm = document.querySelector("#loginForm");
const submit = document.querySelector("#submit");
const host = `http://localhost:8080/`;
const loginMessage = document.querySelector("#loginMessage");

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const loginForm = new FormData(loginFormElm);
  const body = {
    login: loginForm.get("login"),
    password: loginForm.get("password"),
  };

  const response = await fetch(`${host}api/routes/users/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!data.message) {
    // saving to localStorage
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location.href = "./tweets.html";
  } else {
    loginMessage.innerHTML = `
      <div class="alert alert-danger">${data.message}</div>
    `;
  }
});
