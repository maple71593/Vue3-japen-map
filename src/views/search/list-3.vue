<script setup>
import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
const db = useFirestore()
const citiesRef = collection(db, 'Plan')
const q = query(citiesRef, where('location', '==', '東京'))
const querySnapshot = await getDocs(q)
console.log(querySnapshot)
querySnapshot.forEach((doc) => {
  console.log(doc.id, ' => ', doc.data())
})
</script>
<template>
  <div></div>
</template>
<style></style>
