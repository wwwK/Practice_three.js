// let scrollLength = document.querySelector('body').getClientRects().height - window.innerHeight;

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = window.innerWidth*2 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    console.log(i(0));
    return function(t) { return i(t) };
}

function transition(path) {
    path.transition()
        .duration(7500)
        .attrTween("stroke-dasharray", tweenDash)
        .on("end", () => path.call(transition));
}

function render() {
    console.log(window.pageYOffset);
    // path.attr('stroke-dasharray', calculateLength);

    window.requestAnimationFrame(render);
}

// window.requestAnimationFrame(render);


//Read the data
d3.csv("./AAPL.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.Date), close : d.Close }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.close; })])
      .range([ height, 0 ]);
    svg.append("g")
      .attr('fill', 'gray')
      .call(d3.axisLeft(y));


    // Add the line
    let path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.close) })
        )
        .attr('opacity', 0);
    //    .attr('stroke-dasharray', '15 ,1763.913818359375');

       let strokeValue = d3.interpolateString("0," + path.node().getTotalLength(), path.node().getTotalLength() + "," + path.node().getTotalLength());
       console.log(strokeValue(0.9));

       let calc = d3.interpolateNumber(0, width - width/4);

       let wholeHeight = window.innerHeight * 3;

       const container = document.querySelector('body');

       let translateVal = 0;
       container.addEventListener('wheel', function(event) {
           if (window.pageYOffset - window.innerHeight*3 > 0) {
                path.attr('opacity', 1)
                .attr('stroke-dasharray', strokeValue((window.pageYOffset - window.innerHeight*3)/wholeHeight));

            svg
                .transition()
                .duration(300)
                .attr('transform', 'translate(' + (60-calc((window.pageYOffset - window.innerHeight*3)/wholeHeight)) + ', 0)');
                
                console.log(calc(window.pageYOffset/wholeHeight))
                console.log(width - width/2)
           } 
           console.log(window.pageYOffset - window.innerHeight*2);
          
        //    console.log(calc(window.pageYOffset/wholeHeight));
        })

        // container.onscroll = function() {
        //     // console.log('scroll event')
        //     // console.log(calc(window.pageYOffset/wholeHeight));
        //     path.attr('stroke-dasharray', strokeValue(window.pageYOffset/wholeHeight));
        //     svg
        //     .attr('transform', 'translate(' + (60-calc(window.pageYOffset/wholeHeight)) + ', 0)');
        // }

})