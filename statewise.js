var unirest = require("unirest");
const express = require('express')
const app = express();



app.get('/', (req, response) => {
    var req = unirest("GET", "https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise");

    req.headers({
        "x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
        "x-rapidapi-key": "5e150f4d7amsh5f8ead4e664fbe3p1657a5jsnbadee923baac"
    });


    req.end(function (response) {
        if (response.error) throw new Error(response.error);

        // console.log(res.body);
        res.send(response.body)
    });

})

app.listen(8080)