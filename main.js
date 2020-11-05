const host = `http://localhost:8080/`
const userCards = document.querySelector("#userCards")

const displayData = async () => {
  const userResponse = await fetch(`${host}api/routes/users`)
  const userData = await userResponse.json()
  
  userData.forEach((user) => {
    userCards.innerHTML += `
      <div class="col-md-4 card">
        <div class="card-header">${user.name}</div>
        <div class="card-body">${user.lastname}</div>
      </div>
    `
    console.log(user.name)
  })
}

displayData()