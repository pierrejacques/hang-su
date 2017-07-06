<template>
  <div class="todo-list">
    <h2>Todo list</h2>
    <form v-on:submit.prevent="addTodo()">
      <label>Add a new todo list:</label>
      <input type="text" name="" value="" placeholder="todo title" v-model="newTodoTitle" v-on:keydown="isAlert = false">
      <input type="text" name="" value="" placeholder="detailed descriptions" v-model="newTodoDetail">
      <input type="submit" value="submit">
      <label v-show="isAlert">todo title required!</label>
    </form>
    <div class="">
      {{items}}
    </div>
    <todo v-for="(item, index) in items" :todo="item" @update="updateItem" @delete="deleteItem(index)"></todo>
  </div>
</template>

<script>
import todo from '@/components/todo'
export default {
  name: 'todoList',
  data () {
    return {
      newTodoTitle: '',
      newTodoDetail: '',
      items: [],
      isAlert: false
    }
  },
  methods: {
    addTodo: function () {
      if (this.newTodoTitle) {
        this.items.push({
          title: this.newTodoTitle,
          detail: this.newTodoDetail
        })
        this.newTodoTitle = ''
        this.newTodoDetail = ''
        this.pushToLocalStorage()
      } else {
        this.isAlert = true
      }
    },
    deleteItem: function (index) {
      this.items.splice(index, 1)
    },
    updateItem: function (data) {
      const idx = this.items.indexOf(data.item)
      if (idx >= 0) {
        this.items[idx].title = data.newItem.title
        this.items[idx].detail = data.newItem.detail
      }
    },
    pushToLocalStorage: function () {
      const local = window.localStorage
      local.setItem('todolists', JSON.stringify(this.items))
    }
  },
  created () {
    const local = window.localStorage
    const data = this.items = JSON.parse(local.getItem('todolists'))
    if (data) { this.items = data }
  },
  components: {
    todo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
