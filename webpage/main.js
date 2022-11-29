function pushStartButton(){
    let logo = document.getElementById("logo")
    let intro = document.getElementById("intro");
    let startButton = document.getElementById("startButton");
    


    intro.remove();
    startButton.remove();
}

let time;
function getTime(){
    let timeList = document.getElementsByName("time");
    for(let i=0; i<timeList.length; i++){
        if(timeList[i].checked) time = timeList[i].value;
    }
}

let price;
function getPrice(){
    let priceList = document.getElementsByName("price");
    for(let i=0; i<priceList.length; i++){
        if(priceList[i].checked) price = priceList[i].value;
    }
}
