<template>
  <div class="notes">
    <h1>Secret Notes</h1>
    <div>
      <router-link v-bind:to="{ name: 'NewNote' }" class="add_note_link">Добавить запись</router-link>
    </div>
  </div>
</template>

<script type="module">
export default {
  name: 'notes',
  data () {
    return {
      notes: []
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_note_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
