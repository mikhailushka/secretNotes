<template>
  <div class="notes">
    <h1>Добавление записи</h1>
      <div class="form">
        <div>
          <input type="password" name="PASSWORD" placeholder="ПАРОЛЬ" v-model="password">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="ТЕКСТ ЗАПИСИ" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_note_btn" @click="addNote">Добавить</button>
        </div>
      </div>
  </div>
</template>

<script type="module">
import NotesService from '@/services/NotesService'
export default {
  name: 'NewNote',
  data () {
    return {
      password: '',
      description: ''
    }
  },
  methods: {
    async addNote () {
      const response = await NotesService.addNote({
        password: this.password,
        description: this.description
      })
      if (this.description === '' || this.password === '') {
        this.flashMessage.error({title: 'Действие с записью', message: 'Заполните все поля'})
        this.$router.push({ name: 'NewNote', params: { uniqUrl: response.data.uniqUrl } })
      } else {
        this.flashMessage.info({title: 'Действие с записью', message: 'Запись успешно создана'})
        this.$router.push({ name: 'GetNote', params: { uniqUrl: response.data.uniqUrl } })
      }
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_note_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
