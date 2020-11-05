const host = `http://localhost:8080/`

const registerElm = document.querySelector("form")

const submit = document.querySelector("#submit")

submit.addEventListener("click", async (event) => {
  const registerForm = new FormData(registerElm)

  event.preventDefault()
  const body = {
    name: registerForm.get("login"),
    password: registerForm.get("password"),
    name: registerForm.get("name"),
    name: registerForm.get("lastname"),
  }

  const registerRes = await fetch(`${host}api/routes/users/register`, {
    method: "POST",
    body: JSON.stringify(body)
  })

  const data = await registerRes.json()

  console.log(data)
})