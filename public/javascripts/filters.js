function toggleMap() {
  const x = document.getElementById("map");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function toggleButton(id) {
  const allButtons = document.getElementsByClassName("main-filter");
  for (let button of allButtons) {
    button.style.backgroundColor = "transparent";
  }
  const btn = document.getElementById(id);
  btn.style.backgroundColor = "#FFFFE0";
}
