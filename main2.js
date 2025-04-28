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
      users: [],
      nextId: 1, // Startar på 1, vi kommer att sätta rätt id baserat på befintliga användare
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
      // Skapa användare utan id först
      const newUser = { name: this.name };

      // Lägg till id manuellt på klientsidan
      newUser.id = this.nextId;

      // Skicka en POST-förfrågan för att lägga till en användare
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((savedUser) => {
          // Lägg till användaren i listan
          this.users.push(savedUser);

          // Uppdatera nästa id för att vara nästa lediga nummer
          this.nextId++;
        })
        .catch((error) => {
          console.error("Fel vid postning av användare:", error);
        });
    },
    fetchUsers() {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;

          // Uppdatera nextId baserat på största id
          this.updateNextId();
        })
        .catch((error) => {
          console.error("Fel vid hämtning av användare:", error);
        });
    },
    updateNextId() {
      // Hitta det största numeriska id:t bland alla användare
      const maxId = this.users.reduce((max, user) => {
        // För varje användare (user) i listan:

        // Omvandla användarens id till ett heltal (parseInt).
        // Vi använder bas 10 (decimal) här för att säkerställa korrekt konvertering.
        const id = parseInt(user.id, 10);

        // Returnera det största av det nuvarande max-id:t och det aktuella id:t från användaren
        return id > max ? id : max;
      }, 1); // Initialvärdet för max är satt till 1 för att säkerställa att vi börjar från ett lågt värde

      // Sätt nästa id till det största id:t + 1
      this.nextId = maxId + 1; // Genom att öka max-id:t med 1 får vi nästa lediga id för användaren
    },
  },
  mounted() {
    this.fetchUsers(); // Hämta befintliga användare när appen laddas
  },
}).mount("#app");
