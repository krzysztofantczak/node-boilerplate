function require(a){if("fs"==a)return{};var b=require.resolve(a),c=require.modules[b];if(!c)throw new Error('failed to require "'+a+'"');return c.exports||(c.exports={},c.call(c.exports,c,c.exports,require.relative(b))),c.exports}(function(){console.log("blabla !!!!",this["this"])}).call(this),require.modules={},require.resolve=function(a){var b=a,c=a+".js",d=a+"/index.js";return require.modules[c]&&c||require.modules[d]&&d||b},require.register=function(a,b){require.modules[a]=b},require.relative=function(a){return function(b){if("."!=b.substr(0,1))return require(b);var c=a.split("/"),d=b.split("/");c.pop();for(var e=0;e<d.length;e++){var f=d[e];".."==f?c.pop():"."!=f&&c.push(f)}return require(c.join("/"))}},require.register("ejs.js",function(a,b,c){function h(a){return a.substr(1).split("|").reduce(function(a,b){var c=b.split(":"),d=c.shift(),e=c.shift()||"";return e&&(e=", "+e),"filters."+d+"("+a+e+")"})}function i(a,b,c,d){var e=b.split("\n"),f=Math.max(d-3,0),g=Math.min(e.length,d+3),h=e.slice(f,g).map(function(a,b){var c=b+f+1;return(c==d?" >> ":"    ")+c+"| "+a}).join("\n");throw a.path=c,a.message=(c||"ejs")+":"+d+"\n"+h+"\n\n"+a.message,a}var d=c("./utils"),e=c("fs");b.version="0.6.1";var f=b.filters=c("./filters"),g={};b.clearCache=function(){g={}};var j=b.parse=function(a,c){var c=c||{},d=c.open||b.open||"<%",e=c.close||b.close||"%>",f=["var buf = [];","\nwith (locals) {","\n  buf.push('"],g=1;for(var i=0,j=a.length;i<j;++i)if(a.slice(i,d.length+i)==d){i+=d.length;var k,l,m="__stack.lineno="+g;switch(a.substr(i,1)){case"=":k="', escape(("+m+", ",l=")), '",++i;break;case"-":k="', ("+m+", ",l="), '",++i;break;default:k="');"+m+";",l="; buf.push('"}var n=a.indexOf(e,i),o=a.substring(i,n),p=i,q=0;while(~(q=o.indexOf("\n",q)))q++,g++;o.substr(0,1)==":"&&(o=h(o)),f.push(k,o,l),i+=n-p+e.length-1}else a.substr(i,1)=="\\"?f.push("\\\\"):a.substr(i,1)=="'"?f.push("\\'"):a.substr(i,1)=="\r"?f.push(" "):a.substr(i,1)=="\n"?(f.push("\\n"),g++):f.push(a.substr(i,1));return f.push("');\n}\nreturn buf.join('');"),f.join("")},k=b.compile=function(a,c){c=c||{};var e=JSON.stringify(a),g=c.filename?JSON.stringify(c.filename):"undefined";a=["var __stack = { lineno: 1, input: "+e+", filename: "+g+" };",i.toString(),"try {",b.parse(a,c),"} catch (err) {","  rethrow(err, __stack.input, __stack.filename, __stack.lineno);","}"].join("\n"),c.debug&&console.log(a);var h=new Function("locals, filters, escape",a);return function(a){return h.call(this,a,f,d.escape)}};b.render=function(a,b){var c,b=b||{};if(b.cache)if(b.filename)c=g[b.filename]||(g[b.filename]=k(a,b));else throw new Error('"cache" option requires "filename".');else c=k(a,b);return b.__proto__=b.locals,c.call(b.scope,b)},b.renderFile=function(a,c,d){var f=a+":string";"function"==typeof c&&(d=c,c={}),c.filename=a;try{var g=c.cache?b.cache[f]||(b.cache[f]=e.readFileSync(a,"utf8")):e.readFileSync(a,"utf8");d(null,b.render(g,c))}catch(h){d(h)}},b.__express=b.renderFile,c.extensions?c.extensions[".ejs"]=function(a,b){source=c("fs").readFileSync(b,"utf-8"),a._compile(k(source,{}),b)}:c.registerExtension&&c.registerExtension(".ejs",function(a){return k(a,{})})}),require.register("filters.js",function(a,b,c){b.first=function(a){return a[0]},b.last=function(a){return a[a.length-1]},b.capitalize=function(a){return a=String(a),a[0].toUpperCase()+a.substr(1,a.length)},b.downcase=function(a){return String(a).toLowerCase()},b.upcase=function(a){return String(a).toUpperCase()},b.sort=function(a){return Object.create(a).sort()},b.sort_by=function(a,b){return Object.create(a).sort(function(a,c){return a=a[b],c=c[b],a>c?1:a<c?-1:0})},b.size=b.length=function(a){return a.length},b.plus=function(a,b){return Number(a)+Number(b)},b.minus=function(a,b){return Number(a)-Number(b)},b.times=function(a,b){return Number(a)*Number(b)},b.divided_by=function(a,b){return Number(a)/Number(b)},b.join=function(a,b){return a.join(b||", ")},b.truncate=function(a,b){return a=String(a),a.substr(0,b)},b.truncate_words=function(a,b){var a=String(a),c=a.split(/ +/);return c.slice(0,b).join(" ")},b.replace=function(a,b,c){return String(a).replace(b,c||"")},b.prepend=function(a,b){return Array.isArray(a)?[b].concat(a):b+a},b.append=function(a,b){return Array.isArray(a)?a.concat(b):a+b},b.map=function(a,b){return a.map(function(a){return a[b]})},b.reverse=function(a){return Array.isArray(a)?a.reverse():String(a).split("").reverse().join("")},b.get=function(a,b){return a[b]},b.json=function(a){return JSON.stringify(a)}}),require.register("utils.js",function(a,b,c){b.escape=function(a){return String(a).replace(/&(?!\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}),console.log("tester");var layoutUpdate=function(a,b){require("ejs").renderFile(a,b,function(a,b){document.body.innerHTML=b})}