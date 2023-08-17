// work here
/// select event on continue

class RestaurantCard extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = "hello there";
    const div = document.createElement("div");
    const style = document.createElement("style");
    console.log(shadow);

    shadow.appendChild(style);
    shadow.appendChild(div);
  }
}

customElements.define("restaurant-card", RestaurantCard);
