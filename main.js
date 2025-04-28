// app.js
const { createApp } = Vue;

createApp({
  data() {
    return {
      greeting: "Välkommen till Vue!",
      name: "Anna",
      age: 25,
      city: "Stockholm",
      isLoggedIn: true,
      users: [
        { id: 1, name: "Anna" },
        { id: 2, name: "Oskar" },
      ],
      nextId: 3, // Håller koll på nästa id för nya användare
    };
  },
  methods: {
    sayHello() {
      alert("Hej " + this.name + " från " + this.city + "!");
    },
    increaseAge() {
      this.age++;
    },
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    addUser() {
      this.users.push({ id: this.nextId, name: this.name });
      this.nextId++;
    },
  },
}).mount("#app");
