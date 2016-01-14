/**
 * Created with IntelliJ IDEA.
 * User: Yurchik
 * Date: 12.01.16
 * Time: 19:45
 * To change this template use File | Settings | File Templates.
 */
function init(){
	var p1 = new td.Panel({x : 10, y : 10, width : 300, height : 600, title : "PANEL 1"});
	var p2 = new td.Panel({x : 10, y : 10, width : 200, height : 500, title : "яжемю"});
	var p3 = new td.Panel({x : 10, y : 10, width : 100, height : 400, title : "panel 3"});

	$(".stage").append(p1.panel);
	p1.container.append(p2.panel);
	p2.container.append(p3.panel);
	//$(".stage").append(p3.panel);

	p1.draggable = true;
	p2.draggable = true;
	p3.draggable = true;
	//p3.draggable = true;

	p1.resizeble = true;
	p2.resizeble = true;
	p3.resizeble = true;

	p1.title = "CHANGE NAME";

	//p2.container.append("SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>SomeString<br>");
}


// td - task designer
if(typeof(td) == 'undefined') td = function(){};
/*
* config{
*     x      - panel left position
*     y      - panel top position
*     width  - panel width
*     height - panel height
*     title  - panel title
* }
*/
td.BasePanel = function(){
	//this._title = config.title;
	this._panel;
	this._header;
	this._body;
	this._container;
	this._draggable = false;
	this._resizeble = false;
	this._headerHeight = 15;
	this._borderSize = 1;
	this._minWidth = 70;
	this._minHeight = 55;

	this._init = function(config){
		var mainStyle = {
			position    : "absolute",
			cursor      : "auto"
		};
		var headerStyle = {
			height:this._headerHeight + "px",
			position: "relative",
			left:this._borderSize + "px",
			top:this._borderSize + "px",
			cursor: "pointer",
			overflow: "hidden"
		};
		var bodyStyle = {
			position: "relative",
			left:this._borderSize + "px",
			top: this._borderSize*2 + "px",
			cursor: "auto"
		};
		var containerStyle = {
			width:"100%",
			height:"100%",
			position: "relative",
			overflow: "auto"
		};
		this._panel = $("<div/>").css(mainStyle).addClass("panel-main");
		this._header = $("<div/>").css(headerStyle).addClass("panel-header");
		//$(this._header).append("<div>"+this._title+"</div>");
		this._body = $("<div/>").css(bodyStyle).addClass("panel-body");
		this._container = $("<div/>").css(containerStyle).addClass("panel-container");
		this._panel.append(this._header);
		this._panel.append(this._body);
		this._body.append(this._container);
		this.width = config.width;
		this.height = config.height;
		this.x = config.x;
		this.y = config.y;

	};
	Object.defineProperties(this,{
		header : {
			get : function(){
				return this._header;
			}
		},
		container : {
			get : function(){
				return this._container;
			}
		},
		panel : {
			get : function(){
				return this._panel;
			}
		},
		x : {
			get : function(){
				return this._x;
			},
			set : function(value){
				this._x = value;
			}
		},
		draggable : {
			get : function(){
			   return this._draggable;
			},
			set : function(value){
				td.move(this._header, this._panel, value);
				this._draggable = value;
			}
		},
		resizeble : {
            get : function(){
                return this._resizeble;
            },
            set : function(value){
                td.resize(this._panel, this, value);
                this._resizeble = value;
            }
		},
		width : {
		    get : function(){
		        return parseInt($(this._panel).css("width"));
		    },
		    set : function(value){
		        if(value<this._minWidth) value = this._minWidth;
		        $(this._header).css("width", (value-this._borderSize*2)+"px");
		        $(this._panel).css("width", value+"px");
		        $(this._body).css("width", (value-this._borderSize*2)+"px");
		    }
		},
		height : {
		    get : function(){
                return parseInt($(this._panel).css("height"));
            },
            set : function(value){
                if(value<this._minHeight) value = this._minHeight;
                $(this._panel).css("height", value+"px");
                $(this._body).css("height", (value - this._headerHeight - (this._borderSize*3))+"px");
            }
		},
		x : {
		    get : function(){
		        return this._panel.offset().left;
		    },
		    set : function(value){
                var top = this._panel.offset().top;
                this._panel.offset({left: value, top: top});
		    }
		},
		y : {
		    get : function(){
		        return this._panel.offset().top;
		    },
            set : function(value){
                 var left = this._panel.offset().left;
                 this._panel.offset({left: left, top: value});
            }
		},
		borderSize : {
		    get : function(){
		        return this._borderSize;
		    }
		}
	});
}
td.EvenDispatcher = function(){
    this._event = "";
    this.addEventListener = function(event, func){
        this._event = event;
    }
    this.removeEventListener = function(event, func){

    }
    this.dispatchEvent = function(event){

    }
}
td.BasePanel.prototype = new td.EvenDispatcher();

td.Panel = function(config){
	this._title = config.title;
	this._init(config);
	this._titleObject = $("<div>"+this._title+"</div>").addClass("panel-title");
	this.header.append(this._titleObject);
	Object.defineProperties(this,{
		title : {
			get : function(){
				return this._title;
			},
			set : function(value){
				this._titleObject.empty();
				this._titleObject.append(value);
				this._title = value;
			}
		}
	});
}
td.Panel.prototype = new td.BasePanel();

td.move = function(div, panel, draggable){
    function moveFunc(e){
        $(panel).css("z-index", 10);
        left = e.pageX - panel.offset().left;
        top1 = e.pageY - panel.offset().top;
        clear = function(){
            $(div).off("mouseup", clear);
            $(document).off("mouseup", clear);
            $(document).off("mousemove", movePanel);
            $(panel).css("z-index", 1);
        }
        movePanel = function(e){
            panel.offset({"top": e.pageY - top1, "left":e.pageX - left});
        }
        $(document).on("mousemove", movePanel);
        $(document).on("mouseup", clear);
        $(div).on("mouseup", clear);
    }
	if(draggable){
	    $(div).on("mousedown", moveFunc);
	}else{
        try{
            $(div).off("mousedown", moveFunc);
        }catch(e){
            console.err("Can't remove draggable event listener from panel");
        }
	}
}

td.resize = function(container, object, resizeble){
	var resizeTypes = {
		right       : {type : "right",      flag : false, cursor : "e-resize",      func : resizeRight      },
		left        : {type : "left",       flag : false, cursor : "e-resize",      func : resizeLeft       },
		up          : {type : "up",         flag : false, cursor : "n-resize",      func : resizeUp         },
		down        : {type : "down",       flag : false, cursor : "n-resize",      func : resizeDown       },
		rightUp     : {type : "rightUp",    flag : false, cursor : "nesw-resize",   func : resizeRightUp    },
		rightDown   : {type : "rightDown",  flag : false, cursor : "nwse-resize",   func : resizeRightDown  },
		leftUp      : {type : "leftUp",     flag : false, cursor : "nwse-resize",   func : resizeLeftUp     },
		leftDown    : {type : "leftDown",   flag : false, cursor : "nesw-resize",   func : resizeLeftDown   },
		none        : {type : "none",       flag : true,  cursor : "auto",          func : null             }
	};
	var resizeType = resizeTypes.none;
    function overPanel(e){
        $(container).on("mousemove", freeMouseMove);
        $(container).on("mousedown", resizeMouseDown);

    };
    function outPanel(e){
        $(container).off("mousemove", freeMouseMove);
        $(container).off("mousedown", resizeMouseDown);
    };
    function freeMouseMove(e){
        var x = e.offsetX;
        var y = e.offsetY;
        var xLeft = x<=object.borderSize;
        var xRight = x>=(object.width - object.borderSize);
        var yUp = y<=object.borderSize;
        var yDown = y>=(object.height - object.borderSize);

	    resizeTypes.right.flag = xRight && !yUp && !yDown;
	    resizeTypes.left.flag = xLeft && !yUp && !yDown;
	    resizeTypes.up.flag = yUp && !xRight && !xLeft;
	    resizeTypes.down.flag = yDown && !xRight && !xLeft;

	    resizeTypes.rightUp.flag = xRight && yUp;
	    resizeTypes.rightDown.flag = xRight && yDown;
	    resizeTypes.leftUp.flag = xLeft && yUp;
	    resizeTypes.leftDown.flag = xLeft && yDown;
	    resizeTypes.none.flag = true;
	    resizeType = resizeTypes.none;

	    for(obj in resizeTypes){
		    if(resizeTypes[obj].flag){
			    resizeType = resizeTypes[obj];
			    $(container).css("cursor", resizeType.cursor);
			    return;
		    }
	    }
    }
    function resizeMouseDown(e){
	    if(resizeType.type == "none") return;
	    $(container).off("mousemove", freeMouseMove);
	    $(document).on("mousemove", resizeType.func);
        $(document).on("mouseup", removeResize);
    }
    function resizeRight(e){
        object.width = e.pageX - object.x;
    }
    function resizeLeft(e){
        var oldX = object.x;
        var rightX = oldX + object.width;
        object.width = object.width + (oldX - e.pageX);
        object.x = rightX - object.width;
    }
    function resizeDown(e){
        object.height = e.pageY - object.y;
    }
    function resizeUp(e){
        var oldY = object.y;
        var downY = oldY + object.height;
        object.height = object.height + (oldY - e.pageY);
        object.y = downY - object.height;
    }
    function resizeRightUp(e){
        resizeRight(e);
        resizeUp(e);
    }
    function resizeRightDown(e){
        resizeRight(e);
        resizeDown(e);
    }
    function resizeLeftUp(e){
        resizeLeft(e);
        resizeUp(e);
    }
    function resizeLeftDown(e){
        resizeLeft(e);
        resizeDown(e);
    }
    function removeResize(e){
	    $(document).off("mousemove", resizeType.func);
	    $(document).off("mouseup", removeResize);
	    $(container).on("mousemove", freeMouseMove);
    }
    if(resizeble){
        $(container).on("mouseover", overPanel);
        $(container).on("mouseout", outPanel);
    }else{
        $(container).off("mouseover", overPanel);
        $(container).off("mouseout", outPanel);
    }
}