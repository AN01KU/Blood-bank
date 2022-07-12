var appi = document.getElementById("Appoint");

const form = document.getElementById("form");

if (appi.id === "Appoint") {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.action = "/blood-info2";
    form.submit();
  });
} else {
  console.log("Failed3");
}
