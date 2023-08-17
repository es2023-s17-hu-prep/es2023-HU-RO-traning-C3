const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNiwibmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG4zQGdtYWlsLmNvbSIsImlhdCI6MTY5MjI1ODkwMywiZXhwIjoxNjkyMjg3NzAzfQ.nhw6BMNbZA9JI3sQR4beMY7PVnqFUWIH4ZWiI2NXppc";

const list = document.querySelector("ul");

async function getRestaurants() {
  var x = await fetch("http://api.localhost/v1/search", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // var myList = await x.json();
  (await x.json()).forEach((element) => {
    console.log(element);
    const doc = document.createElement("restaurant-card");

    doc.setAttribute("id", element["id"]);
    doc.setAttribute("layout", "vertical");
    doc.setAttribute("title", element["name"]);
    doc.setAttribute(
      "imageSrc",
      "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"
    );

    doc.innerHTML = element["description"];
    doc.addEventListener("click", function () {
      window.location = "/restaurant.html?id=" + element["id"];
    });

    list.appendChild(doc);
  });
}
getRestaurants();
