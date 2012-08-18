exports.data = event: 'my other event', handler: (data,socket) ->
    socket.emit 'news',
        hello: 'world',
        pong: data
