jquery-chessBoard
=================

jQuery based library for building and painting chess boards WITHOUT game engines and computer player alogrithms.

![Screenshot (Firefox 28)](https://raw.githubusercontent.com/mkloubert/jquery-chessBoard/master/screenshot.png)

## Getting Started

### Mark up tags whose content you want to be translated

```html
<div id="myChessBoard"></div>
```

### Use the plugin

```javascript
// simple use
var cbCtx = $('#myChessBoard').chessBoard();

cbCtx.startPosition();
```

### Options

#### Events

##### Event arguments

Each event gets an object of the following structure as only parameter.

###### Fields

###### field

jQuery object that represents the field.

```javascript
{
    onClick: function(ctx) {
        ctx.field.toggle();
    },
}
```

###### name

Uppercase name of the field, e.g. _E6_.

```javascript
{
    onClick: function(ctx) {
        alert(ctx.name);
    },
}
```

###### pos

Zero based X- and Y-coordinate of the underlying field.

```javascript
{
    onClick: function(ctx) {
        var x = ctx.pos.x;
        var y = ctx.pos.y;
    },
}
```

###### Methods

###### disacknowledge()

Disacknowledges a field.

```javascript
{
    onClick: function(ctx) {
        ctx.disacknowledge();
    },
}
```

###### highlight()

Highlights a field.

```javascript
{
    onClick: function(ctx) {
        ctx.highlight();
    },
}
```

###### toggleHighlight()

Toggles the highlight state of a field.

```javascript
{
    onClick: function(ctx) {
        ctx.toggleHighlight();
    },
}
```

##### Event list

###### onClick

Is invoked if a field is clicked.

###### onDisacknowledgeField

Is invoked if a field gets disacknowledged.

###### onHighlightField

Is invoked if a field gets highlighted.

###### onPaintField

Is invoked when a field is painted.

###### onPaintPiece

Is invoked when a piece is painted.

###### onResizeField

Is invoked when a field is resized.

#### Fields

##### css

Optional styles for the chess board itself. That value is compatible with jQuery's css() method.

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'css': {
        'backgroundColor': 'pink',
    },
});
```

##### darkColor

CSS compatible background color for dark fields (default: _#d18b47_).

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'darkColor': 'red',
});
```

##### fieldCss

Value that is compatible with jQuery's css() method and is used when a field is painted. Is not defined by default.

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'fieldCss': {
        'padding': '66px',
    },
});
```

##### fieldHeight

CSS compatibe value for the height of a field. Is not defined by default.

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'fieldHeight': '5979px',
});
```

##### fieldWidth

CSS compatible width of a field (default: _64px_).

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'fieldWidth': '96px',
});
```

##### highlightColor

CSS compatible color if a field is highlighted (default: _#4cff4c_).

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'highlightColor': '#fff',
});
```

##### lightColor

CSS compatible color for light fields (default: _#ffce9e_).

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    lightColor: '#123456',
});
```

##### pieces

Defines a data structure that defines what content should be generated for a specific piece.

The structure has the following defaults:

```javascript
{
    'black': {
        'bishop': '&#9821;',
        'king'  : '&#9818;',
        'knight': '&#9822;',
        'pawn'  : '&#9823;',
        'queen' : '&#9819;',
        'rock'  : '&#9820;',
    },

    'none': '',
    
    'white': {
        'bishop': '&#9815;',
        'king'  : '&#9812;',
        'knight': '&#9816;',
        'pawn'  : '&#9817;',
        'queen' : '&#9813;',
        'rock'  : '&#9814;',
    },
}
```

Instead of string values that represent HTML code, it is also possible to define functions for one or more properties.

```javascript
{
    'none': function(ctx) {
        // ctx.piece => the jQuery object that represents the piece
        
        // ctx.type.class => upper case name of the piece class
        // ctx.type.color => color: 'W' for white or 'B' for black
        
        // ctx.type can be (null) if no piece is defined
    },
}
```

_ctx.type_ can contain the following values:

* BISHOP
* KING
* KNIGHT
* PAWN
* QUEEN
* ROCK

##### pieceSize

CSS compatible size of a piece (default: _48px_).

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'pieceSize': '32px',
});
```

##### setStartPosition

Defines if _startPosition()_ method should be called or not.

```javascript
var cbCtx = $('#myChessBoard').chessBoard({
    'setStartPosition': true,
});

### Result

A call of the plugin's method returns an object that provides features to handle all created chessboards.

#### Fields

##### selector

The underlying jQuery selector.

```javascript
cbCtx.selector.find('.cbField').each(function() {
    //TODO
});
```

#### Methods

##### clear()

Clears all fields from pieces.

```javascript
cbCtx.clear();
```

##### getField()

Returns a field.

```javascript
var fieldA1 = cbCtx.field('a1');
```

##### getHighlighted()

Returns a jQuery object with all highlighted fields.

```javascript
var highlightedFields = cbCtx.getHighlighted();
alert(highlightedFields.length);
```

##### hide()

Hides the chess board(s).

```javascript
cbCtx.hide();
```

##### removePiece()

Removes a piece from the board.

```javascript
cbCtx.removePiece('e2');
```

##### setPiece

Sets a piece of a specific kind and a specific color on one or more field.

```javascript
cbCtx.setPiece(['a1', 'h1'], 'white_rock');

// another way to do this
cbCtx.setPiece({
    'field': 'e8',
    'type': 'black_king',
});
```

The folowing lists show what type of pieces are available. The name of types are case-insensitive.

Black:

| type         | aliases       |       |
| -------------|---------------|-------|
| BLACK_BISHOP | B_BISHOP, BB  |&#9821;|
| BLACK_KING   | B_KING, BK    |&#9818;|
| BLACK_KNIGHT | B_KNIGHT, BKN |&#9822;|
| BLACK_PAWN   | B_PAWN, BP    |&#9823;|
| BLACK_QUEEN  | B_QUEEN, BQ   |&#9819;|
| BLACK_ROCK   | B_ROCK, BR    |&#9820;|

White:

| type         | aliases       |       |
| -------------|---------------|-------|
| WHITE_BISHOP | W_BISHOP, WB  |&#9815;|
| WHITE_KING   | W_KING, WK    |&#9812;|
| WHITE_KNIGHT | W_KNIGHT, WKN |&#9816;|
| WHITE_PAWN   | W_PAWN, WP    |&#9817;|
| WHITE_QUEEN  | W_QUEEN, WQ   |&#9813;|
| WHITE_ROCK   | W_ROCK, WR    |&#9814;|

##### specific setters

The following methods set a specific piece of a specific color on one or more field.

* setBishop
* setKing
* setKnight
* setPawn
* setQueen
* setRock

Example:

```javascript
cbCtx.setRock(['a1', 'h1'], 'white')  // set white rock at more than one field
     .setKnight(['b1', 'g1'], 'white')
     .setBishop(['c1', 'f1'], 'white')
     .setQueen('d1', 'white')  
     .setKing('e1', 'white')
     .setRock(['a8', 'h8'], 'black')
     .setKnight(['b8', 'g8'], 'black')
     .setBishop(['c8', 'f8'], 'black')
     .setQueen('d8', 'black') // set black queen at one field only
     .setKing('e8', 'black');
     
// another way
cbCtx.setRock({
    field: ['A1', 'H1'],  // fields are NOT case-sensitive
    color: 'w',  // for black color is alias is
                 // simply 'b'
});
```

##### show()

Shows the chess board(s).

```javascript
cbCtx.show();
```

##### startPosition()

Resets the chessboard and places all pieces to their start positions.

```javascript
cbCtx.startPosition();
```
