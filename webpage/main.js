function pushStartButton(){
    //let logo = document.getElementById("logo")
    let intro = document.getElementById("intro");
    let startButton = document.getElementById("startButton");
    let research = document.getElementById("condition");

    intro.remove();
    startButton.remove();

    research.innerHTML = `
    <form action ="/random" method ="post"> 
    <h3>딱 두 가지 질문에만 대답해보세요.</div>
    <h2>식사 시간은 얼마나 있나요?</h2>
    <input type="radio" name="time" value=0 checked> 1시간 이상
    <input type="radio" name="time" value=1> 2시간 이상

    <h2>가격은 얼마가 좋을까요?</h2>
    <input type="radio" name="price" value=0 checked> 6000원 이하
    <input type="radio" name="price" value=1> 9000원 이하
    <input type="radio" name="price" value=2> 9000원 초과
    <br><br>
    <input type = "image" src="image/SearchButton_2.png" style="width:300px; height: 60px;">
    </form>`
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
