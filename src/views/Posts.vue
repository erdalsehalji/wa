<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(post)" :key="post.id" v-for="post in posts">
      <InstagramCard :info="post"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
  data() {
   // return store;
   return {
     store,
     posts: {},
     term: ""
   }
  },

  watch: {

    "store.searchTerm": _.debounce(function()  {
      console.log("Promjenio sam se!", this.store.searchTerm)
      this.fetchPosts()
    }, 500)

  },

  name: "posts",
  mounted() {
    this.fetchPosts()
  },

  methods: {
    fetchPosts() {

      fetch(`https://localhost:3000/posts?title=${this.term.searchTerm}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log("Podatci sa backenda : ", data)
        this.cards = data.map(doc => {

          return {
            id: doc.id,
            url: doc.source,
            email: doc.createdBy,
            title: doc.title,
            posted_at: doc.postedAt

            }

        })
      })

    },

    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    }
  },
  components: {
    InstagramCard
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>