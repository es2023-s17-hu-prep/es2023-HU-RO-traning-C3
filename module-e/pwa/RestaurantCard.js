// create the template
const template = document.createElement("template");
template.innerHTML = `
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif, Verdana
        }
        img {
            max-width: 100%;
            border-radius: .5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,.25);
        }
        #title {
            font-size: 28px;
            font-weight: bold;
        }
        p {
            font-size: 15px;
            color: #444;
        }

        .container {
            background-color: white;
            border-radius: .5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,.25);
            padding: 1rem;
            display: flex;
            gap: .5rem;
            border: 1px solid #ccc;
        }

        .container.vertical {
            gap: 1rem;
        }
        .container.vertical img {
            width: 50%;
            height: 200px;
            object-fit: cover;
        }

        .container.horizontal {
            flex-direction: column;
        }

        #continue-btn {
            border: 0;
            outline: 0;
            background-color: transparent;
            cursor: pointer;
            color: #7C3AED;
            font-weight: 500;
            width: fit-content;
        }
        #continue-btn:hover, #continue-btn:focus-visible {
            text-decoration: underline;
        }
    </style>

    <div class="container">
        <img src=""alt="Restaurant Image" />
        <div>
            <h1 id="title">Restaurant Name</h1>
            <p><slot /></p>
            <button id="continue-btn">Continue »</button>
        </div>
    </div>
`;

// Create the RestaurantCard custom componenet
class RestaurantCard extends HTMLElement {
  #id;

  // component constructor
  constructor() {
    super();

    // create and attach the shadow dom
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    // create and dispatch the event in btn click
    shadow.getElementById("continue-btn").addEventListener("click", () =>
      this.dispatchEvent(
        new CustomEvent("select", {
          composed: true,
          detail: {
            id: this.#id,
          },
        })
      )
    );
  }

  // define the attributes to listen
  static get observedAttributes() {
    return ["id", "layout", "title", "imagesrc"];
  }

  // react to attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "title":
        this.#updateTitle(newValue);
        return;
      case "imagesrc":
        this.#updateImageSrc(newValue);
        return;
      case "id":
        this.#id = newValue;
        return;
      case "layout":
        this.#updateLayout(oldValue, newValue);
        return;
    }
  }

  // update the restaurant title
  #updateTitle(title) {
    const titleElement = this.shadowRoot.getElementById("title");
    titleElement.innerText = title;
  }

  // update the image src
  #updateImageSrc(src) {
    const img = this.shadowRoot.querySelector("img");
    img.src = src;
  }

  // update the layout
  #updateLayout(oldLayout, layout) {
    const container = this.shadowRoot.querySelector(".container");
    container.classList.remove(oldLayout);
    container.classList.add(layout);
  }
}

// define the RestaurantCard
customElements.define("restaurant-card", RestaurantCard);
