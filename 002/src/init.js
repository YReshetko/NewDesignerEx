/**
 * Created with IntelliJ IDEA.
 * User: Yurchik
 * Date: 12.01.16
 * Time: 19:45
 * To change this template use File | Settings | File Templates.
 */
function init(){
    /*var panel = $(".designer-panel");
	var panelHeader = $(".panel-header");
	move(panelHeader, panel);   */
	/*var p = new td.panel({});
	console.log(p.header);
	p.header = "new string";
	console.log(p.header);   */
	var p1 = new td.panel({x : 10, y : 10, width : 200, height : 500, title : "panel 1"});
	var p2 = new td.panel({x : 220, y : 10, width : 200, height : 500, title : "panel 2"});
	var p3 = new td.panel({x : 430, y : 10, width : 200, height : 500, title : "panel 3"});

	$(".stage").append(p1.panel);
	$(".stage").append(p2.panel);
	$(".stage").append(p3.panel);

	p1.draggable = true;
	p2.draggable = true;
	p3.draggable = true;
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
	td.prototype = td.base;
	this._title = config.title;
	this._panel;
	this._header;
	this._body;
	this._container;
	this._draggable = false;
	this._headerHeight = 20;

	this._init = function(){
		var mainStyle = {
			width       :config.width + "px",
			height      :config.height + "px",
			left        :config.x + "px",
			top         :config.y + "px",
			background  :"#999",
			position    : "absolute",
			cursor      : "col-resize"
		};
		var headerStyle = {
			width:(config.width - 2) + "px",
			height:this._headerHeight + "px",
			background:"#eee",
			position: "relative",
			left:"1px",
			top:"1px",
			cursor: "pointer"
		};
		var bodyStyle = {
			width:(config.width - 2) + "px",
			height:(config.height - this._headerHeight - 4) + "px",
			background:"#111",
			position: "relative",
			left:"1px",
			top:"3px",
			cursor: "auto"
		};
		var containerStyle = {
			width:"100%",
			height:"100%",
			background:"#fff",
			position: "relative",
			overflow: "scroll"
		};
		this._panel = $("<div/>").css(mainStyle);
		this._header = $("<div>"+this._title+"</div>").css(headerStyle);
		this._body = $("<div/>").css(bodyStyle);
		this._container = $("<div/>").css(containerStyle);
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
				if(value == true){
					td.move(this._header, this._panel);
				}else{

				}
				this._draggable = value;
			}
		}
	});
	this._init();
}
td.base = function(){

}
td.move = function(div, panel){
	$(div).mousedown(function(e){
		$(panel).css("z-index", 10);
		left = e.pageX - panel.offset().left;
		top1 = e.pageY - panel.offset().top;
		clear = function(){
			$(div).off("mouseout", clear);
			$(div).off("mouseup", clear);
			$(document).off("mousemove", movePanel);
			$(panel).css("z-index", 1);
		}
		movePanel = function(e){
			panel.offset({"top": e.pageY - top1, "left":e.pageX - left});
		}
		$(document).on("mousemove", movePanel);
		$(div).on("mouseout", clear);
		$(div).on("mouseup", clear);
	});
}