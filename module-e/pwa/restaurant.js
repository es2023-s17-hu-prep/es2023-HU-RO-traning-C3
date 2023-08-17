var url_string = window.location;
var url = new URL(url_string);
var id = url.searchParams.get("id");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNiwibmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG4zQGdtYWlsLmNvbSIsImlhdCI6MTY5MjI1ODkwMywiZXhwIjoxNjkyMjg3NzAzfQ.nhw6BMNbZA9JI3sQR4beMY7PVnqFUWIH4ZWiI2NXppc";

async function getRestaurant() {
  var x = await fetch("http://api.localhost/v1/restaurant/" + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  var data = await x.json();
  console.log(data);
  document.getElementById("name").innerText = data["name"];
  document.getElementById("description").innerText = data["description"];
  var menu = document.getElementById("menu");
  data["menuItems"].forEach((element) => {
    console.log(element);
    var x = document.createElement("h4");
    x.innerText = element["name"];
    menu.appendChild(x);
  });
}
getRestaurant();
