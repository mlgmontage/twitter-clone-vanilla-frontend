const host = `http://localhost:8080/`;

const registerElm = document.querySelector("form");
const alertBox = document.querySelector("#alert-box");

const submit = document.querySelector("#submit");

submit.addEventListener("click", async (event) => {
  const registerForm = new FormData(registerElm);

  event.preventDefault();
  const body = {
    login: registerForm.get("login"),
    password: registerForm.get("password"),
    name: registerForm.get("name"),
    lastname: registerForm.get("lastname"),
  };

  const response = await fetch(`${host}api/routes/users/register`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  // alert
  if (response.status !== 200) {
    // alert elm
    alertBox.innerHTML = `
      <div class="alert alert-danger">
        ${data.message}
      </div>
    `;

    console.log(data);
  } else {
    alertBox.innerHTML = `
      <div class="alert alert-success">
        Account created successfully
      </div>
    `;
  }
});
