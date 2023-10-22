<script setup>
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
// import { useDocument } from 'vuefire'
// import { doc } from 'firebase/firestore'
const db = useFirestore()
// const settings = useDocument(doc(db, 'settings', 'some_id'), {
//   name: 'Los Angeles',
//   state: 'CA',
//   country: 'USA'
// })
const todos = useCollection(collection(db, 'todos'))
console.log(todos)

// console.log(todos.value)
</script>
<template>
  <div>
    <ul>
      <li style="font-size: 50px" v-for="(todo, index) in todos" :key="index">
        <span>{{ todo.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style></style>
