<template>
  <div class=todo>
    <h4 v-show="!isEditing">{{todo.title}}</h4>
    <input v-show="isEditing" type="text" class="edit-title" name="" value="" v-model="newTitle">
    <span>--</span>
    <p v-show="!isEditing">{{todo.detail}}</p>
    <input v-show="isEditing" type="text" name="" value="" v-model="newDetail">
    <button v-on:click="toEdit" v-show="!isEditing" type="button" name="button">edit</button>
    <button v-on:click="toSave" :class="{disabled: !newTitle}" v-show="isEditing" type="button" name="button">save</button>
    <button v-on:click="toDiscard" v-show="isEditing" type="button" name="button">discard</button>
    <button class="btn-close" v-on:click=toDelete>x</button>
  </div>
</template>

<script type="text/javascript">
export default {
  created () {
    this.newTitle = this.todo.title
    this.newDetail = this.todo.detail
  },
  data () {
    return {
      newTitle: '',
      newDetail: '',
      isEditing: false
    }
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    toDelete: function () {
      this.$emit('delete')
    },
    toEdit: function () {
      this.isEditing = true
    },
    toSave: function () {
      this.isEditing = false
      this.$emit('update', {
        item: this.todo,
        newItem: {
          title: this.newTitle,
          detail: this.newDetail
        }
      })
    },
    toDiscard: function () {
      this.isEditing = false
      this.newTitle = this.todo.title
      this.newDetail = this.todo.detail
    }
  }
}
</script>

<style scoped>
  .btn-close {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    vertical-align: center;
    cursor: pointer;
  }
  h4, p {
    display: inline;
  }
  .disabled {
    pointer-events: none;
    color: grey;
  }
</style>
