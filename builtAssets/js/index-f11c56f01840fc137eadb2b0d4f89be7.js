(function(){console.log("blabla !!!!",this["this"])}).call(this),console.log("tester");var ejs=require("ejs"),dat=!1,layout=function(a){return ejs.render("<h1>"+a+" <%- foo %></h1>",dat)},layoutUpdate=function(a,b){dat=b,document.body.innerHTML=ejs.render(a,b)}