const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { request, response } = require('express');
const PORT = 52273;

// 서버를 생성/실행합니다.
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.static('webpage'));
//app.set("view engine", ejs);

const connection = mysql.createConnection({// mysql 연동
	host     : 'localhost',
	user     : 'test',
	password : '1q2w3e4r',
	database : 'l_tech'
});

app.listen(PORT, () => {
    console.log('Server Running at http://127.0.0.1:' + PORT);
});

app.get("/", function(request, response){
    response.sendFile(__dirname + "/webpage/main.html")
});

app.post("/random", function(request, response){
    let t = request.body.time;
    let p = request.body.price;
    let lunch_time ='';
    let lunch_price ='';
    console.log('lunch time is ' + t);
    console.log('lunch price is ' + p);
    if(t == 0){
        lunch_time = 'distance <= 12'
        if(p == 0){lunch_price = 'price <= 6000'}//1시간 이상 & 6000원 이하
        else if(p == 1){lunch_price = 'price <= 9000'}//1시간 이상 & 9000원 이하
        else if(p == 2){lunch_price = 'price > 9000'}//1시간 이상 & 9000원 초과
    }
    else if(t ==  1){
        lunch_time = 'distance > 12'
        if(p == 0){lunch_price = 'price <= 6000'}//2시간 이상 & 6000원 이하
        else if(p == 1){lunch_price = 'price <= 9000'}//2시간 이상 & 9000원 이하
        else if(p == 2){lunch_price = 'price > 9000'}//2시간 이상 & 9000원 초과
    }

    //if(connection.state == 'disconnected'){connection.connect();}
    let sql = 'select distinct r.rest_name from (select * from restaurant where ' + lunch_time + ') as r, (select * from menu where ' + lunch_price + ') as m where r.rest_name = m.rest_name';
    let result = ''
    connection.query(sql, function(err, results, fields){
        if(err){
            console.error('error connecting: ' + err.stack);
        }
        let rand = Math.floor(Math.random() * results.length);
        result = results[rand]['rest_name'];
        //response.send(result);

        sql = 'select * from restaurant where rest_name = "' + result + '"';
        connection.query(sql, function(err, results, fields){
            if(err){
                console.error('error connecting: ' + err.stack);
            }
            response.send(results);
        
        })
    })
    //if(connection.state == 'authenticated'){connection.end();}
});

app.get("/introduction", function(request, response){
    response.sendFile(__dirname + "/webpage/introduction.html")
});

app.all('*', (request, response) => {
    response.status(404).send("Error 404. 찾을 수 없는 페이지입니다.")
});