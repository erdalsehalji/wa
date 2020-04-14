 <template>
  <div v-if="store.authenticated">
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Posts } from "@/services"
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
  data() {
    return {
      store,
      cards: [],
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
  },
  created() {
    this.fetchPosts() // poziv kada se app starta
    this.search("pula", "nikola") // poziv kada se app starta
  },
  name: "posts",
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm
      this.cards = await Posts.getAll(term)
    },
    search(title, createdBy) {
     fetch(`http://localhost:3000/posts?title=${title}&createdBy=${createdBy}`)
     //fetchaj sa title i createdBy parametrima koje dobijes u search u created dijelu
     .then(r => {
       return r.json() // dobiveni promise pretvori u json
     })
     .then(data => { //raspakiraj u data
       if(title === undefined || createdBy === undefined) {// moras imati oba parametra
         return console.log("Nedostaje parametar")//inace izbaci nedostaje parametar
       }
       else {
         this.cards = data.map(doc => {// ako imas prosljedena oba onda izbaci u konzolu (frontend) title i createdBy posta
           console.log("Naslov : ", doc.title)
           console.log("Kreirao : ", doc.createdBy)
         })
       }
     })
    },
    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
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