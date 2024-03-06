<template>
  <div class="orders-container">
    <h1>Transport orders</h1>
    <h2>Orders</h2>
    <div class="filters">
      <input type="text" v-model="searchText" placeholder="Search">
      <select v-model="selectedStatus">
        <option value="">All status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="In delivery">In delivering</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button @click="addOrder">Add new order</button>
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sortOrders('date')">Date</th>
          <th @click="sortOrders('sender')">Sender</th>
          <th @click="sortOrders('destination')">Destination</th>
          <th @click="sortOrders('weight')">Weight</th>
          <th @click="sortOrders('status')">Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredAndSortedOrders" :key="order.id">
          <td>{{ order.date }}</td>
          <td>{{ order.sender }}</td>
          <td>{{ order.destination }}</td>
          <td>{{ order.weight }} Kg</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="nextStatus(order)">Next status</button>
            <button @click="deleteOrder(order)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      searchText: '',
      selectedStatus: '',
      sortColumn: '',
      sortOrder: 'asc'
    };
  },
  computed: {
    filteredAndSortedOrders() {
      // Implémentez le filtrage et le tri basé sur searchText et selectedStatus
      if (this.selectedStatus) {
        return this.orders.filter(order => order.status === this.selectedStatus);
      }}
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    addOrder() {
      // Logique pour ajouter une nouvelle commande
      {
        this.$router.push("/add");
      }
    },
    nextStatus(order) {
      if (!(order.status === "Delivered")) {
        if (order.status === "Confirmed") {
          order.status = "In delivery";
        } else if (order.status === "In delivery") {
          order.status = "Delivered";
        }
      } else {
        alert("Order already delivered");
      }
    },
    deleteOrder(orderToDelete) {
      // Logique pour supprimer la commande
      this.orders = this.orders.filter(order => order.id !== orderToDelete.id);
      this.saveOrders();
    },
    sortOrders(column) {
      if (column === this.sortColumn) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
      this.orders.sort((a, b) => {
        let modifier = 1;
        if (this.sortOrder === 'desc') modifier = -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    },
    loadOrders() {
      // Load orders from localStorage or use default sample data
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
        console.log(this.orders)
      } else {
        // Populate with sample data if localStorage is empty
        this.orders = [
          {
            id: '1',
            date: '2021-01-01',
            sender: 'John Doe',
            destination: 'Paris',
            weight: 100,
            status: 'Confirmed'
          },
          {
            id: '2',
            date: '2021-01-02',
            sender: 'Jane Doe',
            destination: 'London',
            weight: 200,
            status: 'In delivery'
          },
          {
            id: '3',
            date: '2021-01-03',
            sender: 'John Smith',
            destination: 'Berlin',
            weight: 300,
            status: 'Delivered'
          }
        ];
      }
    },
    saveOrders() {
      // Save the current orders to localStorage
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  }
}
</script>

<style>
/* Ajoutez votre CSS ici */
</style>
