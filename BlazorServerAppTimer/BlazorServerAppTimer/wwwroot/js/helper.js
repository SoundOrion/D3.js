window.myD3Helper = {
    setup: function (xvalues, yvalues, zvalues) {

        // set the dimensions and margins of the graph
        const margin = { top: 30, right: 30, bottom: 30, left: 30 },
            width = 100 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // remove
        d3.select("#my_dataviz").selectAll("svg").remove();

        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        //// range generator
        //function* range(start, end) {
        //    yield start;
        //    if (start === end) return;
        //    yield* range(start + 1, end);
        //}

        // Build X scales and axis:
        const x = d3.scaleBand()
            .range([0, width])
            .domain(xvalues)
            .padding(0.1);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))

        // Build Y scales and axis:
        const y = d3.scaleBand()
            .range([height, 0])
            .domain(yvalues)
            .padding(0.1);
        svg.append("g")
            .call(d3.axisLeft(y));

        //// Build color scale
        //const myColor = d3.scaleLinear()
        //    .range(["white", "#69b3a2"])
        //    .domain([0, 100])

        const myColor = d3.scaleLinear()
            .domain([0, 50, 100])
            .range(["white", "green", "red"]);

        // create a tooltip
        const tooltip = d3.select("#my_dataviz")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function (event, d) {
            tooltip.style("opacity", 1)
        }
        const mousemove = function (event, d) {
            tooltip
                .html("The exact value of<br>this cell is: " + d.value)
                .style("left", (event.x) / 2 + "px")
                .style("top", (event.y) / 2 + "px")
        }
        const mouseleave = function (d) {
            tooltip.style("opacity", 0)
        }

        //Read the data
        const data = zvalues;
        //const data = [46, 79, 45, 39, 14, 3, 44, 46, 79, 45, 39, 14, 3, 44, 46, 79, 45, 39, 14, 3, 44, 46, 79, 45, 39, 14, 3, 44, 62, 82, 13, 47, 52, 22, 68, 36, 44, 95, 23, 68, 13, 9, 7, 63, 27, 49, 4, 48, 65, 44, 44, 34, 36, 58, 58, 76, 18, 53, 79, 56, 55, 42, 74, 76, 71, 2, 0, 17, 45, 72, 0, 96, 11, 80, 50, 75, 39, 16, 18, 89, 10, 54, 78, 17, 38, 78, 11, 94, 63, 92, 17, 91, 16, 67, 12, 70, 34, 30, 91, 24, 49, 86, 3, 92, 44, 47, 23, 56, 8, 83, 37, 2, 34, 89, 45, 0, 63, 57, 38, 92, 91];

        svg.selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return x(Math.floor(i / yvalues.length)) })
            .attr("y", function (d, i) { return y(i % yvalues.length) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d) })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
    },
    remove: function () {
        d3.select("#my_dataviz").selectAll("svg")
            .remove();
    },
};