<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Book</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid" @keyup.native.enter="submit">
          <v-text-field
                  v-model="chosenBook.title"
                  :rules="titleRules"
                  label="Title"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="chosenBook.author"
                  :rules="authorRules"
                  label="Author"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="chosenBook.year"
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
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length >= 3 || 'Title must be at least 3 characters'
    ],
    authorRules: [
      v => !!v || 'Author is required',
      v => v.length >= 3 || 'Author must be at least 3 characters'
    ],
    yearRules: [
      v => !!v || 'Year is required',
      v => v > 0 || 'Year must be greater than 0'
    ]
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.put('http://localhost:5000/' + this.chosenBook._id, {
          title: this.chosenBook.title,
          author: this.chosenBook.author,
          year: parseInt(this.chosenBook.year)
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
