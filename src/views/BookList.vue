<template>
  <v-container fluid>
    <v-btn to="/addBook" color="info">Add Book</v-btn>
    <v-flex xs12 sm8 md8 lg8 offset-xs0 offset-lg2>
      <v-toolbar flat color="white">
        <v-toolbar-title>Books</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="search"
            single-line
            hide-details
        ></v-text-field>
        <v-dialog v-model="editDialog" max-width="600px">
          <EditBook :chosenBook="chosenBook" @response="response => closeEdit(response)"/>
        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="600px">
          <DeleteBook :chosenBook="chosenBook" @response="response => closeDelete(response)"/>
        </v-dialog>
      </v-toolbar>
      <v-data-table
            :headers="headers"
            :items="books"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.BookId }}</td>
          <td>{{ props.item.Name }}</td>
          <td>{{ props.item.Author }}</td>
          <td>{{ props.item.Year }}</td>
          <td>
            <v-icon @click="editBook(props.item)">edit</v-icon>
          </td>
          <td>
            <v-icon @click="deleteBook(props.item)">delete</v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" :color="loadingBarColor" icon="warning">
            {{loadingBarText}}
          </v-alert>
        </template>
      </v-data-table>
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ snackbarText }}
        <v-btn color="black" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-flex>
  </v-container>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import EditBook from '@/components/EditBook.vue'
import DeleteBook from '@/components/DeleteBook.vue'

export default {
  name: 'BookList',
  components: {
    EditBook,
    DeleteBook
  },
  data: () => ({
    loadingBarText: 'Loading Books',
    loadingBarColor: 'info',
    search: '',
    rowsPerPageItems: [10, 15, 25, 50, 100, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 }],
    editDialog: false,
    deleteDialog: false,
    headers: [
      { text: 'Book Id', value: 'BookId', sortable: false },
      { text: 'Title', value: 'Name', sortable: false },
      { text: 'Author', value: 'Author', sortable: false },
      { text: 'Year', value: 'Year', sortable: false },
      { text: 'Edit', align: 'center', sortable: false },
      { text: 'Delete', align: 'center', sortable: false }
    ],
    books: [],
    chosenBook: '',
    snackbar: false,
    snackbarColor: '',
    y: 'top',
    x: null,
    mode: '',
    timeout: 6000,
    snackbarText: '',
    addSuccess: false
  }),

  created () {
    if (this.$route.path.endsWith('/addSuccess')) {
      this.showSnackbar('success', 'add')
    }
    this.getBooks()
  },

  methods: {
    getBooks () {
      axios.get('http://localhost:5000')
        .then(resp => {
          this.books = resp.data.books
        })
        .catch(err => {
          console.log('Error getting books')
          console.log(err)
          this.loadingBarText = 'There was an error loading books'
          this.loadingBarColor = 'error'
        })
    },

    editBook (book) {
      this.chosenBook = book
      this.editDialog = true
    },

    deleteBook (book) {
      this.chosenBook = book
      this.deleteDialog = true
    },

    closeEdit (resp) {
      this.editDialog = false
      this.showSnackbar(resp, 'edit')
      this.getBooks()
    },

    closeDelete (resp) {
      this.deleteDialog = false
      this.showSnackbar(resp, 'delete')
      this.getBooks()
    },

    showSnackbar (outcome, action) {
      if (outcome === 'success') {
        if (action === 'add') {
          this.snackbarText = 'Book added successfully'
        } else if (action === 'edit') {
          this.snackbarText = 'Book edited successfully'
        } else if (action === 'delete') {
          this.snackbarText = 'Book deleted successfully'
        }
        this.snackbarColor = 'success'
        this.snackbar = true
      } else if (outcome === 'error') {
        if (action === 'edit') {
          this.snackbarText = 'An error occurred editing the book'
        } else if (action === 'delete') {
          this.snackbarText = 'An error occurred deleting the book'
        }
        this.snackbarColor = 'error'
        this.snackbar = true
      }
    }
  }
}
</script>
