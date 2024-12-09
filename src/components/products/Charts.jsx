import React, { useEffect, useState } from 'react';
import style from './charts.module.css'
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fromUnixTime, format, eachDayOfInterval, subDays, subMonths, subYears } from 'date-fns';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const soldItems = JSON.parse(localStorage.getItem('purchasedItems'))
  const datas = soldItems.map(product =>({
    price: parseFloat(product.price) * parseFloat(product.quantity),
    timestamp: format(fromUnixTime(product.timestamp/1000), 'LLL')
    }))
    .sort((a,b) => b.timestamp - a.timestamp)
  const [filterDate, setFilterDate] = useState('months')
  const [datasTime, setDatasTime] = useState([])
  const [filterName, setFilterName] = useState('Last 12 months')
  const [viewPieChart, setViewPieChart] = useState('line')
  
  let last30Days =  
  eachDayOfInterval({
    start: subDays(new Date(), 30), 
    end: new Date()})
  .map((day)=>
    format(day, 'd LLL')
  )
  let last10Years = []
  for(let i = 0; i <= 10; i++ ){
    let year = parseInt(format(new Date(), 'yyyy')-10) + i
    last10Years.push(year)
  }
  let last12Months = []
  for(let i = 0; i < 12; i++ ){
    let month = subMonths(new Date(), i)
    let monthName = format(month, 'MMM')
    last12Months.unshift(monthName)
  }

  useEffect(() => {
    switch (filterDate) {
      case 'days':
        const datasDays = soldItems.map(product =>({
          price: parseFloat(product.price) * parseFloat(product.quantity),
          timestamp: format(fromUnixTime(product.timestamp/1000), 'd LLL')
        }))
        .sort((a,b) => b.timestamp - a.timestamp)
        let arraysDays = Array.from({length: 30}, ()=> 0)
        for(let i = 0; i < last30Days.length; i++){
          const matchingData = datasDays.filter(data => data.timestamp === last30Days[i])
          matchingData.forEach(data => {
            arraysDays[i] += parseFloat(data.price)}
          )
        }
        setDatasTime(arraysDays)
        break;
      case 'months':
        let arraysMonths = Array.from({ length: 12 }, () => 0);
          datas.forEach((data) => {
            switch (data.timestamp) {
              case last12Months[0]:
                arraysMonths[0] += parseFloat(data.price)
                break;
              case last12Months[1]:
                arraysMonths[1] += parseFloat(data.price)
                break;
              case last12Months[2]:
                arraysMonths[2] += parseFloat(data.price)
                break;
              case last12Months[3]:
                arraysMonths[3] += parseFloat(data.price)
                break;
              case last12Months[4]:
                arraysMonths[4] += parseFloat(data.price)
                break;
              case last12Months[5]:
                arraysMonths[5] += parseFloat(data.price)
                break;
              case last12Months[6]:
                arraysMonths[6] += parseFloat(data.price)
                break;
              case last12Months[7]:
                arraysMonths[7] += parseFloat(data.price)
                break;
              case last12Months[8]:
                arraysMonths[8] += parseFloat(data.price)
                break;
              case last12Months[9]:
                arraysMonths[9] += parseFloat(data.price)
                break;
              case last12Months[10]:
                arraysMonths[10] += parseFloat(data.price)
                break;
              case last12Months[11]:
              arraysMonths[11] += parseFloat(data.price)
              break;
              default:
                break;
            }
            }
          )
      setDatasTime(arraysMonths)
        break;
      case 'years':  
      const datasYears = soldItems.map(product =>({
        price: parseFloat(product.price) * parseFloat(product.quantity),
        timestamp: format(fromUnixTime(product.timestamp/1000), 'yyyy')
      }))
      .sort((a,b) => b.timestamp - a.timestamp)
      let arrayYears = Array.from({ length: last10Years.length }, () => 0);
      for(let i = 0; i < last10Years.length; i ++){
        const matchingYears = datasYears.filter(data => parseInt(data.timestamp) === parseInt(last10Years[i]))
        matchingYears.forEach(data =>{
            arrayYears[i] += parseFloat(data.price)
        })
      }
        setDatasTime(arrayYears)
        break;
      default:
        break;
    }
  }, [filterDate]);

  let labels = () => {
    switch (filterDate) {
      case 'days':
        return last30Days;     
      case 'months':
        return last12Months;
      case 'years':
        return last10Years;
      default:
        break;
  }}
  const data = {
    labels: labels(),
    datasets: [
      {
        label: filterName,
        data: datasTime,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(75, 192, 192, 1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(75, 192, 192, 1)',
        },
      },
    },
  };

  let colors = [
    "red", 
    "green", 
    "blue", 
    "yellow", 
    "orange", 
    "purple", 
    "pink", 
    "brown", 
    "grey", 
    "black", 
    "white", 
    "cyan", 
    "magenta", 
    "lime", 
    "indigo", 
    "violet", 
    "teal", 
    "maroon", 
    "olive", 
    "navy"
  ]

  let labelsIdPie = Array.from(new Set(soldItems.map(product => product.id)))
  let labelsTitlePie = Array.from(new Set(soldItems.map(product => product.name)))
  let productsPriceReduced = Array.from({length: labelsIdPie.length}, ()=> 0)
  const splicedColors = colors.splice(labelsIdPie.length,labelsIdPie.length)
  for(let i = 0; i < labelsIdPie.length; i++){
    let dataToAdd = soldItems
    .filter(product => product.id === labelsIdPie[i])
    .reduce((a,b)=> a + parseFloat(b.price*b.quantity), 0)
    productsPriceReduced[i] = dataToAdd
  }

  const pieData = { labels: labelsTitlePie,
  datasets: [{
    label: 'Total income',
    data: productsPriceReduced,
    backgroundColor: splicedColors,
    hoverOffset: 4
  }]}

  function handleFilterData (e){
    setFilterDate(e.target.value)
    setFilterName(e.target.selectedOptions[0].innerText)
  }

  function handleChangeTypeChart(e){
    setViewPieChart(e.target.value)
  }

  return (
    <div>
      <div className={style.headerContainer}>
        <h2>Chart of sold items</h2>
        {
          viewPieChart === 'line' &&
        <label>
          Filter by: {' '}
          <select onChange={handleFilterData} value={filterDate}>
            <option value={'days'}>Last 30 days</option>
            <option value={'months'}>Last 12 months</option>
            <option value={'years'}>Last 10 years</option>
          </select>
        </label>
        }
        <label>
          Select Chart type
            <select value={viewPieChart} onChange={handleChangeTypeChart}>
              <option value={'line'}>Line chart</option>
              <option value={'pie'}>Pie chart</option>
            </select>
        </label>
      </div>
      <div className={style.chart}>
        {
          viewPieChart === 'line' ?
        <Line data={data} options={options} />
        :
        <Pie data={pieData}/>
        }
      </div>
    </div>
  );
};

export default Chart;
