<template>
  <div class="add-order-container">
    <h1>Transport orders</h1>
    <div class="add-order-form">
      <h2>Add new order</h2>

      <form @submit.prevent="add">
        <div class="form-field">
          <input type="date" v-model="newOrder.date" required>
        </div>

        <div class="form-field">
          <input type="text" placeholder="Sender" v-model="newOrder.sender" required>
        </div>

        <div class="form-field">
          <input type="text" placeholder="Destination" v-model="newOrder.destination" required>
        </div>

        <div class="form-field">
          <input type="number" placeholder="Weight in kg" v-model.number="newOrder.weight" min="0.1" step="0.1" required>
        </div>

        <div v-if="warning" class="warning">{{ warning }}</div>

        <div class="form-actions">
          <button type="submit" class="save-button">Save</button>
          <router-link to="/"><button type="button" class="cancel-button">Cancel</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid"

export default {
  data() {
    return {
      newOrder: {
        id: '',
        date: '',
        sender: '',
        destination: '',
        weight: null,
        status: 'Confirmed'
      }
    }
  },
  methods: {
    add() {
      // Validate newOrder details here if needed

      // Assign an ID to the new order
      this.newOrder.id = this.newId();

      // Retrieve the existing orders from localStorage, add the new order, then save back to localStorage
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(this.newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Navigate back to the orders list view
      this.$router.push("/");
    },
    newId() {
      // Generate a unique ID for the new order
      return nanoid();
    }
  }
}
</script>

<style>
.add-order-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-order-form h2 {
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 15px;
}

.form-field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.warning {
  color: red;
  margin-top: 10px;
}
</style>