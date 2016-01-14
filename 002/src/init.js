/**
 * Created with IntelliJ IDEA.
 * User: Yurchik
 * Date: 12.01.16
 * Time: 19:45
 * To change this template use File | Settings | File Templates.
 */
function init(){
	var p1 = new td.panel({x : 10, y : 10, width : 300, height : 600, title : "PANEL 1"});
	var p2 = new td.panel({x : 10, y : 10, width : 200, height : 500, title : "panel 2"});
	var p3 = new td.panel({x : 10, y : 10, width : 100, height : 400, title : "panel 3"});

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
td.panel = function(config){
	//this.prototype = Object.create(td.base);
   // this.prototype.constructor = td.panel;

	this._title = config.title;
	this._panel;
	this._header;
	this._body;
	this._container;
	this._draggable = false;
	this._resizeble = false;
	this._headerHeight = 20;
	this._borderSize = 1;
	this._minWidth = 70;
	this._minHeight = 55;

	this._init = function(){
		var mainStyle = {
			width       :config.width + "px",
			height      :config.height + "px",
			left        :config.x + "px",
			top         :config.y + "px",
			//background  :"#999",
			position    : "absolute",
			cursor      : "auto"
		};
		var headerStyle = {
			width:(config.width - this._borderSize*2) + "px",
			height:this._headerHeight + "px",
			//background:"#eee",
			position: "relative",
			left:this._borderSize + "px",
			top:this._borderSize + "px",
			cursor: "pointer",
			overflow: "hidden"
		};
		var bodyStyle = {
			width:(config.width - this._borderSize*2) + "px",
			height:(config.height - this._headerHeight - (this._borderSize * 3)) + "px",
			//background:"#111",
			position: "relative",
			left:this._borderSize + "px",
			top: this._borderSize*2 + "px",
			cursor: "auto"
		};
		var containerStyle = {
			width:"100%",
			height:"100%",
			//background:"#fff",
			position: "relative",
			overflow: "auto"
		};
		this._panel = $("<div/>").css(mainStyle).addClass("simple-panel");
		this._header = $("<div/>").css(headerStyle).addClass("panel-header");
		$(this._header).append("<div>"+this._title+"</div>");
		this._body = $("<div/>").css(bodyStyle).addClass("panel-body");
		this._container = $("<div/>").css(containerStyle).addClass("panel-container");
		this._panel.append(this._header);
		this._panel.append(this._body);
		this._body.append(this._container);
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
	this._init();
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
td.panel.prototype = new td.EvenDispatcher();

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
    var resizeType = "none";
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
        var xLeft = x<=object.borderSize*3;
        var xRight = x>=(object.width - object.borderSize*3);
        var yUp = y<=object.borderSize*3;
        var yDown = y>=(object.height - object.borderSize*3);

        var right = xRight && !yUp && !yDown;
        var left = xLeft && !yUp && !yDown;
        var up = yUp && !xRight && !xLeft;
        var down = yDown && !xRight && !xLeft;

        var rightUp = xRight && yUp;
        var rightDown = xRight && yDown;
        var leftUp = xLeft && yUp;
        var leftDown = xLeft && yDown;

        if(right){
            $(container).css("cursor", "e-resize");
            resizeType = "right";
        } else if(left){
            $(container).css("cursor", "e-resize");
            resizeType = "left";
        } else if(up){
            $(container).css("cursor", "n-resize");
            resizeType = "up";
        } else if(down){
            $(container).css("cursor", "n-resize");
            resizeType = "down";
        } else if(rightUp){
            $(container).css("cursor", "nesw-resize");
            resizeType = "rightUp";
        } else if(leftDown){
            $(container).css("cursor", "nesw-resize");
            resizeType = "leftDown";
        } else if(rightDown){
            $(container).css("cursor", "nwse-resize");
            resizeType = "rightDown";
        } else if(leftUp){
            $(container).css("cursor", "nwse-resize");
            resizeType = "leftUp";
        } else{
            $(container).css("cursor", "auto");
            resizeType = "none";
        }
    }
    function resizeMouseDown(e){
        if(resizeType == "none") return;
        if(resizeType == "right") $(document).on("mousemove", resizeRight);
        if(resizeType == "left") $(document).on("mousemove", resizeLeft);
        if(resizeType == "down") $(document).on("mousemove", resizeDown);
        if(resizeType == "up") $(document).on("mousemove", resizeUp);
        if(resizeType == "rightUp") $(document).on("mousemove", resizeRightUp);
        if(resizeType == "rightDown") $(document).on("mousemove", resizeRightDown);
        if(resizeType == "leftUp") $(document).on("mousemove", resizeLeftUp);
        if(resizeType == "leftDown") $(document).on("mousemove", resizeLeftDown);
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
        $(document).off("mousemove", resizeRight);
        $(document).off("mousemove", resizeLeft);
        $(document).off("mousemove", resizeDown);
        $(document).off("mousemove", resizeUp);
        $(document).off("mousemove", resizeRightUp);
        $(document).off("mousemove", resizeRightDown);
        $(document).off("mousemove", resizeLeftUp);
        $(document).off("mousemove", resizeLeftDown);
        $(document).off("mouseup", removeResize);
    }
    if(resizeble){
        $(container).on("mouseover", overPanel);
        $(container).on("mouseout", outPanel);
    }else{
        $(container).off("mouseover", overPanel);
        $(container).off("mouseout", outPanel);
    }
}