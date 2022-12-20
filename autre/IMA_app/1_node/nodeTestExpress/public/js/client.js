window.onload = function () {
    // get the myFavs element and add an event listener (click) to it:
    document.getElementById("myFavs").addEventListener("click", function () {
        // get the values of the two input fields
        let favFruit = document.getElementById("fruit").value;
        let favVeg = document.getElementById("veg").value;
        console.log(favFruit);
        console.log(favVeg);
        // use the JQUERY ajax (not covering here) GET function to make a get request ... 
        // the endpoint and the vars we are passing...
        $.get(
            "/passingTheVars",
            { paramOne: favFruit, paramTwo: favVeg },
            // if we get a response from the server .... 
            function (response) {
                console.log('page content: ' + response);
            }); //get
    })//click function
}