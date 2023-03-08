<template>
  <h2>Add new order</h2>


  <button @click="add">Save</button>
  <router-link to="/"><button>Cancel</button></router-link>
</template>

<script>
import { nanoid } from "nanoid"

export default {
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    add() {



      this.$router.push("/")
    },
    newId() {
      return nanoid()
    }
  }
}
</script>
