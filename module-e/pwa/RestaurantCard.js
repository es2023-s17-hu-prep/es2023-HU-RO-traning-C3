// work here
/// select event on continue

class RestaurantCard extends HTMLElement {
  span = null;
  style = null;

  constructor() {
    super();

    this.span = document.createElement("span");

    this.span.textContent = "asdf";
    this.script = document.createElement("script");
    this.script.innerText = `
`;

    let shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.script);
  }
  connectedCallback() {
    console.log(this.getAttribute("layout"));
    this.build(
      this.getAttribute("id"),
      this.getAttribute("layout"),
      this.getAttribute("title"),
      this.getAttribute("imageSrc")
    );
  }

  SetStyle(name, value) {
    if (name == "layout") {
    }
  }

  static get observedAttributes() {
    return ["id", "layout", "title", "imageSrc"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "layout") {
    }
  }

  build(id, layout, title, imageSrc) {
    this.shadowRoot.innerHTML = `
    <div class="restaurant">
              <img src=${imageSrc} alt="" />
              <h2>${title}</h2>
              <p><slot></slot></p>
              <button  class="simple-button">Continue>></button>
            </div>
          
            <style>
            
            /* reset */
            *,
            *::before,
            *::after {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: sans-serif;
            }
            
            .restaurant {
              margin-bottom:3rem;
              display: flex;
              flex-direction: column;
              width: 25rem;
              padding: 1rem 0.75rem;
              box-shadow: 3px 2px 7px 1px grey;
              border-radius: 0.5rem;
              gap: 0.75rem;
            }
            
            .restaurant > img {
              border-radius: 0.7rem;
              width: 100%;
            }
            .restaurant > button {
              margin-top: 1rem;
              align-self: end;
            }
            
            .restaurant p {
              font-weight: 400;
              color: #9e9e9e;
              font-size: 1rem;
            }
            
            .simple-button {
              border: none;
              background: none;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: #7c3aed;
            }
            </style>
            
            `;
  }
}

customElements.define("restaurant-card", RestaurantCard);
