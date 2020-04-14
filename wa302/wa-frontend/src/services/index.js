import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000/", // tu se nalazi backend
  timeout: 1000  // koliko da cekam za odgovor sa backenda
});

let Posts = {
  add(post) {
    return Service.post("/posts", post);
  },
  async getAll(searchTerm) {
    let response = await Service.get(`/posts?_any=${searchTerm}`); 
    // u var response spremi ono što service.get pozove na baseURL (i doda mu posts sa parametrom any koji 
    //omogućuje pretragu po bilo kom parametru - backend index.js tu je to definirano)
   //await koristi jer service.get kao i fetch vraca promise 
    let posts = response.data.map(doc => { //ne treba then zbog awaita nego odmah radim sa gotovim jsonom
     // spremi u var posts data iz responsa
      return { //podesi parametre
        id: doc.id,
        url: doc.source,
        email: doc.createdBy,
        title: doc.title,
        posted_at: Number(doc.postedAt)
      };
    });

    return posts; // vrati posts koji zadovoljavaju parametar koji je korisnik unio
  }
};

export { Posts, Service };
