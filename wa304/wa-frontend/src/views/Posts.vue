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
    this.fetchPosts()
    this.konverzije()// poziv rilikom pokretanja app 
  },
  name: "posts",
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm
      this.cards = await Posts.getAll(term)
    },

    konverzije() {
    Promise.all([
      fetch("https://api.exchangeratesapi.io/latest?symbols=HRK"),
      fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    ])// primiseall blok od 2 fetcha
    .then (rez => {
      Promise.all([rez[0].json(), rez[1].json()])//pretvorba promisea koje fetch vraca u JSON
      .then(json_rez => { //spremanje podataka iz jednog i drugog backenda u varijable
        let hrk = json_rez[0].rates.HRK
        let bitcoinEuro = json_rez[1].bpi.EUR.rate_float
        let bitcoinHrk = hrk * bitcoinEuro //pristup podatcima iz backenda
        console.log("Kuna : ", hrk)
        console.log("Bitcpin u eurima : ", bitcoinEuro)
        console.log("Bitcoin u kunama : ", bitcoinHrk)
        //ispis u konzolu
      })
    
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