const hamBurger = document.getElementById("sidebar-toggle");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

