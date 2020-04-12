const got = require('got');
const express = require('express');
const app = express();
const hbs = require('hbs')
const port = process.env.PORT || 8080
app.set("view engine", "ejs");
app.set("view engine", "hbs");
app.get('/', async (req, res) => {
    res.render('search.hbs');
})

app.listen(port, () => {
    console.log('Server is running')
})


app.get("/results", async function (req, res) {
    var key = req.query.search;
    // console.log(key)
    const realkey = key.replace(/\s/g, '-')
    // console.log(realkey)

    var url = ("https://api.covid19api.com/country/" + realkey + "/status/confirmed/live");

    // console.log(url)
    var cases = []
    console.log(typeof (cases))
    var taarik = []
    const response = await got(url)
    var data = JSON.parse(response.body)
    // console.log(typeof (data))
    data.forEach(element => {
        cases.push(element.Cases);
    });
    data.forEach(element => {
        const month = '-' + (element.Date.slice(6, 7))
        // console.log(month)
        const sli = (element.Date).slice(8, 10);
        // console.log(sli)
        taarik.push(sli)
    });




    var url2 = "https://api.covid19api.com/live/country/" + realkey + "/status/confirmed";
    const response2 = await got(url2)
    // console.log(url)
    var data2 = JSON.parse(response2.body)
    // console.log(typeof (data))
    var active = 0;
    var deaths = 0;
    var recovered = 0
    // console.log(data2)
    data2.forEach(element => {

        deaths = element.Deaths;
        active = element.Active
        recovered = element.Recovered;
    });
    // console.log(deaths, active, recovered)

    res.render('results', {
        cases,
        taarik,
        deaths,
        active,
        recovered
    })

    // console.log(taarik, cases)
})