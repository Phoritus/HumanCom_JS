const MARGIN = { LEFT: 190, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

let flag = true

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 100)
  .attr("font-size", "25px")
  .attr("text-anchor", "middle")
  .text("Month")

// Y label
const yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -100)
  .attr("font-size", "25px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")

const x = d3.scaleBand()
  .range([0, WIDTH])
  .paddingInner(0.3)
  .paddingOuter(0.2)

const y = d3.scaleLinear()
  .range([HEIGHT, 0])

const xAxisGroup = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)

const yAxisGroup = g.append("g")
  .attr("class", "y axis")

d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {
    d.revenue = Number(d.revenue)
    d.profit = Number(d.profit)
  })

  console.log(data)

  d3.interval(() => {
    flag = !flag
    update(data)
  }, 1000)

  update(data)
})

function update(data) {
  const value = flag ? "profit" : "revenue"

  x.domain(data.map(d => d.month))
  y.domain([0, d3.max(data, d => d[value])])

  const xAxisCall = d3.axisBottom(x)
  xAxisGroup.call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")
      .attr("font-size", "16px")  
      .attr("font-weight", "regular"); 

  const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + "m")
  yAxisGroup.call(yAxisCall)
  .selectAll("text")
      .attr("font-size", "14px")
      .attr("font-weight", "regular");

  // JOIN new data with old elements.
  const circles = g.selectAll("circle")
    .data(data)

  // EXIT old elements not present in new data.
  circles.exit().remove()

  // UPDATE old elements present in new data.
  circles
    .attr("cy", d => y(d[value]))
    .attr("cx", (d) => x(d.month) + x.bandwidth() / 2)
    .attr("r", 6.5)

  // ENTER new elements present in new data.  
  circles.enter().append("circle")
    .attr("cy", d => y(d[value]))
    .attr("cx", (d) => x(d.month) + x.bandwidth() / 2)
    .attr("r", 6.5)
    .attr("fill", "green")

  const text = flag ? "Profit ($)" : "Revenue ($)"
  yLabel.text(text)
}
