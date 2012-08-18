express = require 'express'
http    = require 'http'
assets  = require 'connect-assets'

# since express 3.x was improved, lets try to use ANY of template engines inside of the node-boilerplate
ejs     = require 'ejs'
eco     = require 'eco'

engine  = require 'ejs-locals'

routes  = require './application/routes'
events  = require './application/events'

# fusker  = require 'fusker' # "firewall"
# cluster = require 'cluster'

# sorry, sometimes you can find some polish comments here and there - You should not even care about them...
# dodac diffable i hot push! najlepiej by bylo polaczyc te mechanizmy i walnac hot push przy pomocy diffable przez socket.io

# @TODO we need to find out how to use it - it looks pretty nice ;-)
# fusker.config.dir       = process.cwd()
# fusker.config.banLength = 1
# fusker.config.verbose   = true

# fusker.http.detectives.push   'csrf', 'xss', 'sqli', 'lfi', '404'
# fusker.http.payloads.push     'blacklist', 'bush'
# fusker.socket.detectives.push 'xss', 'sqli', 'lfi'
# fusker.socket.payloads.push   'blacklist'

app = module.exports = express()

app.configure ->
  app.set 'port', process.env.VMC_APP_PORT or 1337

  app.engine "html", engine
  app.engine "eco" , eco

  app.set "views", __dirname + "/application/views"
  app.set "view engine", "ejs"
  app.set "views cache", __dirname + "/cache"

  # app.use less(src: __dirname + "/less/", dst: __dirname + "/public/")
  # app.use fusker.express.check
  # app.use express.static(fusker.config.dir)

  app.use assets(build: true, src: __dirname + '/application/assets', buildDir: 'cache/', debug: true)
  app.use express.logger("dev")

  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("*&tuasgdFGAUdyfVAUydvsdfibs(*T67235423")
  app.use express.session()
  app.use app.router
  app.use express.static(__dirname + "/public/")

app.configure 'development', ->
    app.use express.errorHandler
        dumpExceptions: true
        showStack: true

app.configure 'production', ->
    app.use express.errorHandler()

# @TODO: find out is there any better way to do that
for idx of routes
  app.get routes[idx].uri, routes[idx].handler

# if cluster.isMaster
#     for i in [1..4]
#       worker = cluster.fork()
# else
#     app.listen 3000, -> console.log 'Listening in cluster...'

server = http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

io = require("socket.io").listen(server)

# @TODO: exactly the same thing - like in case of http routing
# @TODO: what about hook.io?
io.sockets.on "connection", (socket) ->
    for idx of events
        socket.on events[idx].event, (data) ->
            events[idx].handler.apply this, [data, socket]
