

let table = document.querySelector('table');
let tbody = document.querySelector('tbody');
let body = document.querySelector('body');

function shema(a, b, c) {
  Highcharts.chart('container', {

    title: {
        text: 'Показатели за период',
        align: 'left'
    },

    subtitle: {
        text: '',
        align: 'left'
    },

    yAxis: {
        title: {
            text: 'Показатель руб.'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2020'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2011
        }
    },

    series: [{
        name: '',
        data: [a, b, c]
    }, ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

  });
}

async function dataGet() {
  tbody.innerHTML = null
  try {
    const response = await fetch(`./data.json`);
    const data = await response.json();
    // console.log(data);
    addTable(data)
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
dataGet();




function addTable(items) {
  for (let item of items) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.textContent = item.index;
    tr.appendChild(td1);

    let td2 = document.createElement('td');
    td2.textContent = item.today;
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p1.textContent = item.yesterday;
    p2.textContent = item.percent;
    
    td3.appendChild(p1);
    td3.appendChild(p2);
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    td4.textContent = item.day;
    tr.appendChild(td4);

    if(parseInt(item.percent) > 9){
      p2.style.color = 'green';
      td3.style.backgroundColor = '#e4f5e8';
      td4.style.backgroundColor = '#e4f5e8';
      td1.style.backgroundColor = '#f5f3f3';
    }
    if(parseInt(item.percent) < -9){
      td3.style.backgroundColor = '#f5baba'
    }
    
    tbody.appendChild(tr);
    
    
    tr.addEventListener('click', (e) => {
      e.stopPropagation()
      open = false;
        shema(item.today, item.yesterday, item.day);

    })
  }
}

body.addEventListener('click', () => {
  location.reload()
})




