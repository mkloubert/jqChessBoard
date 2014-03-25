jquery-chessBoard
=================

jQuery based library for building and painting chess boards WITHOUT game engines and computer player alogrithms.

## Getting Started

### Mark up tags whose content you want to be translated

```html
<div id="myChessBoard"></div>
```

### Use the plugin

```javascript
// simple use
var cbCtx = $('#myChessBoard').chessBoard();
```

### Options


### Result

A call of the plugin's method returns an object that provides features to handle all created chessboards.

#### Fields

##### selector

The underlying jQuery selector.

```javascript
cbCtx..selector.find('cbField').each(function() {
});
```

#### Functions

##### clear()

Clears all fields from pieces.

```javascript
cbCtx.clear();
```

##### getHighlighted()

Returns a jQuery object with all highlighted fields.

```javascript
var highlightedFields = cbCtx.getHighlighted();
alert(highlightedFields.length);
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

// other way to do this
cbCtx.setPiece({
    'field': ['a1', 'h1'],
    'type': 'white_rock',
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
    field: ['a1', 'h1'],
    color: 'white',
});
```

##### startPosition()

Resets the chessboard and places all pieces to their start positions.

