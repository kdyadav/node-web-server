const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = new express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log  = `${now} ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
            console.log("Can not log into the file")
    });
    next();
});
app.use((req,res)=>{
    res.render('maintainace.hbs');
})
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:"Home Us",
        currentYear:new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:"About Us",
        currentYear:new Date().getFullYear()
    });
});


app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});