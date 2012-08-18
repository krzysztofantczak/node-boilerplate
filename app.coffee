express = require 'express'
fusker  = require 'fusker' # firewall
assets  = require 'connect-assets'
cluster = require 'cluster'

# dodac diffable i kurka wodna hot push! najlepiej by bylo polaczyc te mechanizmy i walnac hot push przy pomocy diffable przez socket.io

# fusker.config.dir       = process.cwd()
# fusker.config.banLength = 1
# fusker.config.verbose   = true

# fusker.http.detectives.push   'csrf', 'xss', 'sqli', 'lfi', '404'
# fusker.http.payloads.push     'blacklist', 'bush'
# fusker.socket.detectives.push 'xss', 'sqli', 'lfi'
# fusker.socket.payloads.push   'blacklist'

app = express.createServer()
io  = require("socket.io").listen(app)

app.configure ->
  app.set 'port', process.env.VMC_APP_PORT or 1337
  app.set "views", __dirname + "/views"
  app.set "view engine", "eco"
  app.set "views cache", __dirname + "/cache"
  app.register ".html", require("sejs").ejs
  app.register ".eco" , require("eco")

  # app.use less(src: __dirname + "/less/", dst: __dirname + "/public/")
  # app.use fusker.express.check
  # app.use express.static(fusker.config.dir)

  app.use assets(build: false)
  app.use express.logger("dev")

  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.static(__dirname + "/public/")

app.get "/ejs", (req, res) ->
  res.render "ejs/test.html",
    foo: "bar", cache: false, socket: io

app.get "/tradero", (req, res) ->
  res.render "ejs/tradero.html",
    foo: "bar"

app.get "/eco", (req, res) ->
  res.render "eco/test",
    foo: "bar"

app.get "/", (req, res) ->
  res.render "boilerplate/main.html"

app.get "/bookmarks", (req, res) ->
  res.render "boilerplate/main.html"

app.get "/anywhere", (req, res) ->
  res.render "boilerplate/anywhere.html"

app.all "*", (req, res) ->
  res.render "boilerplate/404.html"
# io.sockets.on "connection", (socket) ->
#   sock = socket
#   socket.emit "news",
#     hello: "world"

#   socket.on "my other event", (data) ->
#     console.log data

# if cluster.isMaster
#     for i in [1..4]
#       worker = cluster.fork()
# else
#     app.listen 3000, -> console.log 'Listening in cluster...'

app.listen 3000, -> console.log 'Listening without cluster...'

# socket.io
# io = fusker.socket.listen app
