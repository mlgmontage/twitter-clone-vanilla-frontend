// Logout widget

const logout = document.querySelector("#logout");

if (!localStorage.getItem("token")) {
  logout.classList.add("d-none");
} else {
  logout.classList.remove("d-none");
}

logout.addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    localStorage.clear();

    window.location.href = "./index.html";
  }
});
