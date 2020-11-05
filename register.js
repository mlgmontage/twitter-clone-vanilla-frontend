const host = `http://localhost:8080/`

const registerElm = document.querySelector("form")

const submit = document.querySelector("#submit")

submit.addEventListener("click", async (event) => {
  const registerForm = new FormData(registerElm)

  event.preventDefault()
  const body = {
    login: registerForm.get("login"),
    password: registerForm.get("password"),
    name: registerForm.get("name"),
    lastname: registerForm.get("lastname"),
  }

  const registerRes = await fetch(`${host}api/routes/users/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })

  const data = await registerRes.json()

  console.log(data)
  console.log(JSON.stringify(body))
})