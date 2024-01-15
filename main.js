import { createApp } from 'vue';
import App from './App.vue';
import TableComponent from './components/TableComponent.vue';


const app = createApp(App);
app.component('TableComponent', TableComponent);
app.mount('#app');