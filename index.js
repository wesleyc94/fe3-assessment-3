//Gebaseerd op code van https://bl.ocks.org/mbostock/3885304 van Mike Bostocks, 
//ook met hulp van https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/axis van Titus Wormer. (Werkcolleges + Lesmateriaal)
//De data komt van de CBS, Centraal Bureau voor Statistiek. Orginele link naar dataset: http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82044eng&D1=1,12&D2=1-10&D3=0-9,13-17&LA=EN&HDR=T&STB=G1,G2&VW=T
//De dataset die ik heb gebruikt is http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82044eng&D1=1,12&D2=1&D3=0-9,13-17&LA=EN&HDR=T&STB=G1,G2&VW=T

//Hier worden de details beschreven van het grafiek / canvas. Als het ware de dimensies selecteren en de grootte bepalen.
var margin = { top: 20, right: 20, bottom: 30, left: 100 },
    width = 550 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Ik maak hier een variabel svg aan die een nieuwe svg aanmaakt in de body. Hiermee geef ik verischillende attributen aan zoals de breedte en de hoogte.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Hieronder worden de grootte van de kaart in kaart gebracht door middel van de scaleBand functie.
var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);
// Met scaleLieaner worden de ranges bepaald van het grafiek.
var y = d3.scaleLinear()
    .range([height, 0]);
//De Axes worden hier gedefineerd zodat d3 die vervolgens kan gebruiken om een referentie te geven aan de scales.
var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)

// Ik defineer hier dezelfde delen voor een tweede svg.
var margin2 = { top: 20, right: 20, bottom: 30, left: 100 },
    width2 = 550 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;
// Ik defineer hier dezelfde delen voor een tweede svg. Ook hier geef ik verschillende attributen aan mee
var svg2 = d3.select("body").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// Hier geef ik ook de x en y schalen aan voorhet tweede grafiek
var x2 = d3.scaleBand()
    .rangeRound([0, width2])
    .padding(0.1);
var y2 = d3.scaleLinear()
    .range([height2, 0]);
// De Axes van de tweede grafiek worden hier gedefineerd zodat d3 die vervolgens kan gebruiken.
var xAxis2 = d3.axisBottom(x2)
var yAxis2 = d3.axisLeft(y)

//De ruwe data komt uit het index.txt bestand. De ruwe data is vervolgens weer gecleaned door het goed te parsen, door een stuk weg te knippen, 
// niet zo zeer een echte inleiding maar wel regels die boven de data staat. In de data worden punt komma's vervangen door kommas zodat deze gelezen worden.
d3.text('index.txt')
    .mimeType('text/plain;charset=iso88591')
    .get(onload);

//In dit gedeelte maak ik de data schoon door de header te laten zoeken naar het stukje "Less".
//Bij de footer zoek ik naar het woord statistics en haal ik de 4 vier letters die ervoor staan eruit, dit betreft het copyright teken.
function onload(err, doc) {
    if (err) {
        throw err
    }
    var header = doc.indexOf('"Less')
    var footer = doc.indexOf('Statistics') - 4
    doc = doc.substring(header, footer).trim()
    //
    var data = d3.csvParseRows(doc, map)

    // In de map functie verander ik waardes van strings naar nummers. Ik constructueer een map aan waarin labels worden aangegeven aan de waardes. 
    function map(d) {
        return {
            year: Number(d[1]),
            cars: Number(d[2]),
            motor: Number(d[3]),
            total: Number(d[2]) + Number(d[3])
        }
    }
    //Bij dit stukje worden de range van de data aangepast. De x as gaan over jaren en de y over het totaal
    x.domain(data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de X as.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de Y as.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text");

    //In dit gedeelte worden alle bar elementen geselecteerd en attributen meegegeven.
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.total); })
        .attr("height", function(d) { return height - y(d.total); });
    // Hier maak ik nieuwe lege arrays aan die ik ga opvullen met de nieuwe data en de nieuwe jaartallen als label in de tweede grafiek. Voor elk nieuwe waarde push ik een nieuwe waarde in de data.
    var data2 = [];
    var years = [];
    var year = '';
    data.forEach(function(d) {
        years.push(d.year);
    })
    year = years[0];
    data2 = data.filter(filterYear);

//Ik maak hier nieuwe objecten aan voor een Object Cars en Motor, deze data wil ik het tweede grafiek tonen en wil ik de waardes hierin pushen.
    var carsObject = {};
    var motorObject = {};
    var newData = [];
//Ik maak een nieuwe name aan die gelijk is aan cars, de number van cars is hetzelfde aan cars die in de data zit, deze push ik vervolgens in het object. Dit doe ik ook voor het motor object.
    carsObject["name"] = "cars";
    carsObject["number"] = data2[0].cars;
    motorObject["name"] = "motor";
    motorObject["number"] = data2[0].motor;
    newData.push(carsObject);
    newData.push(motorObject);

//Ik defineer hier de domeinen voor de tweede grafiek.
    x2.domain(newData.map(function(d) { return d.name; }));
    y2.domain([0, d3.max(data, function(d) { return d.total; })]);

    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de X as.
    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);
    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de Y as.
    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis2)
        .append("text");

    //In dit gedeelte worden alle bar elementen geselecteerd en attributen meegegeven.
    svg2.selectAll(".bar")
        .data(newData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x2(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y2(d.number); })
        .attr("height", function(d) { return height2 - y(d.number); });

    //Na het selecteren van de checkbox ontstaat er een timeout van 2 seconden.
    var sortTimeout = setTimeout(function() {
        d3.select("input").property("checked", true).each(change);
    }, 2000);
    //Met deze regel geef ik een eventlistener mee op de input. 
    d3.select("input").on("change", change);

// De code is oorsponkelijk van Titus Wormer en heb ik bestudeerd om zo goed mogelijk te begrijpen wat er precies gebeurt na het klikken op het input element.
// Deze change functie sorteert de data wanneer er op het input element geklikt is, het berekent de waardes uit number en zet laagste aan de rechterkant. Hiermee pakt die ook het jaartal mee.
    function change() {
        clearTimeout(sortTimeout);

        var x0 = x.domain(data.sort(this.checked ?
                    function(a, b) { return b.number - a.number; } :
                    function(a, b) { return d3.ascending(b.year, a.year); })
                .map(function(d) { return d.year; }))
            .copy();
        //Met selectAll worden alle elementen met de bar class geselecteert en opnieuw gesorteerd. Deze keer sorteert het naar de andere kant.
        svg.selectAll(".bar")
            .sort(function(a, b) { return x0(a.number) - x0(b.number); });
        // De transitie die meegegeven word heeft een duratie van 0,75seconden. De vertraging die ontstaat is van  de i is de index en berekent de stapje van het element.
        var transition = svg.transition().duration(750),
            delay = function(d, i) { return i * 50; };
        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) { return x0(d.year); });
        //Ook bij de xAxis worden alle elementen opnieuw op de juiste plek gezet.
        transition.select(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
    };

// Met deze regel geef ik een click event aan op alle bar elementen.
    d3.selectAll(".bar").on("click", onChange);
// De onchange functie gebeurt tijdens het click event op de bar element, 
// het controleert het jaartal of het correct is en geeft op een geklikte bar element een active class mee.
    function onChange(a) {
        year = a.year;
        this.classList.add("active");
        data2 = [];
        newData = [];
        data2 = data.filter(filterYear);
        carsObject["name"] = "cars";
        carsObject["number"] = data2[0].cars;
        motorObject["name"] = "motor";
        motorObject["number"] = data2[0].motor;
        newData.push(carsObject);
        newData.push(motorObject);

// In dit gedeelte maak ik een nieuwe variabel aan voor de transitie om de bar elementen te wijzigen, tijdens de transitie worden de attributen bekeken en aangepast op de waardes.  
        var movingBar = svg2.selectAll(".bar")
            .data(newData);
        movingBar.transition().duration(750)
            .attr("class", "bar")
            .attr("x", function(d) {
                return x2(d.name);
            })
            .attr("y", function(d) {
                return y2(d.number);
            })
            .attr("width", x2.bandwidth())
            .attr("height", function(d) {
                return height2 - y2(d.number);
            });
    }
// Hier maak ik een functie filterYear aan om te controleren of het jaartal overeenkomt met het juiste jaartal uit de data.
    function filterYear(d) {
        return (d.year === year)
    }

};