/**
 * Custom select event used by the restaurant card
 */
class SelectEvent extends CustomEvent {
    constructor(id) {
        super('select', {
           bubbles: true,
           cancelable: false,
           composed: true,
           detail: {
               id
           }
        });
    }

}

/**
 * RestaurantCard web component
 */
class RestaurantCard extends HTMLElement {
    constructor() {
        super();

        // Attach the shadow DOM
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        // HTML Template for the card
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Styles for the restaurant card */
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 200px;
                    border-radius: 12px;
                    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
                    transition: all .3s;
                }
                
                .restaurant-card {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    height: 100%;
                    padding: 1rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
                    box-sizing: border-box;
                }
                
                .restaurant-card:hover img {
                    transform: translateY(-30px);
                }
                
                h1 { 
                    margin: 1rem 0 0;
                    font-size: 28px;
                }
                
                p {
                    margin: 0;
                    color: #444;
                    font-size: 18px;
                    line-height: 160%;
                }
                
                .text-and-button, .image-and-title {
                    display: flex;
                    flex-direction: column;
                }
                
                .text-and-button {
                    height: 100%;
                }
                
                button {
                    color: purple;
                    background: none;
                    border: none;
                    font-weight: bold;
                    transition: all .3s;
                    padding: 8px 16px;
                    border-radius: 8px;
                    margin: auto -12px -8px auto;
                }
                
                button:hover {
                    background: #efefef;
                }
                
                
                /* Horizontal layout styles */
                .restaurant-card[data-layout="horizontal"] {
                    flex-direction: row;
                    gap: 16px;
                }
                
                .restaurant-card[data-layout="horizontal"] button, .restaurant-card[data-layout="horizontal"] h1 {
                    margin: 0;
                }
                
                .restaurant-card[data-layout="horizontal"] button {
                    margin-left: auto;
                }
                
                .restaurant-card[data-layout="horizontal"] img {
                    width: 300px;
                    height: 200px;
                }
                
                .restaurant-card[data-layout="horizontal"] p {
                    padding: 8px;
                }
                
                .restaurant-card[data-layout="horizontal"] .text-and-button, .restaurant-card[data-layout="horizontal"] .image-and-title {
                    flex-direction: column-reverse;
                    height: 100%;
                    justify-content: flex-end;
                    gap: 8px;
                }
                
                .restaurant-card[data-layout="horizontal"]:hover img {
                    transform: translateX(-30px);
                }
            </style>
            
            <div class="restaurant-card" data-layout="${this.getAttribute('layout')}">
                <div class="image-and-title">
                    <img src="${this.getAttribute('imageSrc')}" alt="" />
                    <h1>${this.getAttribute('title')}</h1>
                </div>
                
                <div class="text-and-button">
                    <p>
                        <slot></slot>
                    </p>
                    <button>Continue >></button>
                </div>
            </div>
        `;

        // Render the template
        this.shadowRoot.appendChild(template.content)

        // Event Listener
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.dispatchEvent(new SelectEvent(this.getAttribute('id')))
        })
    }

    /**
     * Define the observed (reactive) attributes
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['layout'];
    }

    /**
     * Handle the attribute change
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== 'layout') return;

        this.shadowRoot.querySelector(".restaurant-card")?.setAttribute('data-layout', newValue)
    }
}

customElements.define('restaurant-card', RestaurantCard);