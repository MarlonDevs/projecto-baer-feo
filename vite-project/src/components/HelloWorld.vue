
<script setup>
  import { createApp, ref } from 'vue';
  const API_URL="https://localhost:5038/";

  createApp({
    data() {
      return{
        titel:"Baer",
        notes: []
      }
    }, methods:{
      async refreshData(){
        axios.get(API_URL+"api/baer-db/GetNotes").then(
          (response) => {
            this.notes = response.data;
          }
        )
      },
      async addNewNotes(){
        var newNotes=document.getElementById("newNotes").value;
        const formData=new FormData();
        FormData.append("newNotes", newNotes);

        axios.post(API_URL+"api/baer-db/AddNotes", formData).then(
          (response)=>{
            this.refreshData();
            alert(response.data);
          }
        )
      },
      async deleteNotes(id){

        axios.delete(API_URL+"api/baer-db/DeleteNotes?id="+id).then(
          (response)=>{
            this.refreshData();
            alert(response.data);
          }
        )
      }
    }, mounted:function(){
      this.refreshData()
    }
  }).mount('#app')
</script>

<template>
  <h2>Project to baer</h2>
  <input id="newNotes">&nbsp;
  <button @click="addNewNotes()">Add note</button>
  <div id="app">{{ message }}</div>
  <p>
    <b>* {{ notes.name }}</b>&nbsp;
    <button @click="deleteNotes(note.id)">delete note</button>
  </p>
</template>