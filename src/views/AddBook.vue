<template>
  <v-container grid-list-md>
    <v-form ref="form" v-model="valid" @keyup.native.enter="submit">
      <v-text-field
              v-model="bookId"
              :rules="bookIdRules"
              label="Book Id"
              type="number"
              required
      ></v-text-field>
      <v-text-field
              v-model="title"
              :rules="titleRules"
              label="Title"
              required
      ></v-text-field>
      <v-text-field
              v-model="author"
              :rules="authorRules"
              label="Author"
              required
      ></v-text-field>
      <v-text-field
              v-model="year"
              type="number"
              :rules="yearRules"
              label="Year"
              required
      ></v-text-field>
      <v-btn
              color="blue darken-1" flat
              :disabled="!valid"
              @click="submit"
      >Submit</v-btn>
      <v-btn color="blue darken-1" flat @click="clear">Clear</v-btn>
    </v-form>
    <v-snackbar
            v-model="snackbar"
            color="error"
            :bottom="y === 'bottom'"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="6000"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
    >
      There was an error creating this book
      <v-btn color="black" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddBook',
  data: () => ({
    valid: true,
    bookId: '',
    bookIdRules: [
      v => !!v || 'Book Id is required',
      v => v > 0 || 'Book Id must be greater than 0'
    ],
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length >= 3 || 'Title must be at least 3 characters'
    ],
    author: '',
    authorRules: [
      v => !!v || 'Author is required',
      v => v.length >= 3 || 'Author must be at least 3 characters'
    ],
    year: '',
    yearRules: [
      v => !!v || 'Year is required',
      v => v > 0 || 'Year must be greater than 0'
    ],
    y: 'top',
    x: null,
    mode: '',
    snackbar: false
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:5000/', {
          bookId: parseInt(this.bookId),
          title: this.title,
          author: this.author,
          year: parseInt(this.year)
        }).then(resp => {
          this.$router.push('/addSuccess')
        }).catch(err => {
          console.log('Error editing book:')
          console.log(err)
          this.snackbar = true
        })
      }
    },

    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
