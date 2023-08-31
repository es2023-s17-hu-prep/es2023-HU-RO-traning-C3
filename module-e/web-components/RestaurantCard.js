/**
 * Create the template
 */
const template = document.createElement("template");
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    #image {
      max-width: 100%;
      border-radius: .5rem;
    }
    #title {
      font-size: 24px;
      white-space: nowrap;
    }
    #desc {
      color: #333;
    }
    #continue-btn {
      background-color: transparent;
      border: none;
      color: #7c3aed;
      width: fit-content;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      margin-left: auto;
    }
    #continue-btn:hover,#continue-btn:focus-visible {
      text-decoration: underline;
    }

    .card {
      border: 1px solid #ccc;
      box-shadow: 0px 2px 4px rgba(0,0,0,.25);
      border-radius: .5rem;
      padding: 1rem;
      display: grid;
      gap: .5rem;
    }
    .card.vertical {
      grid-template-columns: repeat(1, 1fr);
    }
    .card.horizontal {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, fit-content);
    }
    
    .horizontal .title {
      order: 1;
    }
    .horizontal #continue-btn {
      order: 2;
    }
    .horizontal #image {
      order: 3;
    }
    .horizontal #desc {
      order: 4;
    }
  </style>

  <div class="card">
    <img id="image" alt="Restaurant Image" />
    <h1 id="title"></h1>
    <p id="desc"><slot></slot></p>
    <button id="continue-btn">Continue »</button>
  </div>
`;

/**
 * Define the component
 */
class RestaurantCard extends HTMLElement {
  // constructor
  constructor() {
    super();

    // attach the shadow dom
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    // create the custom event listener
    shadow.getElementById("continue-btn").addEventListener("click", () =>
      this.dispatchEvent(
        new CustomEvent("select", {
          composed: true,
          detail: {
            id: this.getAttribute("id"),
          },
        })
      )
    );
  }

  // observe to the attribute changes
  static get observedAttributes() {
    return ["title", "imagesrc", "id", "layout"];
  }

  // react to the attribute changes
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "title":
        this.shadowRoot.getElementById("title").innerHTML = newVal;
        return;
      case "imagesrc":
        this.shadowRoot.getElementById("image").src = newVal;
        return;
      case "layout":
        const card = this.shadowRoot.querySelector(".card");
        card.classList.remove(oldVal);
        card.classList.add(newVal);
        return;
    }
  }
}

customElements.define("restaurant-card", RestaurantCard);
