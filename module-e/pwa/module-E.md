# Module E - Next-Gen Innovations
* **Automated Testing**
Competitors will demonstrate their proficiency in writing comprehensive automated tests for selected JavaScript components, ensuring the reliability and stability of the guest experience. 
* **Web Component Creation**
Developers will design and implement versatile web components to enhance the web application's interactivity and user experience. These components should showcase reusability and seamless integration into the DineEase platform.
* **Progressive Web App (PWA) Development**
Participants will create a simple yet powerful PWA that serves as the foundation for a future mobile web app. 
The PWA should support offline functionality, push notifications, and seamless installation for enhanced accessibility.

## Task List:

### Automated Tests:
- In this task, you need to demonstrate your proficiency in testing using the popular testing framework, Jest. The primary goal is to assess contestants' ability to write effective unit tests that ensure the correctness and reliability of their codebase.
- You will be provided with a set of pre-defined JavaScript objects and functions that you need to test using Jest. You can find the code inside the `C1/module-e/tests` folder.
- It is expected to write comprehensive test cases that cover different scenarios, including edge cases and common usage scenarios. They should ensure that their tests are well-structured, readable, and capable of catching potential bugs and errors. Points will be awarded based on the accuracy of the tests, the coverage of code paths, and the overall quality of the testing suite.

### Web Components:
- In this exciting challenge, you will have the opportunity to showcase your expertise in creating a custom web component using pure, unadulterated JavaScript. The task is designed to evaluate your ability to work with the DOM, understand the principles of encapsulation and reusability, and craft elegant, functional web components.
- You will be given a foundational code structure that includes the basic HTML, CSS, and some starter JavaScript. Your mission is to design and implement a web component that fulfills a designated functionality.
- You need to create one component: `restaurant-card`. This component will have the following props:
    - `id: number`
    - `layout: vertical | horizontal`
    - `title: string`
    - `imageSrc: string (image from unsplash)`
    - `description: string (slot)`
- You can find the desing of this component under the `assets/module-E/web-components` folder.
- You must also implement a custom event handler. In the future, when others want to use your component, they can add an event listener to this component to react when the `Continue` button is clicked. The event listener will be used like this: `card.addEventListener("select", () => {})`

### PWA Development:
- In this task, you will delve into the world of Progressive Web Apps (PWAs) by creating an advanced PWA that not only boasts cutting-edge features but also guarantees a seamless user experience, even in challenging network conditions.
- You will embark on a journey to design and develop a fully functional PWA that incorporates two critical components: push notifications and offline functionality. Not only will you need to grasp the fundamentals of service workers and caching strategies, you also need to explore the intricacies of integrating push notification services.
- The PWA should be able to run offline, allowing users to access previously cached content and perform key actions even when they're not connected to the internet. Caching strategies should be wisely implemented to ensure optimal performance and minimal data usage.
- Purpose of the DineEase PWA: To provide users with an on-the-go experience, allowing them quick access to restaurant listings and the ability to view menus, even when offline. Simplified Functionalities of the DineEasy PWA for a 1-hour task:
    DONE (not really) 1. **Basic Restaurant Listings:**
        - Display a list of three to five sample restaurants available on DineEasy.
        - Users can tap on a restaurant to see more details.
    2. **Offline Menus & Details:**
        - Cache and display basic menu items (3-4 items per restaurant) for offline access.
        - Display a friendly offline message if the user tries to access non-cached details.
    DONE 3. **Installable Feature:**
        - Users should be able to add the DineEasy PWA to their device's home screen.
        - Set up a basic app icon and start URL for the PWA.
    DONE 4. **Basic Push Notifications:**
        - Implement a single push notification to welcome users when they first install the PWA.
    5. **Minimalistic User Interface:**
        - A clean, intuitive interface that showcases the above functionalities without requiring elaborate design components.
        - This trimmed-down version should be feasible for a one-hour development timeframe, given that the developer is experienced and the environment/tools are all set up. The key will be to focus on the essential PWA features (offline access, installability, basic notifications) while keeping the scope limited to ensure quality.