function getData (){
    let URL ="/acme/js/acme.json";
    fetch(URL)
    .then(response => response.json())
    .then(function (data) {
        console.log('Json object from getData function:');
        console.log(data); 
    data.name;
    data.path;
    data.description;
    data.manufacturer;
    data.price;
    data.reviews;
    })
}

getData()