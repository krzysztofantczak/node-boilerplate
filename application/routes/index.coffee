exports.index   = uri: '/', handler: (req, res) ->
    res.render "boilerplate/main.html"

exports.tradero = uri: '/tradero', handler: (req, res) ->
    res.render "ejs/tradero.html",
        foo: 'bar'

exports.anywhere = uri: '/anywhere', handler: (req, res) ->
    res.render "boilerplate/anywhere.html"

exports.ejs = uri: '/ejs', handler: (req, res) ->
    res.render "ejs/test.html",
        foo: 'bar'

exports.eco = uri: '/eco', handler: (req, res) ->
    res.render "eco/test.eco",
        foo: 'bar'

exports.catchAll = uri: '*', handler: (req, res) ->
    res.render "boilerplate/404.html"
