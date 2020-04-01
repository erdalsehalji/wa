let lista = [ 
     {    
         id: 10001,    
         createdBy: "nikola@tankovic.me"  
    }, 
     {    
         id: 10002,    
         createdBy: "marko@markovic.me"  
    }, 
     {   
          id: 10003,    
          createdBy: "iva@ivkovic.me" 
     } ]

let najveciId = lista.reduce(
    (max, list) => (list.id > max ? list.id : max), 
    lista[0].id
  );
  console.log(najveciId)