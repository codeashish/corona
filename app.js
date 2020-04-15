const got = require('got');
const express = require('express');
const app = express();
const hbs = require('hbs')
var unirest = require("unirest");
const port = process.env.PORT || 8080
app.set("view engine", "ejs");
app.set("view engine", "hbs");
app.get('/', async (req, res) => {
    res.render('search.hbs');
})


require('dotenv').config()

const api = process.env.API_KEY
app.listen(port, () => {
    console.log('Server is running')
})


app.get("/results", async function (req, res) {
    var key = req.query.search;
    // console.log(key)
    const realkey = key.replace(/\s/g, '-')
    // console.log(realkey)

    const countryname = key.toUpperCase()
    var url = ("https://api.covid19api.com/country/" + realkey + "/status/confirmed/live");


    if (key.toLowerCase() === 'united states of america') {
        // const response2 = await got('https://api.covid19api.com/live/country/united%20states%20of%20america/status/confirmed')




        // // console.log(url)
        // var cases = []
        // var data2 = JSON.parse(response2.body)
        // // console.log(typeof (data))
        // taarik = []
        // console.log(data2)
        // data2.forEach(element => {
        //     taarik.push(element.Province)
        //     cases.push(element.Confirmed);
        // });

        // //console.log(deaths, active, recovered)

        // res.render('results', {
        //     cases,
        //     taarik,
        //     deaths,
        //     active,
        //     recovered
        // })
        res.send("USA Data is not provided by api")

    } else {

        // console.log(url)
        var cases = []
        // console.log(typeof (cases))
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

        var len = cases.length
        // console.log(cases[len-1])
        const total = cases[len - 1]
        // console.log(total)
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
            recovered,
            total,
            countryname

        })

        // console.log(taarik, cases)
    }
})

app.get('/statewise', async (req, res) => {
    var req = unirest("GET", "https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise");
    var statedata = [];
    var statename = [];
    req.headers({
        "x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
        "x-rapidapi-key": api
    });


    req.end(function (response) {
        if (response.error) throw new Error(response.error);

        const arr = response.body;
        arr.forEach(element => {
            statedata.push(element.cases);
            statename.push(element.name)
        });
        //console.log(statename)
        //console.log(Math.min(...statedata))
        //console.log(Math.max(...statedata))
        var total = 0
        // console.log(statedata)
        // statedata.forEach((element) => {
        //     total += parseInt(element)
        //     console.log(total)
        // })

        for (let i = 0;
            (i < statedata.length - 1); i++) {
            total += parseInt(statedata[i])
        }

        console.log(total)

        res.render('statesresults.hbs', {
            statedata: statedata,
            statename: statename,
            total
        })
    });

})