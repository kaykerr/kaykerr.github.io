'use strict';

let data1;

function navBar (){
    let URL ="/acme/js/acme.json";
    fetch(URL)
    .then(response => response.json())
    .then(function (data) {
        console.log('Json object from getData function:');
        console.log(data); 
    
    data1 = data;
    let keys = Object.keys(data);
    let values = Object.getOwnPropertyNames(data);
    let nav = "<ul>"
    for (let i = 0, n = keys.length; i < n; i++) {
        let item = keys[i];
        nav += '<li><a href=# data-key="' + values[i] + '">' + item + "</a></li>";
    };

    nav += '</ul>';

   let navLinks = document.getElementById("nav-bar")
   navLinks.innerHTML = nav;
})
}

const QUERY = document.getElementById("nav-bar");

QUERY.addEventListener("click", function (evt){

    let key = evt.target.dataset.key;
    console.log(key);
    if (key != null) {
        evt.preventDefault();
    }

getData(key);

});



function getData(key) {

    const product = document.getElementById("product");
    const home = document.getElementById("home");
    let name = document.getElementById("prod-name");
    let path = document.getElementById("prod-img").setAttribute("src", data1[key]["path"]);
    let description = document.getElementById("description");
    const manufacturer = document.getElementById("manufacturer");
    let price = document.getElementById("price");
    let reviews = document.getElementById("reviews");
    let title = document.getElementById("page-title");

    if (key == 'Home') {
        product.setAttribute("class", "hide");
        home.setAttribute("class", "show");}
    else {
        home.setAttribute("class", "hide");
        product.setAttribute("class", "show");
        name.innerHTML = data1[key]["name"];

        console.log(data1[key]['manufacturer']);
        console.log(description.innerHTML);
        console.log(manufacturer.innerHTML);
        console.log(name.innerHTML);
        

        
        description.innerHTML = data1[key]["description"];  
        manufacturer.innerHTML = data1[key]['manufacturer'];
        
        price.innerHTML ="Price: $" + data1[key]["price"];
        reviews.innerHTML = data1[key]["reviews"];
        title.innerHTML = data1[key]["name"] + " | Acme"
        
    }

    }



















navBar()