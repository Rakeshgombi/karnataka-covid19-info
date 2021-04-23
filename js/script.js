setInterval(() => {
  let time = new Date()
  document.getElementById("time").innerHTML = `as of ${time.getDay()}-${time.getMonth()}-${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.covid19india.org/state_district_wise.json", requestOptions)
  .then(response => response.json())
  .then(result =>{
    let distData = result["Karnataka"]["districtData"];
    // console.log(dist);
    let state = document.getElementById("state");
    state.innerHTML = ""
    var stateTotal = 0;
    for (var key in distData){
      let distTotal = distData[key]['active']+distData[key]['confirmed']+distData[key]['deceased']+distData[key]['recovered']
      stateTotal = stateTotal + distTotal
      let dist = document.createElement('div')
      dist.classList.add('districts')
      dist.innerHTML = `
      <div class="district"><p>${key}</p><p class="distTotal">Total: ${distTotal}</p></div>
      <div class="case-container">
      <p class="active"><span class="">Active: </span>${distData[key]['active']}</p>
      <p class="confirmed"><span class="">Confirmed: </span>${distData[key]['confirmed']}</p>
      <p class="recovered"><span cla
        padding: 5px;ss="">Recovered: </span>${distData[key]['recovered']}</p>
      <p class="deceased"><span class="">Deceased: </span>${distData[key]['deceased']}</p>
      </div>
      `
      
      state.appendChild(dist)
    
    }
    document.getElementById("stateTotal").innerHTML = "Total: " + stateTotal
    })
  .catch(error => console.log('error', error));
console.log("helo");
}, 1000);