<template>
    <v-card>
        <v-card-title>
            <span class="headline">Are you sure you want to delete this book?</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-form ref="form">
                    <v-btn
                            color="blue darken-1" flat
                            @click="deleteBook"
                    >Yes</v-btn>
                    <v-btn color="blue darken-1" flat @click="close">No</v-btn>
                </v-form>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DeleteBook',
  props: ['chosenBook'],

  methods: {
    deleteBook () {
      if (this.$refs.form.validate()) {
        axios.delete(`/api/${this.chosenBook._id}`)
          .then(resp => {
            this.$emit('response', 'success')
          }).catch(err => {
            console.log('Error deleting book')
            console.log(err)
            this.$emit('response', 'error')
          })
      }
    },

    close () {
      this.$emit('response', 'close')
    }
  }
}
</script>
