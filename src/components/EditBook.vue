<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Book</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid" @keyup.native.enter="submit">
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
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditBook',
  props: ['chosenBook'],
  data: () => ({
    valid: true,
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
      v => !!v || 'Year is required'
    ]
  }),

  watch: {
    chosenBook: function (val) {
      this.title = this.chosenBook.Name
      this.author = this.chosenBook.Author
      this.year = this.chosenBook.Year
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.put('http://localhost:5000/' + this.chosenBook._id, {
          Name: this.title,
          Author: this.author,
          Year: this.year
        }).then(resp => {
          this.$emit('response', 'success')
          this.clear()
        }).catch(err => {
          console.log('Error editing book')
          console.log(err)
          this.clear()
          this.$emit('response', 'error')
        })
      }
    },

    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
