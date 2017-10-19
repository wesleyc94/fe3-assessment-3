# Assessment 3
Multiple interactive charts on the same page.

[![][cover]][url]

## Background
In this assessment we have to add interactivity to the visualisations. The data should be able to be explored through more than one visualisation. Before i started to code and working with the data I was first thinking about which data graph would be apropiate with the dataset I was gonna use. I've made some small sketches thinking about how I was gonna represent the data in a graph and also what kind of a graph. I've thought about creating a visualisation in a Bubble Chart, Stacked Bar Chart, Pie Chart and a Bar Chart. The last chart was appropiate for displaying the data in the chart. I was using variables years and number and it was helpful to get a clear insight on the differences yearly. The question: "How much vehicles are there in total yearly" could be answered here.

To make this chart interactive I tried to combine this into a Pie chart at first. Per year i wanted to show the differences between passenger cars and motorbycicles. In a pie chart it was possible to show the differences on a visual way how much % more cars there are comapred to the motors. I've spent lots of time to get this chart working but i was not able to. My JS knowledge failed me and had asked classmates but they couldnt figure it out aswell. This was my biggest struggle in this assessment. 

To make this chart interactive I've used a second bar chart and on every click event on a bar element the data will change on the second bar chart. When you click on the bar element you can see the the changes on passenger cars and motor vehicles. Next to this interaction it is also possible to sort the data with an input element.

## Data
The data that was used in this assessment is a dataset that comes from the CBS, Centraal Bureau voor Statistiek. While I was searching for an dataset i came across this dataset and on the first sight it looked very interesting to me and there could be found alot of insights from it. The title of this dataset is called: Motor vehicles by type and age. The dataset was found on the webpagepage Traffic and Transport of the CBS (https://www.cbs.nl/en-gb/society/traffic-and-transport). To refer to the original dataset the link could be found here: 
http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82044eng&D1=1,12&D2=1-10&D3=0-9,13-17&LA=EN&HDR=T&STB=G1,G2&VW=T. 

Within the original dataset I've filtered on a few things: By changing the selection on the top right i've deselected all Total road vehicles and commercial cars. The remaning options was passengers cars, motor vehicles and the period of 2010 to 2017 in years. Because there were too much data for me all at once i've ended up deselecting the classes aswell because i think there should be enough visualized for now. The link to the final dataset could be found here. http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82044eng&D1=1,12&D2=1&D3=0-9,13-17&LA=EN&HDR=T&STB=G1,G2&VW=T

The dataset is about motor vehicles sorted by every type, age, and class that has been registered. The data goes from 2010 to 2017 and could be filtered on many things. For example Passenger cars, motor vehicles, commercial cars, busses and many more. Because I think it is too much information all at once i've thought about the subjects that interested me the most. These are Passenger Cars, Motorcycles and the class of a vehicle. With the data I want to show the years of 2010 till 2017 and display the data in different ways. The data that has been visualized should tell the difference about motor vehicles per year but also how much difference there is between cars and motorcycles.


## Features
- [`d3.select`](https://github.com/d3/d3-selection/blob/master/README.md#select)
- [`d3.ScaleOrdinal`](https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal)
- [`d3.scaleBand`](https://github.com/d3/d3-scale/blob/master/README.md#scaleBand)
- [`d3.scaleLinear`](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear)
- [`d3.map`](https://github.com/d3/d3-collection/blob/master/README.md#map)
- [`d3.axis`](https://github.com/d3/d3-axis)
- [`d3.max`](https://github.com/d3/d3-array/blob/master/README.md#max)


## License
GPL-3.0 © Mike Bostock, Titus Wormer, Wesley Cheng.

[cover]: preview.png

[url]: https://wesleyc94.github.io/fe3-assessment-3/
