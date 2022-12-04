const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { request, response } = require('express');
const PORT = 52272;

// 서버를 생성/실행합니다.
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.static('webpage'));
app.set("view engine", ejs);

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

let result = '';


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
        lunch_time = 'distance > 12 and distance < 30'
        if(p == 0){lunch_price = 'price <= 6000'}//2시간 이상 & 6000원 이하
        else if(p == 1){lunch_price = 'price <= 9000'}//2시간 이상 & 9000원 이하
        else if(p == 2){lunch_price = 'price > 9000'}//2시간 이상 & 9000원 초과
    }

    let sql = 'select distinct r.rest_name from (select * from restaurant where ' + lunch_time + ') as r, (select * from menu where ' + lunch_price + ') as m where r.rest_name = m.rest_name';
    //let result = ''
    let outcome =[]; 
    connection.query(sql, function(err, results, fields){
        if(err){
            console.error('error connecting: ' + err.stack);
        }
        let rand = Math.floor(Math.random() * results.length);
        result = results[rand]['rest_name'];
        response.redirect("/introduction");
    })
});

app.get("/introduction", function(request, response){
    /*
    let t = request.body.time;
    let p = request.body.price;
    let lunch_time ='';
    let lunch_price ='';
    //console.log('lunch time is ' + t);
    //console.log('lunch price is ' + p);
    if(t == 0){
        lunch_time = 'distance <= 12'
        if(p == 0){lunch_price = 'price <= 6000'}//1시간 이상 & 6000원 이하
        else if(p == 1){lunch_price = 'price <= 9000'}//1시간 이상 & 9000원 이하
        else if(p == 2){lunch_price = 'price > 9000'}//1시간 이상 & 9000원 초과
    }
    else if(t ==  1){
        lunch_time = 'distance > 12 and distance < 30'
        if(p == 0){lunch_price = 'price <= 6000'}//2시간 이상 & 6000원 이하
        else if(p == 1){lunch_price = 'price <= 9000'}//2시간 이상 & 9000원 이하
        else if(p == 2){lunch_price = 'price > 9000'}//2시간 이상 & 9000원 초과
    }
    

    //if(connection.state == 'disconnected'){connection.connect();}
    let sql = 'select distinct r.rest_name from (select * from restaurant where ' + lunch_time + ') as r, (select * from menu where ' + lunch_price + ') as m where r.rest_name = m.rest_name';
    //let result = ''
    
    connection.query(sql, function(err, results, fields){
        if(err){
            console.error('error connecting: ' + err.stack);
        }
        let rand = Math.floor(Math.random() * results.length);
        result = results[rand]['rest_name'];
        //response.send(result);
    })
    */
        let outcome =[]; 

        sql = 'select * from restaurant where rest_name = "' + result + '"';//resaurant table 가져오기
        connection.query(sql, function(err, results, fields){
            if(err){
                console.error('error connecting: ' + err.stack);
            }
            //response.send(results);
            outcome[0] = results[0];
            //response.render(__dirname + "/webpage/introduction.ejs", {data : results});
        })

        let j =0;
        sql = 'select * from menu where rest_name = "' + result + '"';//menu table 가져오기
        connection.query(sql, function(err, results, fields){
            if(err){
                console.error('error connecting: ' + err.stack);
            }
            for(let i=0;i<results.length;i++){
                if(results[i] == null) break;
                outcome[i+1] = results[i];
                j++;
            }
            //response.send(outcome);
            //response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});
        })

        sql = 'select * from review where rest_name = "' + result + '"';//review table 가져오기
        connection.query(sql, function(err, results, fields){
            if(err){
                console.error('error connecting: ' + err.stack);
            }
            for(let i=0; i<results.length; i++){
                if(results[i] == null) break;
                outcome[j+1] = results[i];
                j++;
            }
            //response.send(outcome);
            //response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});
        })

        sql = 'select * from comment where rest_name = "' + result + '"';
        connection.query(sql, function(err, results, fields){
            if(err){console.error('error connecting: ' + err.stack);}
            for(let i=0; i<results.length; i++){
                if(results[i] == null) break;
                outcome[j+1] = results[i];
                j++;
            }
            //response.send(outcome);
            response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});
        })
    

    //if(connection.state == 'authenticated'){connection.end();}
});
/*
app.post("/lntroduction", function(request, response){
    let outcome =[];
    for(let q=0; q<outcome.length;q++){outcome.pop()}

    sql = 'select * from restaurant where rest_name = "' + result + '"';//resaurant table 가져오기
    connection.query(sql, function(err, results, fields){
        if(err){
            console.error('error connecting: ' + err.stack);
        }
        //response.send(results);
        outcome[0] = results[0];
        //response.render(__dirname + "/webpage/introduction.ejs", {data : results});
    })

    let j =0;
    sql = 'select * from menu where rest_name = "' + result + '"';//menu table 가져오기
    connection.query(sql, function(err, results, fields){
        if(err){
            console.error('error connecting: ' + err.stack);
        }
        for(let i=0;i<results.length;i++){
            if(results[i] == null) break;
            outcome[i+1] = results[i];
            j++;
        }
        //response.send(outcome);
        //response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});
    })

    sql = 'select * from review where rest_name = "' + result + '"';//review table 가져오기
    connection.query(sql, function(err, results, fields){
        if(err){
            console.error('error connecting: ' + err.stack);
        }
        for(let i=0; i<results.length; i++){
            if(results[i] == null) break;
            outcome[j+1] = results[i];
            j++;
        }
        //response.send(outcome);
        //response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});
    })

    sql = 'select * from comment where rest_name = "' + result + '"';
    connection.query(sql, function(err, results, fields){
        if(err){console.error('error connecting: ' + err.stack);}
        for(let i=0; i<results.length; i++){
            if(results[i] == null) break;
            outcome[j+1] = results[i];
            j++;
        }

        //response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});
    })
    response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});

    //response.render(__dirname + "/webpage/introduction.ejs", {data : outcome})
});
*/

app.post("/comment", function(request, response){
    
    connection.query('insert into comment (rest_name, user_id, comment_text) values (?, ?, ?)',[request.body.rest_name,request.body.name,request.body.text] , function(err, results, fields){
        if(err){console.error('error connecting: ' + err.stack);}

        /*sql = 'select * from comment where rest_name = "' + result + '"';
        connection.query(sql, function(err, results, fields){
            if(err){console.error('error connecting: ' + err.stack);}
            for(let i=0; i<results.length; i++){
                if(results[i] == null) break;
                outcome[j+1] = results[i];
                j++;
            }
        })
        response.render(__dirname + "/webpage/introduction.ejs", {data : outcome});*/

        response.redirect("/lntroduction");
    })
});

app.all('*', (request, response) => {
    response.status(404).send("Error 404. 찾을 수 없는 페이지입니다.")
});