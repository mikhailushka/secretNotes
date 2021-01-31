<template>
  <div v-if="isset" class="notes">
    <h1> {{ currentUrl }} </h1>
      <div class="form">
        <div>
          <button class="get_access_btn" @click="accessNote">Получить доступ</button>
          <button class="get_access_btn" @click="deleteNote">Удалить</button>
        </div>
        <div>
          <input type="password" name="password" placeholder="ПАРОЛЬ" v-model="password">
        </div>
        <div v-if="description">
          <textarea rows="15" cols="15" placeholder="ТЕКСТ ЗАПИСИ" v-model="description"></textarea>
        </div>
      </div>
  </div>
    <div v-else class="notes">
      <div >
        <h1>Ссылка: {{ currentUrl }} не найдена</h1>
        <div>
          <router-link v-bind:to="{ name: 'NewNote' }" class="get_access_btn">Добавить запись</router-link>
        </div>
      </div>
  </div>
</template>

<script type="module">
import NotesService from '@/services/NotesService'
export default {
  name: 'GetNote',
  data () {
    return {
      isset: '',
      password: '',
      description: '',
      currentUrl: document.URL
    }
  },
  mounted () {
    this.getNote()
  },
  methods: {
    async getNote () {
      const response = await NotesService.getNote({
        uniqUrl: this.$route.params.uniqUrl
      })
      this.isset = response.data._id
    },
    async deleteNote () {
      if (this.password === '') {
        this.flashMessage.error({title: 'Действие с записью', message: 'Введите пароль'})
      } else {
        const response = await NotesService.deleteNote({
          uniqUrl: this.$route.params.uniqUrl,
          password: this.password
        })
        if (response.data.password === 'invalid') {
          this.flashMessage.error({title: 'Действие с записью', message: 'Вы ввели не верный пароль'})
        } else {
          this.flashMessage.info({title: 'Действие с записью', message: 'Запись успешно удалена'})
          this.$router.push({ name: 'Main' })
        }
      }
    },
    async accessNote () {
      if (this.password === '') {
        this.flashMessage.error({title: 'Действие с записью', message: 'Введите пароль'})
      } else {
        const response = await NotesService.accessNote({
          uniqUrl: this.$route.params.uniqUrl,
          password: this.password
        })

        debugger;

        if (response.data.password === 'invalid') {
          this.flashMessage.error({title: 'Действие с записью', message: 'Вы ввели не верный пароль'})
        } else {
          this.description = response.data.description
        }
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
.get_access_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 259px;
  border: none;
  cursor: pointer;
}
</style>
