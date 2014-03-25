/*******************************************************************************
  The MIT License (MIT)

  Copyright (c) 2014 Marcel Joachim Kloubert

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
********************************************************************************/
  
(function($) {
    $.fn.chessBoard = function(opts) {
        var rowNames = '87654321';
        var colNames = 'ABCDEFGH';
        
        var _getFieldBgColor = function(x, y) {
            var bg = opts.darkColor;
            if (y % 2 == 1) {
                if (x % 2 == 1) {
                    bg = opts.lightColor;
                }
            }
            else {
                if (x % 2 == 0) {
                    bg = opts.lightColor;
                }
            }
            
            return bg;
        };
        
        opts = $.extend({
            'darkColor' : '#d18b47',
            'fieldWidth': '64px',
            'highlightColor': '#4cff4c',
            'lightColor': '#ffce9e',
            'onDisacknowledgeField': function(ctx) {
                ctx.field
                   .css('backgroundColor',
                        _getFieldBgColor(ctx.pos.x, ctx.pos.y));
            },
            'onHighlightField': function(ctx) {
                ctx.field
                   .css('backgroundColor',
                        opts.highlightColor);
            },
            'onPaintField': function(ctx) {
                var bg = _getFieldBgColor(ctx.pos.x,
                                          ctx.pos.y);
                
                ctx.field.css('backgroundColor', bg);
                ctx.field.css('width'          , opts.fieldWidth);
                ctx.field.css('overflow'       , 'hidden');
                ctx.field.css('padding'        , '0px');
                
                if (opts.fieldCss) {
                    ctx.field.css(opts.fieldCss);
                }
                
                var _onResizeFunc = function(e) {
                    if (opts.onResizeField) {
                        opts.onResizeField(ctx);
                    }
                };
                
                _onResizeFunc();
                ctx.field.resize(_onResizeFunc);
            },
            'onPaintPiece': function(ctx) {
                ctx.piece.css('display'       , 'block');
                ctx.piece.css('font-size'     , '48px');
                ctx.piece.css('text-align'    , 'center');
                ctx.piece.css('vertical-align', 'middle');
            },
            'onResizeField': function(ctx) {
                if (!opts.fieldHeight) {
                    ctx.field.css('height',
                                  ctx.field.outerWidth());
                }
                else {
                    ctx.field.css('height', opts.fieldHeight);
                }
            },
        }, opts);
        
        opts.pieces = $.extend({
            'none': '',
        }, opts.pieces);
        
        opts.pieces.black = $.extend({
            'bishop': '&#9821;',
            'king'  : '&#9818;',
            'knight': '&#9822;',
            'pawn'  : '&#9817;',
            'queen' : '&#9819;',
            'rock'  : '&#9820;',
        }, opts.pieces.black);
        
        opts.pieces.white = $.extend({
            'bishop': '&#9815;',
            'king'  : '&#9812;',
            'knight': '&#9816;',
            'pawn'  : '&#9823;',
            'queen' : '&#9813;',
            'rock'  : '&#9814;',
        }, opts.pieces.white);
        
        this.each(function() {
            var tbl = $('<table class="chessBoard"></table>');
            
            var _createFieldClickFunc = function(fieldObj) {
                return function(e) {
                    if (opts.onClick) {
                        opts.onClick(fieldObj);
                    }
                };
            };
            
            var _createFieldObject = function(field, fieldName, x, y) {
                var fieldObj = {
                    'disacknowledge': function() {
                        if (opts.onDisacknowledgeField) {
                            opts.onDisacknowledgeField(this);
                        }
                        
                        this.field.removeClass('cbFieldHighlighted');
                    },
                    'field': field,
                    'highlight': function() {
                        this.field.addClass('cbFieldHighlighted');
                        
                        if (opts.onHighlightField) {
                            opts.onHighlightField(this);
                        }
                    },
                    'name': fieldName,
                    'pos': {
                        'x': x,
                        'y': y,
                    },
                    'toggleHighlight': function() {
                        if (this.isHighlighted) {
                            this.disacknowledge();
                        }
                        else {
                            this.highlight();
                        }
                    },
                };
                
                Object.defineProperty(fieldObj, 'isHighlighted', {
                    get: function () {
                        return this.field.hasClass('cbFieldHighlighted');
                    }
                });
                
                return fieldObj;
            };
                
            for (var y = 0; y < 8; y++) {
                var newRow = $('<tr></tr>');
                newRow.addClass('cbRow');
                newRow.addClass('cbRow' + (y % 2 == 0 ? 'Odd' : 'Even'));
                newRow.addClass('cbRow' + rowNames.charAt(y));
                
                for (var x = 0; x < 8; x++) {
                    var fieldName = colNames.charAt(x) + rowNames.charAt(y);
                    
                    var newField = $('<td></td>');
                    
                    var fieldObj = _createFieldObject(newField, fieldName, x, y);
                    newField.chessField = fieldObj;
                    
                    newField.addClass('cbField');
                    newField.addClass('cbField' + (x % 2 == 0 ? 'Odd' : 'Even'));
                    newField.addClass('cbField' + colNames.charAt(x));
                    newField.addClass('cbField' + fieldName);

                    newField.click(_createFieldClickFunc(fieldObj));
                    
                    if (opts.onPaintField) {
                        opts.onPaintField(fieldObj);
                    }
                    
                    newField.appendTo(newRow);
                }
                
                tbl.append(newRow);
            }
            
            if (opts.css) {
                tbl.css(opts.css);
            }
            
            $(this).append(tbl);
        });
        
        var _createSpecificPieceOpts = function(funcArgs, ifBlack, ifWhite) {
            var o;
            if (funcArgs.length > 1) {
                o = {
                    'color': funcArgs[1],
                    'field': funcArgs[0],
                };
            }
            else if (funcArgs.length == 1) {
                o = $.extend({
                }, funcArgs[0]);
            }
            
            var pType;
            switch ($.trim(o.color).toUpperCase()) {
                case 'B':
                case 'BLACK':
                    pType = ifBlack;
                    break;
                    
                case 'W':
                case 'WHITE':
                    pType = ifWhite;
                    break;
            }
            
            return {
                'field': o.field,
                'type' : pType,
            };
        };
        
        var result = {
            'clear': function(field) {
                // pawns                
                for (var y = 0; y < 8; y++) {
                    for (var x = 0; x < 8; x++) {
                        this.removePiece(colNames[x] + rowNames[y]);
                    }
                }
            },
            'getHighlighted': function() {
                return this.selector
                           .find('.cbFieldHighlighted');
            },
            'removePiece': function(field) {
                this.selector
                    .find('.cbField' + $.trim(field).toUpperCase())
                    .html('');
            },
            'selector': this.find('.chessBoard'),
            'setBishop': function() {
                return this.setPiece(_createSpecificPieceOpts(arguments,
                                                              'BLACK_BISHOP', 'WHITE_BISHOP'));
            },
            'setKing': function() {
                return this.setPiece(_createSpecificPieceOpts(arguments,
                                                              'BLACK_KING', 'WHITE_KING'));
            },
            'setKnight': function() {
                return this.setPiece(_createSpecificPieceOpts(arguments,
                                                              'BLACK_KNIGHT', 'WHITE_KNIGHT'));
            },
            'setPawn': function() {
                return this.setPiece(_createSpecificPieceOpts(arguments,
                                                              'BLACK_PAWN', 'WHITE_PAWN'));
            },
            'setQueen': function() {
                return this.setPiece(_createSpecificPieceOpts(arguments,
                                                              'BLACK_QUEEN', 'WHITE_QUEEN'));
            },
            'setRock': function() {
                return this.setPiece(_createSpecificPieceOpts(arguments,
                                                              'BLACK_ROCK', 'WHITE_ROCK'));
            },
            'setPiece': function() {
                var spOpts;
                if (arguments.length > 1) {
                    spOpts = {
                        'field': arguments[0],
                        'type' : arguments[1],
                    };
                }
                else if (arguments.length == 1) {
                    spOpts = arguments[0];
                }
                
                spOpts = $.extend({
                    'type': '',
                }, spOpts);
                
                if (Object.prototype.toString.call(spOpts.field) !== '[object Array]' ) {
                    spOpts.field = [spOpts.field];
                }
                
                var htmlCode;
                var pieceClasses;
                var pType;
                switch ($.trim(spOpts.type).toUpperCase()) {
                    case 'B_BISHOP':
                    case 'BLACK_BISHOP':
                    case 'BB':
                        htmlCode = opts.pieces.black.bishop;
                        pieceClasses = ['cbPieceBishop', 'cbPieceBlackBishop'];
                        pType = {
                            'class': 'BISHOP',
                            'color': 'B',
                        };
                        break;
                    
                    case 'B_KING':
                    case 'BLACK_KING':
                    case 'BK':
                        htmlCode = opts.pieces.black.king;
                        pieceClasses = ['cbPieceKing', 'cbPieceBlackKing'];
                        pType = {
                            'class': 'KING',
                            'color': 'B',
                        };
                        break;
                    
                    case 'B_KNIGHT':
                    case 'BLACK_KNIGHT':
                    case 'BKN':
                        htmlCode = opts.pieces.black.knight;
                        pieceClasses = ['cbPieceKnight', 'cbPieceBlackKnight'];
                        pType = {
                            'class': 'KNIGHT',
                            'color': 'B',
                        };
                        break;
                        
                    case 'B_PAWN':
                    case 'BLACK_PAWN':
                    case 'BP':
                        htmlCode = opts.pieces.black.pawn;
                        pieceClasses = ['cbPiecePawn', 'cbPieceBlackPawn'];
                        pType = {
                            'class': 'PAWN',
                            'color': 'B',
                        };
                        break;
                        
                    case 'B_QUEEN':
                    case 'BLACK_QUEEN':
                    case 'BQ':
                        htmlCode = opts.pieces.black.queen;
                        pieceClasses = ['cbPieceQueen', 'cbPieceBlackQueen'];
                        pType = {
                            'class': 'QUEEN',
                            'color': 'B',
                        };
                        break;
                        
                    case 'B_ROCK':
                    case 'BLACK_ROCK':
                    case 'BR':
                        htmlCode = opts.pieces.black.rock;
                        pieceClasses = ['cbPieceRock', 'cbPieceBlackRock'];
                        pType = {
                            'class': 'ROCK',
                            'color': 'B',
                        };
                        break;
                        
                    case 'W_BISHOP':
                    case 'WHITE_BISHOP':
                    case 'WB':
                        htmlCode = opts.pieces.white.bishop;
                        pieceClasses = ['cbPieceBishop', 'cbPieceWhiteBishop'];
                        pType = {
                            'class': 'BISHOP',
                            'color': 'W',
                        };
                        break;
                        
                    case 'W_KING':
                    case 'WHITE_KING':
                    case 'WK':
                        htmlCode = opts.pieces.white.king;
                        pieceClasses = ['cbPieceKing', 'cbPieceWhiteKing'];
                        pType = {
                            'class': 'KING',
                            'color': 'W',
                        };
                        break;
                    
                    case 'W_KNIGHT':
                    case 'WHITE_KNIGHT':
                    case 'WKN':
                        htmlCode = opts.pieces.white.knight;
                        pieceClasses = ['cbPieceKnight', 'cbPieceWhiteKnight'];
                        pType = {
                            'class': 'KNIGHT',
                            'color': 'W',
                        };
                        break;
                        
                    case 'W_PAWN':
                    case 'WHITE_PAWN':
                    case 'WP':
                        htmlCode = opts.pieces.white.pawn;
                        pieceClasses = ['cbPiecePawn', 'cbPieceWhitePawn'];
                        pType = {
                            'class': 'PAWN',
                            'color': 'W',
                        };
                        break;
                        
                    case 'W_QUEEN':
                    case 'WHITE_QUEEN':
                    case 'WQ':
                        htmlCode = opts.pieces.white.queen;
                        pieceClasses = ['cbPieceQueen', 'cbPieceWhiteQueen'];
                        pType = {
                            'class': 'QUEEN',
                            'color': 'W',
                        };
                        break;
                        
                    case 'W_ROCK':
                    case 'WHITE_ROCK':
                    case 'WR':
                        htmlCode = opts.pieces.white.rock;
                        pieceClasses = ['cbPieceRock', 'cbPieceWhiteRock'];
                        pType = {
                            'class': 'ROCK',
                            'color': 'W',
                        };
                        break;
                        
                    case '':
                        htmlCode = opts.pieces.none;
                        pieceClasses = ['cbPieceNone'];
                        pType = null;
                        break;
                }
                
                var pieceElement = $('<span class="cbPiece"></span>');
                if (typeof(htmlCode) == "function") {
                    pieceElement.html(htmlCode({
                        'piece': pieceElement,
                        'type': pType,
                    }));
                }
                else {
                    pieceElement.html(htmlCode);
                }
                
                if (pieceClasses) {
                    for (var i = 0; i < pieceClasses.length; i++) {
                        pieceElement.addClass(pieceClasses[i]);
                    }
                }
                
                if (opts.onPaintPiece) {
                    opts.onPaintPiece({
                        'piece': pieceElement,
                        'type': pType,
                    });
                }
                
                if (spOpts.field) {
                    for (var i = 0; i < spOpts.field.length; i++) {
                        var f = spOpts.field[i];
                    
                        this.selector
                            .find('.cbField' + $.trim(f).toUpperCase())
                            .html($('<span></span>').append(pieceElement)
                                                    .html());
                    }
                }

                return this;
            },
            'startPosition': function(spOpts) {
                spOpts = $.extend({
                }, spOpts);
                
                // clear                
                this.clear();
                
                this.setRock(['a1', 'h1'], 'white')
                    .setKnight(['b1', 'g1'], 'white')
                    .setBishop(['c1', 'f1'], 'white')
                    .setQueen('d1', 'white')
                    .setKing('e1', 'white')
                    .setRock(['a8', 'h8'], 'black')
                    .setKnight(['b8', 'g8'], 'black')
                    .setBishop(['c8', 'f8'], 'black')
                    .setQueen('d8', 'black')
                    .setKing('e8', 'black');
                
                // pawns                
                for (var i = 0; i < 8; i++) {
                    this.setPawn(colNames[i] + '7', 'white')
                        .setPawn(colNames[i] + '2', 'black');
                }
            
                return this;
            },
        };
        
        return result;
    };
})(jQuery);
