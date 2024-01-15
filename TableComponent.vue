<template>
  <div>
    <form @submit.prevent="addItem">
      <label for="itemName">Item Name:</label>
      <input type="text" id="itemName" v-model="newItemName" required>
      <label for="itemCategory">Category:</label>
      <input type="text" id="itemCategory" v-model="newItemCategory" required>
      <button type="submit">Add Item</button>
    </form>


    <div v-for="category in categories" :key="category">
      <h2>{{ category }}</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in itemsByCategory(category)" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.dueDate }}</td>
            <td>
              <button @click="rentItem(index)" :disabled="item.status === 'Rented'">Rent</button>
              <button @click="returnItem(index)" :disabled="item.status === 'Available'">Return</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newItemName: '',
      newItemCategory: '',
      items: [
        { name: 'Sony WH-1000xm4', category: 'Electronics', status: 'Available', dueDate: null },
        { name: 'Sony Playstation 5', category: 'Electronics', status: 'Available', dueDate: null },
        { name: 'MTG Universes Beyond The Ruinous Powers', category: 'Card Games', status: 'Available', dueDate: null },
        { name: 'MTG Universes Beyond Tyranid Swarm', category: 'Card Games', status: 'Available', dueDate: null },
        { name: 'MTG Universes Beyond Forces of True Imperium', category: 'Card Games', status: 'Available', dueDate: null },
        { name: 'MTG Universes Beyond Necron Dynasties', category: 'Card Games', status: 'Available', dueDate: null },
      ]
    };
  },
  computed: {
    categories() {
      return [...new Set(this.items.map(item => item.category))];
    }
  },
  methods: {
    itemsByCategory(category) {
      return this.items.filter(item => item.category === category);
    },
    addItem() {
      if (this.newItemName.trim() !== '' && this.newItemCategory.trim() !== '') {
        this.items.push({ name: this.newItemName, category: this.newItemCategory, status: 'Available', dueDate: null });
        this.newItemName = '';
        this.newItemCategory = '';
      }
    },
    rentItem(index) {
      if (this.items[index].status === 'Available') {
        this.items[index].status = 'Rented';
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        this.items[index].dueDate = dueDate.toISOString().split('T')[0];
      }
    },
    returnItem(index) {
      if (this.items[index].status === 'Rented') {
        this.items[index].status = 'Available';
        this.items[index].dueDate = null;
      }
    }
  }
};
</script>


<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}


.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}


.table th {
  background-color: #f2f2f2;
}


form {
  margin-bottom: 20px;
}


h2 {
  margin-top: 20px;
}
</style>