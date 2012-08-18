//= require dwa

var ejs = require('ejs');
var dat = false;

var boolean = function () { return 'bool'; };
var css     = function () { return 'css' ; };
var js      = function () { return 'js'  ; };

function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

var layouts  = {};
var partials = {};
var blocks   = {};

var partial = function ( name )
{
    if ( partials[name] )
    {
        return ejs.render ( partials[name], dat );
    }
};

var layout = function ( name )
{
    if ( layouts[name] )
    {
        try
        {
            return ejs.render ( layouts[name], dat );
        }
        catch ( e )
        {
            // console.log ( e );
        }
    }
    else
    {
        return 'missing: ' + name;
    }
};

var layoutUpdate = function ( key, str, data )
{
    if ( !key ) { key = 'unknown'; }
    key = key.replace(/.*\//g,'').replace('.html','');

    if ( data.isLayout == true && data.isPartial != true )
    {
        layouts[key] = str;
    }
    else
    if ( data.isLayout != true && data.isPartial == true )
    {
        partials[key] = str;
    }
    else
    {
        blocks[key] = str;
    }

    dat = data;

    document.body.innerHTML = ejs.render ( str, data );
};
