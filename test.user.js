// ==UserScript==
// @name            Sample extension
// @author          psydel
// @description     This is a sample extension.
// @include         *
// @exclude         http*://psydel.000webhostapp.com/iframe/
// ==/UserScript==

Object.keys||(Object.prototype.keys = function () {
	var a=[];
	for (var b in this) {
		if (Object.prototype.hasOwnProperty.call(this,b)) {
			a.push(b);
		}
	}
	return a;
});

NodeList.forEach||(NodeList.prototype.forEach = function (callback) {
	for (var a=0;a<this.length;a++) {
		callback(this[a],a,this);
	}
});

NodeList.entries||(NodeList.prototype.entries = function* () {
	for (var a=0;a<this.length;a++) {
		yield [a,this[a]];
	}
});

NodeList.keys||(NodeList.prototype.keys = function* () {
	for (var a=0;a<this.length;a++) {
		yield a;
	}
});

NodeList.values||(NodeList.prototype.values = function* () {
	for (var a=0;a<this.length;a++) {
		yield this[a];
	}
});

var iframe=(function () {/*
	document.head.removeChild(document.getElementsByTagName("script")[0]);
	window.addEventListener("message",function (e) {
		if (e.data.type.match("getbmk")) {
			window.parent.postMessage({
				"bmk":getlocalbmk(),
				"type":"getted",
				"croped":localStorage.getItem("croped")&&true
			},e.origin);
		}
		else if (e.data.type.match("setbmk")) {
			setlocalbmk(e.data.bmk);
			window.parent.postMessage({
				"result":"complete",
				"type":"setted"
			},e.origin);
		}
		else if (e.data.type.match("import")) {
			var req = new XMLHttpRequest();
			req.open('GET',"https://home.psydel.com/",true);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4&&req.status == 200) {
					setlocalbmk(JSON.parse(req.responseText));
					window.parent.postMessage({
						"bmk":JSON.parse(req.responseText),
						"type":"importd",
						"croped":localStorage.getItem("croped")&&true
					},e.origin);
				}
			};
			req.send(null);
		}
		else if (e.data.type.match("export")) {
			var req = new XMLHttpRequest();
			req.open('POST',"https://home.psydel.com/",true);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4&&req.status == 200) {
					alert(req.responseText);
					window.parent.postMessage({
						"result":"complete",
						"type":"exportd"
					},e.origin);
				}
			}
			var dats = new FormData();
			dats.append("id",JSON.stringify(getlocalbmk()));
			req.send(dats);
		}
		else if (e.data.type.match("change")) {
			var bmk=getlocalbmk();
			var bmkptr=bmk;
			var info=e.data.info;
			info.loc.split("/").forEach(function (v) {
				bmkptr=bmkptr.value[v];
			});
			if (info.act.match("add")) {
				info.data.forEach(function (v) {
					var c={};
					c.data={};
					c.data.created=(new Date()).getTime();
					c.data.modified=(new Date()).getTime();
					c.data.name=v.name;
					c.path=info.loc;
					c.type="link";
					c.value=v.url;
					if (!v.name) {
						return undefined;
					}
					if (bmkptr.value[v.name]) {
						if (confirm(v.name+" is already exist.\noverwrite it?")) {

						}
						else {
							while(bmkptr.value[(v.name=prompt("new name",v.name))]) {
								if (!v.name) {
									return undefined;
								}
							}
						}
					}
					bmkptr.value[v.name]=c;
					bmkptr.data.order.push(v.name);
				});
			}
			else if (info.act.match("new")) {
				info.data.forEach(function (v) {
					var c={};
					c.data={};
					c.data.created=(new Date()).getTime();
					c.data.modified=(new Date()).getTime();
					c.data.name=v.name;
					c.data.order=[];
					c.path=info.loc;
					c.type="folder";
					c.value={};
					if (bmkptr.value[v.name]) {
						alert(v.name+" is already exist.");
						return undefined;
					}
					bmkptr.value[v.name]=c;
					bmkptr.data.order.push(v.name);
				});
			}
			else if (info.act.match("remove")) {
				info.data.forEach(function (v) {
					bmkptr=bmk;
					v.loc.split("/").forEach(function (a) {
						bmkptr=bmkptr.value[a];
					});
					delete bmkptr.value[v.name];
					bmkptr.data.modified=(new Date()).getTime();
					bmkptr.data.order.splice(bmkptr.data.order.indexOf(v.name),1);
				});
			}
			else if (info.act.match("move")) {
				var cr=JSON.parse(localStorage.getItem("croped"))||[];
				info.data.forEach(function (v) {
					bmkptr=bmk;
					v.loc.split("/").forEach(function (a) {
						bmkptr=bmkptr.value[a];
					});
					cr.push(bmkptr.value[v.name]);
					delete bmkptr.value[v.name];
					bmkptr.data.modified=(new Date()).getTime();
					bmkptr.data.order.splice(bmkptr.data.order.indexOf(v.name),1);
				});
				localStorage.setItem("croped",JSON.stringify(cr));
			}
			else if (info.act.match("copy")) {
				var cr=JSON.parse(localStorage.getItem("croped"))||[];
				info.data.forEach(function (v) {
					bmkptr=bmk;
					v.loc.split("/").forEach(function (a) {
						bmkptr=bmkptr.value[a];
					});
					cr.push(bmkptr.value[v.name]);
				});
				localStorage.setItem("croped",JSON.stringify(cr));
			}
			else if (info.act.match("paste")) {
				var cr=JSON.parse(localStorage.getItem("croped"))||[];
				cr.forEach(function (v) {
					if (bmkptr.value[v.data.name]) {
						if (bmkptr.value[v.data.name].type=="link") {
							if (v.type=="link") {
								v.path=info.loc;
								bmkptr.value[v.data.name]=v;
							}
							else if (v.type=="folder") {
								var a="temp_link_"+v.data.name+"@"+(new Date()).getTime();
								v.path=info.loc;
								bmkptr.value[a]=bmkptr.value[v.data.name];
								bmkptr.value[v.data.name]=v;
								bmkptr.data.order.push(a);
							}
						}
						else if (bmkptr.value[v.data.name].type=="folder") {
							if (v.type=="link") {
								var a="temp_link_"+v.data.name+"@"+(new Date()).getTime();
								v.path=info.loc;
								bmkptr.value[a]=v;
								bmkptr.data.order.push(a);
							}
							else if (v.type=="folder") {
								v.path=info.loc;
								mergebmk(bmkptr.value[v.data.name],v);
							}
						}
					}
					else {
						bmkptr.value[v.data.name]=v;
						bmkptr.value[v.data.name].data.modified=(new Date()).getTime();
						bmkptr.value[v.data.name].path=info.loc;
						bmkptr.data.order.push(v.data.name);
					}
				});
				localStorage.removeItem("croped");
			}
			else if (info.act.match("cancel")) {
				info.data.forEach(function (v) {
					var cr=JSON.parse(localStorage.getItem("croped"))||[];
					cr.forEach(function (v) {
						bmkptr=bmk;
						v.loc.split("/").forEach(function (a) {
							bmkptr=bmkptr.value[a];
						});
						bmkptr.value[v.data.name]=v;
					});
					localStorage.removeItem("croped");
				});
			}
			else if (info.act.match("sort")) {
				var Temporal_Bookmark = {};
				var Bookmark_Folders = [];
				var Bookmark_Links = [];
				Object.keys(bmkptr.value).forEach(function (val) {
					if (bmkptr.value[val].type == "folder") {
						Bookmark_Folders.push(val);
					} else {
						Bookmark_Links.push(val);
					}
				});
				Bookmark_Folders.sort();
				Bookmark_Links.sort();
				bmkptr.data.order=[].concat(Bookmark_Folders,Bookmark_Links);
			}
			else if (info.act.match("change")) {
				info.data.forEach(function (v) {
					if (!v.name) {
						return undefined;
					}
					if (bmkptr.value[v.name]&&v.name!=v.pname) {
						if (!confirm(v.name+" is already exist.\noverwrite it?")) {
							while(bmkptr.value[(v.name=prompt("new name",v.name))]) {
								if (!v.name) {
									return undefined;
								}
							}
						}
					}
					bmkptr.value[v.name]=bmkptr.value[v.pname];
					if (v.name!=v.pname) {
						delete bmkptr.value[v.pname];
					}
					bmkptr.data.order.splice(bmkptr.data.order.indexOf(v.pname),1,v.name);
					bmkptr.value[v.name].data.modified=(new Date()).getTime();
					if (bmkptr.value[v.name].type=="link") {
						bmkptr.value[v.name].value=v.url;
					}
				});
			}
			setlocalbmk(bmk);
			console.log("setted");
			window.parent.postMessage({
				"bmk":bmk,
				"type":"changd",
				"croped":localStorage.getItem("croped")&&true
			},e.origin);
		}
		else if (e.data.type.match("tabcontroll")) {
			console.log(e);
			var info=e.data.info;
			var tablist=(JSON.parse(localStorage.getItem("tablist"))||[]);
			if (info.act.match("open")) {
				tablist.forEach(function (v,i,arr) {
					if (v.tabid==info.tabid) {
						v.title=info.title;
						v.url=info.url;
						info.tabid=null;
					}
				});
				if (info.tabid) {
					tablist.push({
						title:info.title,
						url:info.url,
						tabid:info.tabid
					});
				}
			}
			else if (info.act.match("close")) {
				tablist.forEach(function (v,i,arr) {
					if (v.tabid==info.tabid) {
						arr.splice(i,1);
					}
				});
			}
			localStorage.setItem("tablist",JSON.stringify(tablist));
			window.parent.postMessage({
				"result":"complete",
				"type":"tabcontrol"
			},e.origin);
		}
		else if (e.data.type.match("test")) {
			localStorage.setItem(e.data.name,e.data.value);
			window.parent.postMessage({
				"result":"complete",
				"type":"test"
			},e.origin);
		}
	});
	function mergebmk(origin,target) {
		var order=[].concat(origin.data.order,target.data.order);
		for (var a in target.value) {
			if (origin.value[a]) {
				if (origin.value[a].type="link") {
					if (target.value[a].type="link") {
						target.value[a].path=origin.value[a].path;
						origin.value[a]=target.value[a];
					}
					else if (target.value[a].type="folder") {
						target.value[a].path=origin.value[a].path;
						origin.value["temp_link_"+a+"@"+(new Date()).getTime()]=origin.value[a];
						origin.value[a]=target.value[a];
					}
				}
				else if (origin.value[a].type="folder") {
					if (target.value[a].type="link") {
						target.value[a].path=origin.value[a].path;
						origin.value["temp_link_"+a+"@"+(new Date()).getTime()]=target.value[a];
					}
					else if (target.value[a].type="folder") {
						mergebmk(origin.value[a],target.value[a]);
					}
				}
			}
			else {
				origin.value[a]=target.value[a];
				origin.value[a].path=origin.path+(origin.path?"/":"")+origin.data.name;
			}
		}
		origin.data.order=order;
		origin.data.modified=(new Date()).getTime();
	}
	function getlocalbmk() {
		var bmklength=Number(localStorage.getItem("bmklength"));
		var bmkstring="";
		for (var i=0;i<bmklength;i++) {
			bmkstring+=localStorage.getItem("bmkbody"+i);
		}
		if (!bmklength) {
			return null;
		}
		return JSON.parse(bmkstring);
	}
	function setlocalbmk(bmk) {
		var bmkstring=JSON.stringify(bmk);
		var bmklength=0;
		while (bmkstring) {
			localStorage.setItem("bmkbody"+bmklength,bmkstring.substr(0,4000));
			bmkstring=bmkstring.substr(4000);
			bmklength++;
		}
		localStorage.setItem("bmklength",bmklength);
	}
	window.addEventListener("storage",function (e) {
		console.log(e);
		if (e.key=="savepages") {
			
		}
	});
	window.parent.postMessage({
		"result":"complete",
		"type":"iframe"
	},"*");
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

var css =(function () {/*.__textfield {width:100%;}
    .__bottom {position:absolute; bottom:5px; overflow:hidden;}
    .__left {position:absolute; left:3px;}
    .__right {position:absolute; right:3px;}
    .__link {color:#aa8888;}
    .__folder {color:#88aaaa;}
    .__checked {background-color:#2f2f2f !important;}
    .__extension {word-wrap:break-word; line-height:10px; vertical-align: middle; box-sizing:border-box; z-index:11;border:1px solid #000000;font-size:10px;}
    .__disabled {filter:invert(100%); border-color:#ffffff;}
    .__buttons.__extension {width:20px; height:20px; display:inline-block; font-size:10px;}
    .__checkbox {display:inline-block; width:10px; height:10px; border:1px solid #000000; margin-left:5px; margin-right:5px;}
    .__hided {display:none !important; }
    .__invisibled {visibility:hidden; !important;}
    .__innerimage {width:100%; height:100%;}
    label.__extension {width:70px; height:20px; display:inline-block;}
    #dir {height:20px;}
    #pastebmk {position:absolute; bottom:0px; left:0px; width:100px; height:25px;}
    #bmkmain {background-color:#ffffff; text-align:left; position:fixed; top:20px; left:20px; width:320px; height:500px; z-index:9999; overflow:auto; max-width:calc(100% - 40px); max-height:calc(100% - 40px);}
    #bmks.__copyactive {height:calc(100% - 130px);}
    #bmks {height:calc(100% - 100px); overflow:auto; font-size:15px; line-height:20px; width:100%}
    #bmkmain label {display:inline-block; border:1px solid #000000; margin-bottom:10px; min-width:90px;}
    #bmks span {font-size:15px;height:20px;}
    #bmks input {font-size:15px;height:20px;width:200px}
    #bmktoggle {position:fixed; left:0px; bottom:0px; width:50px; height:50px; opacity:0.5;}
    #hitomi_download {position:fixed; left:70px; bottom:0px; width:50px; height:50px; opacity:0.5;}
    #gototop {position:fixed; right:70px; bottom:0px; width:50px; height:50px; opacity:0.5;}
    #gotobottom {position:fixed; right:0px; bottom:0px; width:50px; height:50px; opacity:0.5;}
    #bmkmain #bmkname {border:0px solid #000000;}
    #bmkmain #bmkpath {border:0px solid #000000;}));
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
/*from https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript#805755 */

!function(t,e){
	"use strict";
	function n(){
		this.dispatchEvent(
			new CustomEvent("long-press",{
				bubbles:!0,
				cancelable:!0
			})
		);
		clearTimeout(o);
	}
	var o=null;
	var u="ontouchstart"in t||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;
	var s=u?"touchstart":"mousedown";
	var i=u?"touchcancel":"mouseout";
	var a=u?"touchend":"mouseup";
	var c=u?"touchmove":"mousemove";
	if ("initCustomEvent"in e.createEvent("CustomEvent")) {
		t.CustomEvent=function(t,n){
			if (!n) {
				n={bubbles:false,cancelable:false,detail:undefined};
			}
			var o=e.createEvent("CustomEvent");
			o.initCustomEvent(t,n.bubbles,n.cancelable,n.detail)
			return o;
		};
		t.CustomEvent.prototype=t.Event.prototype;
	}
	e.addEventListener(s,function(t){
		var e=t.target;
		var u=(e.getAttribute("data-long-press-delay")||"750")*1;
		o=setTimeout(n.bind(e),u);
	});
	e.addEventListener(a,function(t){
		clearTimeout(o);
	});
	e.addEventListener(i,function(t){
		clearTimeout(o);
	});
	e.addEventListener(c,function(t){
		clearTimeout(o);
	})
}(this,document);

var dataurls= {
	"paste"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD8SURBVEhL7dUxTgJBFMbx1XgPC2NJoSewtLSwQw5hhQVUFkqDx4Ab0FB4A7XVjgOQcACR/7f"
	  + "uSyYvM7OyErKJfskv2Rlm3stu2NmiLTnENW5xrIld5wlflSUaNznHG9awgmaKjpszK4xxgGxescAIj3iGCuj6Eoqfl0k1vkI2n1Bxyx200cfP"
	  + "H0Hj+3KUiRY9fF+WsUIpYTQO90bjF13AHkNMmEYNtkn7G+hl66GfoL1znCKZXAMV1+91PpCMFqQapP6yYWrX/Df4Aw38YRdmJw3suB7Av0gz/"
	  + "LrBGV6gO9HCmFx+cpfJ3MA3i3lHo+hz2EXs2DZDnGBfKYoNj8aK9uWSNrcAAAAASUVORK5CYII=",

	"cancel"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVEhL7dPLCQIxFIXhLNyJbrQA63AnFqAFia9arMBHB27VDmxBEXci+p/IwITRxei9m8E"
	  + "DHyQZJne4k4RKponFa2ifLo54xJlhapjgBm1uWqCDLbKNv3HFHnO0kcSiQN4JQyT5tUV19LCE3r1jgEIsfvIIev+MQrsUi2O6gopM48whapcK"
	  + "HOLMIQ2owCXOHOJewL1Fa6iAjr55xtDmunAtLVhEPe9jA22eXDQtiFJm/Im+PLnF2QOlzDhPp2WHGd7e3n8qmxCeHp1rU1t2vOAAAAAASUVOR"
	  + "K5CYII=",

	"edit"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFQSURBVEhL7dPPKwRhHMfxWcWVRBJyd+OERDnI38HfoHXh6Nd/ws1/4KokSiK5cEdCHPx4v3d"
	  + "NTds+9tk8k4tPvWp2dub5PvvZmew/7WYCp/jAZwSvO4H3RcWLb7CNrQg7uIX3ReUdLt5O1uF9UfFnb9YPy6nLC/MBpdRVHFBKXcUBxePYrML7"
	  + "gvnzAZVvofx6QAeusI8VTKETeZJU5OI+kvnje4gemCQD3LmLj2EZrzhCL0ZxjWCKj2ZowCT8bqn2KcsW8YJj9GEEweQv1xpCA7pgLW9wcbOAZ"
	  + "/jm93silHE4JO+32QDTDWtx5y5u5uGQMwx4olVavcl2bi0u6uJmFk84x6AnfkqxrmoT/qF2bi0OmYOZwSMuMOSJUBrrauTTMgw7txZ37uJmGg"
	  + "84qH1KEDu3Fnfu4mYP9/XDNLHzS7jzXfgrN5A0VmYtd2DxrPIF/Z6XYmBn5SYAAAAASUVORK5CYII=",

	"add"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVGhD7dgxCoAwEETRtNqIJ/DWgqfV3XbRYDCRSfgPpgmC/kIEEwAAwCuT7Qjzs+4stjP"
	  + "Mz7pDiBpC1BCihhA1hLQ229aCbbYY4md31z7N71ndbosP1np+z+oI+TBCcoZ52UvxHVFDiBpC1BCihhA1w4QM8xMbAAD8K6UL3iPe8XBShfQA"
	  + "AAAASUVORK5CYII=",

	"sort"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVGhD7ZlL6A1RHMePdyTylrxSZIGtPBOyETuKkvKK9E+i2MjKY2WFjSXWIiWPLDzzihQ"
	  + "bFIWFDYmV5+d7zj11mu7Mnbn3/OfOn/nUp/v73f+/e8+3uTNz5hxTU1NTmAm4BtdVVI1NY8xkBX7DPxVXY1yOqdzBD6jUKyuqxqYx3sJU3uFl"
	  + "V1YajVFjTaUOUjJRgwxovHaDqEGe4GFXlk7UIF/wvCtTmYVH8XjDPRiD0oNsx9/or/+fcCh2StQgn/GsK3MxBAe7smOiBtmJ811ZOlGDdJOoQ"
	  + "U7ielemounEI3zcxGs4BtshapA8J/sSvIrXA++hgqgei+1QepDeog7SjDxB+uF0nJHiNByFw7EIpQfZh+EDUZq/cCnmpfQgE3Eb7sBdeCBFTV"
	  + "2KHJXSg/QWdZBm5AkyBfdj8qe0F/Vza+YWHI1ZlB6kB5ud3K1UmCzaDrIZL+JI2zmSQRbgXdRlNWQqJi+7Wepy3Yq2g2jO9BMfog8TBlEI9e9"
	  + "xvN7oZdoOIjahwmgSqDA+yMJGrRAzsQw6CiLCMN/xOWaF0MrlfbyB4cQxr5pwrsIkHQcRPow/MbOOhAbxAJNT+DSf4ZvAV7gBk0QJInyYMn9O"
	  + "IdGCCJ3guk90g6hBukkdpGr8n0GO4SlXWs7gIVdaLuFuV5r+qEUFbY2JYfgUl9nOPZe8xHm2M2Y2vsDJtjNmMeqe5GcNa1GziIG2M2YrXnGlp"
	  + "VCQ26gP96gOj1Y4RdEAdE9ReKH5lXo9TAkNVP1G2xmzGtXrfaH/Uz/XdsYcRPU+2GnU93kKBbmAN11p0VbXOVdaXuMJV9qlUH2RpuxCz+E/0N"
	  + "/MdAS0Buzv0otQA51jO3ckdV+aZDsXTPuEWmYVR/CtKy2FgmixOXz8HIH+g4UGO8iVFq1R6SfmGdd49ST75OQy/Ls+J1zz0l5M+IzSMkhf2Az"
	  + "V+fMRMzdDteXbF7anv2Lm9rTQIdcRCTfpq6TGVsYzT03NP4QxfwEEVaw9vxJoVgAAAABJRU5ErkJggg==",

	"all"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVGhD7ZlL6A1RHMePdyTylrxSZIGtPBOyETuKkvKK9E+i2MjKY2WFjSXWIiWPLDzzihQ"
	  + "bFIWFDYmV5+d7zj11mu7Mnbn3/OfOn/nUp/v73f+/e8+3uTNz5hxTU1NTmAm4BtdVVI1NY8xkBX7DPxVXY1yOqdzBD6jUKyuqxqYx3sJU3uFl"
	  + "V1YajVFjTaUOUjJRgwxovHaDqEGe4GFXlk7UIF/wvCtTmYVH8XjDPRiD0oNsx9/or/+fcCh2StQgn/GsK3MxBAe7smOiBtmJ811ZOlGDdJOoQ"
	  + "U7ielemounEI3zcxGs4BtshapA8J/sSvIrXA++hgqgei+1QepDeog7SjDxB+uF0nJHiNByFw7EIpQfZh+EDUZq/cCnmpfQgE3Eb7sBdeCBFTV"
	  + "2KHJXSg/QWdZBm5AkyBfdj8qe0F/Vza+YWHI1ZlB6kB5ud3K1UmCzaDrIZL+JI2zmSQRbgXdRlNWQqJi+7Wepy3Yq2g2jO9BMfog8TBlEI9e9"
	  + "xvN7oZdoOIjahwmgSqDA+yMJGrRAzsQw6CiLCMN/xOWaF0MrlfbyB4cQxr5pwrsIkHQcRPow/MbOOhAbxAJNT+DSf4ZvAV7gBk0QJInyYMn9O"
	  + "IdGCCJ3guk90g6hBukkdpGr8n0GO4SlXWs7gIVdaLuFuV5r+qEUFbY2JYfgUl9nOPZe8xHm2M2Y2vsDJtjNmMeqe5GcNa1GziIG2M2YrXnGlp"
	  + "VCQ26gP96gOj1Y4RdEAdE9ReKH5lXo9TAkNVP1G2xmzGtXrfaH/Uz/XdsYcRPU+2GnU93kKBbmAN11p0VbXOVdaXuMJV9qlUH2RpuxCz+E/0N"
	  + "/MdAS0Buzv0otQA51jO3ckdV+aZDsXTPuEWmYVR/CtKy2FgmixOXz8HIH+g4UGO8iVFq1R6SfmGdd49ST75OQy/Ls+J1zz0l5M+IzSMkhf2Az"
	  + "V+fMRMzdDteXbF7anv2Lm9rTQIdcRCTfpq6TGVsYzT03NP4QxfwEEVaw9vxJoVgAAAABJRU5ErkJggg==",

	"newfld"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVGhD7Zo5rA1RAIZfYhd7ZY8gGiERQSnREFthaUS0Yo1GKB8iEh0SnS2CoFHQEBqhoqM"
	  + "QBAWJXYLC7vvGPc/cefPu3Ce5c8+T+ZIv754z52bmvzPnnJkzr6OioqJphuARfI+/mvA5LsLoOIwe4A98V+AHtO1HnIpR8QZ/4oykVMwpNMwt"
	  + "7GdFLHhQ/tLNMgKfoN/bg6NLcjg2pLdBZCF+R79bpk9xLeZig94GkTX4EPP6UisM/dMfcC5241+DtIP96PEeSEoZ+lKQdejxHk1KGUKQweiQG"
	  + "qsTsTCIw++32ueY/Vr722MQ/YyPI/YZ+oM3DOKs7qmLnU5sGOS/6ux9gSpIbFRBYqMKEhtVkNiogsRGFaRsBuJknIczcSSmiT7IYryILvx5PE"
	  + "EXGu7gdhyG0QbxGegGhgP3uegRuvh3D9PBXKoNi4NRBXFJ5wW6/1e4A8dimkG4DG9jCBRVEM9ECHEFXb1MMwEH/PnYxVYM6wrHrMjSjiDX0f1"
	  + "exuz68Xz02fxQUqpnPfq9TzjFijRlB1mC7vMljrIig5eS288kpe4cR7fbX+ooO4ijk/u0T+RRFGQ8uiz0BcdYESgziNe9I5Gj0zgrcigKIlfR"
	  + "NquTUo0ygzjZuT+H2MACdIU96LqubW6m6nQF+nZNfJ1hG5eHuigziAft/hxOZRKGRbdm3IWyBS37yrALK8oK4lsx9+dkJ15qjk4XUnombOPKY"
	  + "rr+LM5GMZBt9iWlGmUG8TbDM+Dw6WSXRzN9JMzwG5NSDTue675lEWbp5UmpO0VB+qN3AraZZkXgPlp5ENOdq1WG4df7qTyKgmxGt3szWcdKbN"
	  + "crhW2YJUyYp5NSPdPxLbp9qRVZ5qBnJN25WukltK94m74B0/jCaTfOSkp/McQDNMQ5K2JhE4ah19uOniZI+4SXky9EbWsfG4pR4dlwxPQAve2"
	  + "4hnvRkJ6Vk/ga3a7nMboQASfFE5h9Okx7F+07fQLnmFW4E/3/GM+M80TdEFtPR8dvE7bxLI9A09kAAAAASUVORK5CYII=",

	"up"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALlSURBVGhD7ZhNqE1BAMePr0IpNpLFK0IpNmQjHz31LNgjSYpIiYXEAisLeRuvXkrpLWwslC2"
	  + "SRBaSvY2djZJvsSD8f3POaNzmns+Zc506//plZs7MnPm579yZe5I+ffr06Wy2idviQUVuikNijhh5Vonv4qN4UZF34re4KxaKkeaIYDEbTK1a"
	  + "+CTOi1/ioRipzHGByJip1ctJgcwjMTKZECLkhEDmudgslgRmtshNKBFyWPC8MV9oPgnWOjQhRchycUBcEpcD8kz8FCuFN6FFYmWHYJ27TM2Tr"
	  + "ohsEazzi3gv3or7YoUw6ZoIe9Z1wWb8VTwWJl0T2W1qaW6IH2kxngib5WRGiCOMT+SaoM0khggLnxHMC5SbyrQu4kpMZYSQaVVkUGJWRgiZ1k"
	  + "R8EjYhZFoRyZOwaSoTXaSMhE0TmagiVSRs6spEE8mT4GDnHrspu4e9OjLRRHYKxj0RrgRHeX6XHDS1NJRp45oNYxjLHBM0FCSayHxxTzD2NA2"
	  + "KlaCNeW3sPVwZxtDGHMxVlKjPyAJhZXgLw0JfZnWfCNfoQ1/qjGWOMokqQlyZp2JdVvaJcI0+lKtIkOgihAXxq3CRYB7m84lwjT70rSJBWhFx"
	  + "UyRSN6VF6LCxAWsEKSNCX98cefAlUUokBJtEkQh93DFVKRQ5J442YK+YK4pE5gn6+ubI44ooJcJNBnfYwZdiZa4XidS9R+lnZK3gzcQeQZaJz"
	  + "4I39WS94CUZ/5Ltguv0I/wvM555hok0uUdpEduRPzHCZNT3m1o6gTsR7dTtTRnnzuMTaXKPaJ8I7bE/EfcehSL7BJWtoukzQj3WM2JPDGdMLc"
	  + "0d8SYtJslSwZu7V+KU8H1jVMH+iflEmnwzHhMfxDdxUVwVnNumxd+Mi9eCm4XCJxISJG4Jjjz/hN8Hq4VvV62CfWB9IlzzjanDYhE1Rc9IZ9K"
	  + "L/G+xIhcELxyAcudE2LxYtA+7eXYmbLJnB2Dn7zM8SfIHVRHsBwr8ASgAAAAASUVORK5CYII=",

	"import"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEYSURBVEhL7dWva0JRGMbxO5nVsLS0uGBY0SA2mwPDLEOWlvRP0ComDZaBYBSWjGNleWBaWhc"
	  + "MYnOYBhrU73suF0TmOe85acEHPnAPnHOf+/tGJI0pdgFWuIM1N0gmf3mYQ9Y9wZqk4N2M9GnhXGBNAU1kzciS0AJ1fAoeUI839dEUpNDDFt5n"
	  + "6iq4xCtkTtCltBVc4HDnhzb4wRLyJfjGBB8YowQTW0EbxzvWkgMzsRXIUaxxvFijDxPXPahCLkeycIERhuiiA3kfGqjhHkVkYOIqkFTwC9e8P"
	  + "6MpkOQxw5sZeURbILnCbbypj09BUEILniE/nrIZWRJa8P/+B5/IeXiBquAaMjHUI5yRN1E+UL4GkEf3RKJoD6oapuFu11fgAAAAAElFTkSuQm"
	  + "CC",

	"export"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEUSURBVEhL7dUxS0JRGMbx2+xHsF0QtxZpq8mtXRe3mgVJaG1ocpVoj/QTiKuDCE1BOAh+gSA"
	  + "bqiVB/8+RGzfJc46HMzj4wA/OK+fe56L3ehMyxjLAJ87gjDZ/43kHM+i4FpzRxpf10jtVHAqsKeIaZTM5ElKwU2IVNPDvbRurYIgFmmbKJGaB"
	  + "ziVtHMHEVXCOezyhjxEm0MP2Dj3R6YmzVGKiwVYwwObBvi5hFraCLjYP9PGBE5jBVpDHBWrQFen+v8UdOtDX94g3pCf/wu8d5SrwTfojz3GqD"
	  + "9LELHhFwUyZxCooIbde/k2sgq0JKahAL566mRwJKdi/98EUeih83cC74AfaHEJ/0c5coRfgAcewJElWV7ymskrVIa4AAAAASUVORK5CYII=",

	"backup"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVEhL7ZWtTsRAFEY3QeF4CQTBoQghKCwej0CC5AX4MQg8hv/wDHgeAgIOEgwOSeCcdi+"
	  + "ZNFOYaSr5kpPe2d3eM3sz3Z38pzZzsF7JGhRnFb4GcAxFCcEuuLvT6TrdseubpH6bXoskIfBq9sB1mjvYasvmvUOweZGkRJAmBOYEXC83q570"
	  + "Cdx1jlTQvTeb7oc2Idc4JcY1SFCTUQSz4LOSS7Ug6mAbbP4Jj3ALHucZMIMFl3AEG2Ae4B2ewfevQck8fEC1oHuDO39qy59TdgVKfPiWoDclg"
	  + "h3wdZubkPhNY1y9KRHYxLHkJBfwq6REYGziWKol0dTTIVGnP3ayADZxLDnJGWQlIfgLT4uiaknNH84KGJucQ05y0KxGSE7iQXhty3GixLEocW"
	  + "wvcA+jRsk+uHOaTxa/Ac9Gmu9xpJJiAAAAAElFTkSuQmCC",

	"merge"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFXSURBVEhL1dW/K0VhHMfxI4UyYCGLkJTCQBYLu8FyDWbFhs0qg8EoIn+FDAwyGkiUwoJSfid"
	  + "lsnp/zjenc85z7/Uc96R86lXfM9znc+6553lu8JdpRFNMA3LLNu5xE/OIDVScejzbmEgNzjCDwYx6UIUwehR3Njrpxg72MzrHKsKUK/ht2nFr"
	  + "oxV84ggnOTlFdNMq+EAvOnMyhkTBT4+oGqOYRgF6jculDd4FfbjEIdagV/oFKisV74JWPEB3HU8XVDoRXrnxLljBso1OBqANWSzeBccYsrFo9"
	  + "LkOGxPxLtBO7rexaK6gxdLxLtjCvI1OtMiTjU68C3SmaBHtkXh0fh1gNrxy412gjOMV65jCIq6hHbuLWqSTqUBpxhxUsgD9LjotN7GHdEnmgl"
	  + "L5LtE3iY5nkluBooVHbIySKKjDG1oQ/8usxDAuEGUJelvec6K7n8S/TxB8AR2GeWDyey0JAAAAAElFTkSuQmCC",

	"expand"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVEhL7ZLLCYRAEEQniQ3D/E8mYUKrvfCgpj9DH7ys+KAQp6qrBWc8iu9CFVkWBbIQqsi"
	  + "yKKDmcelzqYtlbUY7AlrOs7NEy3VJAMMPrJZkWXoCanSWVBntmfCGFux24LAz8/wH+J4lNmhF2+9txs7M0/KXP+TWn+yvlw3eek3V0HJfAFVG"
	  + "eyYwOuWQZekJYHTLwS+hJ4BBsFMOugQF1PSqyLIokIVQRZZFj2CMEwcelwlE5J32AAAAAElFTkSuQmCC",

	"remove"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACFSURBVEhL7Y5BCsMwEAP9u+ZX/Wv6kHR9E2FktKWHEDIwBwlr8Xj4F+/yODm7nzkfS42hceK"
	  + "1oB+ubENHVrahIyvb0Nhl7WJo7LJ2MTR2WbsYGrusXQyNXdYuhsYuaxdDY5e1i6Gxy9rF0Nhl7WJ0nNjmU9Ihci/bbOUc0kF1vnmVt2SMLxWM"
	  + "rm3WZuxXAAAAAElFTkSuQmCC",

	"copy"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVGhD7dqvSgRhFIbx0apRMOwdmEwWvQAtbhKDVQRvwD/NC/AKlC2iRTDaBYuIFovXoAa"
	  + "jTX2+dsKBGb45Z3ThfeAXlhnm27fsht1GKdW7bdziKcEyBukMP4nWkN4Y3uGRBhlyCe/wSIMMuYM99BxbwRaQ3j3skH1MZRry3+o6ZBYbOMBh"
	  + "oB3Mo3ddhozwDHtfpDf0/mRrGzKDB9h7MnxiEdW1DVmFvZ7pGNW1DdmFvf6B6yAvsM++QHVtQ8pre73cH9UR7LOvUJ2GBKQhXhoSkIZ4aUhAG"
	  + "uKlIQFpiJeGBKQhXhoSUOiQTewZS7BNzZC2NKRDGlKThnToT4e8wvsxp0Z54/bZqUPKx7M9LNMp0prDO7yDI31jBamV30W+4L2BKCcYpPKNP8"
	  + "EjvD8F1LrBOpRSvWuaX5uuctVnE+66AAAAAElFTkSuQmCC",

	"move"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGESURBVEhL7dS/K0ZRHMfxg/xKfsdAShaTMhkM/gBRREpSisGg7CaDycSoGBhIPCIGhRgUq5L"
	  + "BrKTkRyLk1/tzn3sMt4fO5QwGn3r1nHNu93vuec651/yHFIe/3lOJCSwEPc9pwSPe0a0B31mFit8jTwNxkoX0ZDNlimCfflEDrinAHB6gAjMo"
	  + "RDR9UHFp14BrtFm66TSk9jKi2YSu3SJHAy7JxRuOkYkMHOEF1bDJxgU0wawGXKP/9RWHSNMAOYAKaZJtDKAEeoBm1CNWtqCCe9gJ21HP2EAvt"
	  + "GexUoFd2GJaQRumcRWOnWMsbOswJNAF/cXO0RtalWx+Rkd3CnbyqDvMoxXapx9lHyqmVXRgCVpFdLJr6Ig3wSn5aIBOmQpMwkbXerCOJ+i6Vj"
	  + "OOcnwbnaZR2ButRqSKvqraj9Kg5xA9mQqeYQV2ohp4yRpUsDboGTMM9QeDnofYL2Zd0DNmBOr3Bz0P6YQK6lToxdMbfYMyeMsQLqGJTvDVBv8"
	  + "6Oo5/McZ8ADxubY+z76C3AAAAAElFTkSuQmCC",

	"end"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVEhL7ZVBCoMwEEXTfYUu2oXgUbrsgbxF9z1aL+DeS7T/RwfLMAlxQqALH3wSBzMvqMR"
	  + "wsJcL8qgMeyS5I5/KsEcSEYyItbtcuKZYkL0pQdFa66brOmpOSLdMIy4Bm0/IM15tsPkLeSNnFoBLII1YE4lVIy4B0Q2t5sQtIL8Sqzn5X0HT"
	  + "R2S9UKtGXIIBmRG9W5HwE5azxyUg/TpqKLkt04hbUMouQfPDriZZQfMfzoEihC9fkncGqArhuAAAAABJRU5ErkJggg==",

	"bmktool"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARhSURBVGhD7ZpZyKdTHMfHOriwXEzNUC64cWEr0lguRpE9oWxXsjWWcjWlaWiGO5Q7pJCIUG5"
	  + "wYSkXQiFE4caFpSwX9rUwPp+8v/rNmfMsZ+Z5/vOq+dan9995zvktz3O25zzvit3arf+PNsKnA1hn2esl2DrAi7Ds9Q3Ugs9YZ1nrUMgBXwBn"
	  + "LOHvfG0NLDsdBNfCGxCBfgGlvoS4/jpcA7bd5ToY7oAfIQIMnoNSz0NZ7wfQhrZ2iS6Cr6EM7B94Gy6FUpa9A9Yp22lLm7NoJTwOV0Pcsb3hf"
	  + "igD+QhuAMfJkKxjXduUdh6AfUDZ7fRtDMayw7oVwsEf8Cy8ksrkc/BO7wmtso1t89iRV0Ff+owyY9khrYZa3894p6YYrIfAE1DzERiLMTXrEa"
	  + "gZDLbA1HLQ13wFxtSkE+FvCAM3wdnwKHhnNsBc0rY+9HUW3AwRhzEZ2yjtAc7x0fh92AtC+y79HdIBcDJcvIS/94cxyj70/SFEPMZmjIO6EqK"
	  + "RnA4tOh6ehl8h2xHLvHYctMgYsh1j7JV3zFkoGvwCJ8EYeefugdwlu7DO3ZCfdJ+MwViivTH2Pl0f2Z2QnWpgaKEyIKfL3E6+BxdAcQUvr9tm"
	  + "KBl95yTEGEd1r6vgT4iG3sG+J3MvZEfvwTng4hny97ngmMt174Iu6TM/YWMytibl3epf0LVe2N+zM8dA3yq8H1gn6tv2GKhJn/qOusbULO9oG"
	  + "HjXgg49A1HPJzFmVjOZDyDamViX8hM0pmZthjBwnwUVOeDy7HQejNX5EO1+hq7Bm/d1t1vQqochDGyyoKJTIOo4sPOYGJIbw58g2q+Fmm6DqP"
	  + "OQBa16AcLAegsqugSijlv3VjmbRXsXzZpuhKhTe8cZ1JSJRJ056dSYruW2I+rYteI9olTUmZNOTTnY4/qcdCpPv06rXcprglNlbQ2J63IaHDE"
	  + "B2sl2OzV2QTwW8oLouuI6kRXX5HALJpB2st2qWrcobgCzUZ+MNyKm43xtIYlMvWl0o5inWHkNXp4A7WS722hnt/FuAHM3WyTbaWdfrI6Gp6Dc"
	  + "es/Ndhp61R17vuSAd9tht8wOPda5fgLyUZVUVTt8cDp+DNzgbYAWZYcLnbXU0HGQRzdjldu1JnIUnPnfz200OpExB3RPgodrQ8ptWhI5Ab4Fd"
	  + "w/l7nh0Iir3w9/Axa48MvW483LoOzLN9WuJ+J6hjax1kG/kd5BP7JsSiUNsF8hY2bsOsT8Bt9y1Q+xcr0zkFrDc3UPssi+E3yHauDhfAVlNif"
	  + "TJ2aj2WcFJ4i24DEL5ek7EO1x+qrO75vd0u5WHFqUmS0QZiGfAtaOe/BKUy8sn4mD+DHKdwO50KtQ0aSIhu9118CaE4fzpLTssE1GWfQy53lf"
	  + "ghrRLsyQSOgyycTeOfgjNZbVE1CqIfZnf4o+EPs2aiHK6zA5KuhJRB8KDMOaL7+yJDP3DQF8iLZo9kdq/cGSHC39DnFLZ4VwsRDXHU7MQ1RxP"
	  + "yIqt/wIssC5yYp5cVQAAAABJRU5ErkJggg==",

	"addall"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFqSURBVGhD7dkxK0ZRHMfxazQppdRTShmkTAYzyjsQmUxK2bFKWa2PXcrGarQYDFgMXoSXwPc"
	  + "U9et2dE7n3nPuof+3PtN97tP5KVeep7Esy7KsTG3gAjeVcGdZR3QTuMRnpcaIage+N6jJNoLdwXdzTW4R7AW+m2vyjGCv8N1cE3fGYDakoKQh"
	  + "j/A910tyZ9AzJQ3ZxdC5M+iZbMjQZRkyixUxD20Sej3FCFqWIcfQ61fQlqHXU5xDsyF6kw3poMiQIbIhepMN6bEsQ/bwJM6gLUCvpziENg39g"
	  + "7mEYKEhQzy1krIh3/2ZIYvYEqvQpqDXU7gfhmsT+g/WKaILDSnZAfQsD4jOhmSo05D2B3TXOOrZDGLqNKTER6Y/v8yhOg0p8SF2e4j7umDfwz"
	  + "3a9b53+F7neHMf3esb9K09pH3gFL+2hlxf9MxByzqkZP9myAnuPd6gh/2A73VO1XV6atWUDaktG1JbkUOa5gsHtGap+1MkkgAAAABJRU5ErkJ"
	  + "ggg==",

	"openall"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGCSURBVGhD7ZmhSkVBEIYPRqNBtNzkA/gAFsHsAyhWwa5YFDUZfAARNBjkZkE0iBhMJpPJIDa"
	  + "jYDLpPzgDg6zrnt29u4fjfPDBZbh7hg/ulnMbwzCMXjADD+AlvK7oBdyD07A1K/ADfnbINzgPg5mFXYsQKWYKBnEK5eArXIer8J5n5BXPyGOe"
	  + "kU88y+kWfIeyYxcG8QjlEP3EhDMo830aMEtQ5nc0GAHbUHbQnQniBcqhORowNUOiduiQQ7jJPvCMvOUZOeQZ+cyz3OodUSFd9H+HnMOjDngDk"
	  + "0L0Za9J8mW3kMxYiIWMCAvJFTIGF78/JlE1hCJOID1nhwYJVAvREWJKTJUQV4QYG1M8xBchxsQUDQmJENvGFAtpEyG2iSkSEhMhhsYUCZmACw"
	  + "71ctL1HXIc/kXRO/KTAZTnkClYiByyEGAhDpJD9Au6EJeh4AtZg67zv1n8BZ1e4gvJtcNLb0LoBbXrJVmIG1DwheTaUYScl70qvQmZhPpPTcM"
	  + "wDEPRNF/+tmVvWe4R+gAAAABJRU5ErkJggg==",

	"search"	:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKkSURBVGhD7dg5rA5RGIfxa4mlsVREJHaVhpoG0ZAoRIWGAq2eCCVCRYVYQy+CkCCIWBohgsQ"
	  + "SBQ1iK+yep/iSN5O591vuOXPnS+af/Kp7v/OeMzNnmRlo0qRJtizADhzDBdzHTZzDAazBBNQyY7EdT/GvA99xFgtRm6zGC5R1uJ1fOIJJGLGM"
	  + "wk78RVknu/EE81B5HMRxlHVKr+GVdq5sxFbsxhX8QNlvPmAxKo13oqwzN7AUQ2UKduELir9/i2moJK46xcfpJ7zq3WQG7iG2o9sYjaxxdXqOW"
	  + "NhHZRV6icuwj1tsTz6OWeMSWyy6DcPJZBQvziuMR7YU94nrSJGViO1qPbLEzatYrN3E7ibXENs+hSxxKY2F3iBltiC273LsnEyeo4iFDiNlXH"
	  + "Zj+5qP5LmIWMQ7lDrfEGs4d5LnIWKRTUid4pltLZLHXTsW6XYD7CTvEWusQPKcRyzi2SllnNh/EGssQvL4UhSLXEbKuJTH9n/DzTJ5PGPFQp6"
	  + "vPACmyn7E9u8iSybiK2IxT7EpMhUfEdveg2w5g1jsM2ZiuDmI2K5vjrORLR5TLBKL+gh4t3qNZ6ria8EJZI9vfrGoLqGX+eIg/BAR2/Iuz0L2"
	  + "uJI8RiyuZ+h0J3ZOHELZ+36OjXbQeAbyUFfshK7CA2DxldV9wiV2Hz6h7Lc+tstQaZbAd+yyDrX42LzEOxQ3u8F43noAP+rNRSWZjlso61Cnn"
	  + "BOb4XxxE4x/81WhssH4oWAD/AQUO9GOj9FpzEErj1D8v0oHY8bBq2rnBps/XnG/nOxF2T5xB2W/q3wwrTixXRCWYx08xXoAbLdE21k7XavB9J"
	  + "pmMHVNM5i6phlMXdMMpq4ZajCerPsqZYM5iTHou8TB9O0gWnEwfkbq60E0aTJyGRj4DxHkqJBkhbF1AAAAAElFTkSuQmCC",

	"hide"		:"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtb"
	  + "G5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb2"
	  + "49IjEuMSIgdmlld0JveD0iMCAwIDIxLjkgMjEuOSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjEuOSAyMS45IiB3aWR0aD0iMjRweCI"
	  + "gaGVpZ2h0PSIyNHB4Ij4KICA8cGF0aCBkPSJNMTQuMSwxMS4zYy0wLjItMC4yLTAuMi0wLjUsMC0wLjdsNy41LTcuNWMwLjItMC4yLDAuMy0w"
	  + "LjUsMC4zLTAuN3MtMC4xLTAuNS0wLjMtMC43bC0xLjQtMS40QzIwLDAuMSwxOS43LDAsMTkuNSwwICBjLTAuMywwLTAuNSwwLjEtMC43LDAuM"
	  + "2wtNy41LDcuNWMtMC4yLDAuMi0wLjUsMC4yLTAuNywwTDMuMSwwLjNDMi45LDAuMSwyLjYsMCwyLjQsMFMxLjksMC4xLDEuNywwLjNMMC4zLD"
	  + "EuN0MwLjEsMS45LDAsMi4yLDAsMi40ICBzMC4xLDAuNSwwLjMsMC43bDcuNSw3LjVjMC4yLDAuMiwwLjIsMC41LDAsMC43bC03LjUsNy41QzA"
	  + "uMSwxOSwwLDE5LjMsMCwxOS41czAuMSwwLjUsMC4zLDAuN2wxLjQsMS40YzAuMiwwLjIsMC41LDAuMywwLjcsMC4zICBzMC41LTAuMSwwLjct"
	  + "MC4zbDcuNS03LjVjMC4yLTAuMiwwLjUtMC4yLDAuNywwbDcuNSw3LjVjMC4yLDAuMiwwLjUsMC4zLDAuNywwLjNzMC41LTAuMSwwLjctMC4zb"
	  + "DEuNC0xLjRjMC4yLTAuMiwwLjMtMC41LDAuMy0wLjcgIHMtMC4xLTAuNS0wLjMtMC43TDE0LjEsMTEuM3oiIGZpbGw9IiMwMDAwMDAiLz4KPC"
	  + "9zdmc+Cg==",

	"reset"		:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw"
	  + "v8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM/SURBVGhD7dlZyA5RHMfx15JkS0S2C4lciAtJSClXltxQlBIuLBfW15pdJOVCiiKSRJZygSR"
	  + "LXHDhAkmIREhCyR6yfn88/zrGeObMPDNPMzW/+vR65/WcOf95ziznTEOZMvlPb0zFZhzCGZzDKRzEekxCN+QufaGOP8TPGG5iGbogTjpVfqaW"
	  + "ATiG7wjrqK8v2InuiMognPzzz9rTClvxFcFO/YCO9F6sxExMx2ysgYbbfQQ/Jx8wH00RFhXxGpd+/1Zj+uEWgp24gTnw/dp1Lq3CYwTbOo+Oc"
	  + "DMYb6C/11zICOiIuDu9gzFogiRpjll4DrfdB+gDxS1CaipkJD7BGtN5sQEtkEY64DCsfXmKyXCLkMSF9Ifb2HuMRhZZhG9wOx6UqJB2uAdr5B"
	  + "2GIcvo4lDtSpiokN2wBnSkNMSyzhDogLmdd8UuZCh0ObUGViDraJ/BcyIodiEXYR++imbIMhqyUUVIrEL09bofzvq80E12C3Z5WALv7IEVcUE"
	  + "bihjdG97CCtHTaiEzHFbER7REIbMcVshZbShq9sMK2aQNRc1lWCHTtCEHaYNeFd6zS80nrJCx2pCD6OHR+uR9H3kE+5Ae3fMQjQzrk27UXnEn"
	  + "O7qC5SHzYH06rg1FzUZYIfu0oag5AitEU+TCxh3uE7ShiNG6mRWhaUXq61r1ylpYIde0oYjRA+wTWCGL4R2t0Wq9Nso2ZD3ZmgErQqs4sZZXw"
	  + "xbNgm6jM7JMe7yE7XMHYiWqkHoUoWhk2D41P/JZG/4r1QrRins9itDyq7vfBYidaoVo5XwcssxEuIt0esfyv4XtqokaWipGi2hZZC7cIrRyn/"
	  + "i+ESxE58QovHK2id5ptEUa0Yl9AG77WtjWqn3iuIW4J/ZAPIO7M/3fKUj01RPdJ3SJfQG3Xa3G11SEYoWEXZ105bgCd6eiIbAUPeETPXbojh0"
	  + "2jHVOpPIYosarXWL1TkNvoz4j2Am5C70iWAeNeb210nxCj+JHEdZ50XrvQiT9dv/JafhcYnX0NTeIeg0QRXfs7eiKVNO68tM3Gm6r4c71o+gp"
	  + "9joaEfetbl3SA1qZ1Pt0XYVOQM9lmp5qmUmTovEo7KN4mTJlyqSVhoZfpOGavPk50Z4AAAAASUVORK5CYII="

}

var a=document.createElement("style");
document.head.appendChild(a);
a.appendChild(document.createTextNode(css));
a=document.createElement("iframe");
a.id="bmkaction";
a.style.display="none";
document.body.appendChild(a);
a.addEventListener("load",function () {
	this.contentWindow.postMessage({
		a:true,
		b:'data:text/javascript,'+escape(iframe)
	},"*");
});
a.src="https://home.psydel.com/iframe/";

var extension = {

	show: function (path) {
		var bmks=document.getElementById("bmks");
		while (bmks.firstChild) {
			bmks.removeChild(bmks.firstChild);
		}
		var bmkptr=extension.bmk;
		path.split("/").forEach(function (v) {
			bmkptr=bmkptr.value[v];
		});
		bmkptr.data.order.forEach(function (v) {
			var a=bmkptr.value[v];
			extension.iptnds({
				tag:"label",
				id:a.data.name,
				name:a.data.name,
				childs:[{
					tag:"div",
					id:"chk"+a.data.name,
					events:[{
						name:"click",
						value:extension.toggle
					}],
					classname:["__checkbox","__hided"],
					data:[{
						name:"loc",
						value:a.path
					},
					{
						name:"name",
						value:a.data.name
					}]
				}],
				classname:["__extension","__bmk","__"+a.type],
				data:[{
					name:"loc",
					value:a.path
				},
				{
					name:"val",
					value:a.value
				}],
				events:[{
					name:"click",
					value:extension.click
				},
				{
					name:"long-press",
					value:extension.lclick
				},
				{
					name:"selectstart",
					value:(e)=>e.preventDefault()
				}],
				target:document.getElementById("bmks")
			});
			extension.iptnds({
				tag:"br",
				target:document.getElementById("bmks")
			});
		});
	},

	showlist: function (lists) {
		var bmks=document.getElementById("bmks");
		while (bmks.firstChild) {
			bmks.removeChild(bmks.firstChild);
		}
		lists.forEach(function (a) {
			extension.iptnds({
				tag:"label",
				id:a.data.name,
				name:a.data.name,
				childs:[{
					tag:"div",
					id:"chk"+a.data.name,
					events:[{
						name:"click",
						value:extension.toggle
					}],
					classname:["__checkbox","__hided"],
					data:[{
						name:"loc",
						value:a.path
					},
					{
						name:"name",
						value:a.data.name
					}]
				}],
				classname:["__extension","__bmk","__"+a.type],
				data:[{
					name:"loc",
					value:a.path
				},
				{
					name:"val",
					value:a.value
				}],
				events:[{
					name:"click",
					value:extension.click
				},
				{
					name:"long-press",
					value:extension.lclick
				}],
				target:document.getElementById("bmks")
			});
			extension.iptnds({
				tag:"br",
				target:document.getElementById("bmks")
			});
		});
	},

	click: function (e) {
		if (extension.inedit) {
			document.getElementById("chk"+this.id).classList.toggle("__checked");
		}
		else {
			if (this.classList.contains("__link")) {
				if (document.getElementById("tab").classList.contains("__checked")) {
					window.open(this.dataset.val,"_self");
				}
				else {
					window.open(this.dataset.val,"_blank");
				}
			}
			else {
				document.getElementById("go_up").classList.remove("__disabled");
				document.getElementById("dir").dataset.loc+="/"+this.id;
				document.getElementById("dir").textContent+="/"+this.id;
				extension.show(document.getElementById("dir").dataset.loc);
			}
		}
	},

	lclick: function (e) {
		if (extension.inedit) {

		}
		else {
			e.preventDefault();
			extension.bmkedit(this);
		}
	},

	confirm: function (e) {
		var name=document.querySelector("#bmkname input").value;
		var path=document.querySelector("#bmkpath input").value;
		extension.bmkaction({
			type:"change",
			info:{
				act:"change",
				loc:this.dataset.loc,
				data:[{pname:this.dataset.name,name:name,url:path}]
			}
		},"*");
		extension.show(document.getElementById("dir").dataset.loc);
	},

	bmkedit: function (bmk) {
		var bmks=document.getElementById("bmks");
		while (bmks.firstChild) {
			bmks.removeChild(bmks.firstChild);
		}
		extension.iptnds({
			tag:"label",
			id:"bmkname",
			childs:[{
				tag:"span",
				name:"name",
				classname:["__left"]
			},
			{
				tag:"input",
				attributes:[{
					name:"type",
					value:"text"
				},
				{
					name:"value",
					value:bmk.id
				}],
				classname:["__right"]
			}],
			classname:["__textfield"],
			target:bmks
		});
		extension.iptnds({
			tag:"br",
			target:bmks
		});
		extension.iptnds({
			tag:"label",
			id:"bmkpath",
			childs:[{
				tag:"span",
				name:"path",
				classname:["__left"]
			},
			{
				tag:"input",
				attributes:[{
					name:"type",
					value:"text"
				},
				{
					name:"value",
					value:bmk.dataset.val
				}],
				classname:["__right"]
			}],
			classname:["__textfield"].push((bmk.classList.contains("__link")?"__hided":"__none")),
			target:bmks
		});
		extension.iptnds({
			tag:"div",
			id:"changeconfirm",
			name:"confirm",
			classname:["__left","__bottom","__buttons"],
			data:[{
				name:"loc",
				value:bmk.dataset.loc
			},
			{
				name:"name",
				value:bmk.id
			}],
			events:[{
				name:"click",
				value:extension.confirm
			}],
			target:bmks
		});
		extension.iptnds({
			tag:"div",
			id:"changecancel",
			name:"cancel",
			classname:["__right","__bottom","__buttons"],
			events:[{
				name:"click",
				value:()=>extension.show(document.getElementById("dir").dataset.loc)
			}],
			target:bmks
		});
	},

	bmksearch: function () {
        document.getElementById("pastebmk").classList.add("__hided");
		var bmks=document.getElementById("bmks");
		while (bmks.firstChild) {
			bmks.removeChild(bmks.firstChild);
		}
		var bmkptr = extension.bmk;
		document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
			bmkptr = bmkptr.value[val];
		});
		extension.iptnds({
			tag:"label",
			id:"bmkname",
			childs:[{
				tag:"span",
				name:"name",
				classname:["__left"]
			},
			{
				tag:"input",
				attributes:[{
					name:"type",
					value:"text"
				}],
				classname:["__right"]
			}],
			classname:["__textfield"],
			target:bmks
		});
		extension.iptnds({
			tag:"br",
			target:bmks
		});
		extension.iptnds({
			tag:"label",
			id:"bmkpath",
			childs:[{
				tag:"span",
				name:"url",
				classname:["__left"]
			},
			{
				tag:"input",
				attributes:[{
					name:"type",
					value:"text"
				}],
				classname:["__right"]
			}],
			classname:["__textfield"],
			target:bmks
		});
		extension.iptnds({
			tag:"div",
			id:"changeconfirm",
			name:"confirm",
			classname:["__left","__bottom","__buttons"],
			events:[{
				name:"click",
				value:function () {
					if (!document.querySelector("#bmkname input").value&&!document.querySelector("#bmkpath input").value) {
						return undefined;
					}
					extension.showlist(extension.search(bmkptr,{
						name:document.querySelector("#bmkname input").value,
						url:document.querySelector("#bmkpath input").value
					}));
					extension.iptnds({
						tag:"div",
						name:"cancel",
						classname:["__left","__bottom","__buttons"],
						events:[{
							name:"click",
							value:function () {
								extension.bmkaction({
									type:"getbmk"
								},"*");
							}
						}],
						target:bmks
					});
				}
			}],
			target:bmks
		});
		extension.iptnds({
			tag:"div",
			id:"changecancel",
			name:"cancel",
			classname:["__right","__bottom","__buttons"],
			events:[{
				name:"click",
				value:()=>extension.show(document.getElementById("dir").dataset.loc)
			}],
			target:bmks
		});
	},

	add: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"add",
				loc:document.getElementById("dir").dataset.loc,
				data:[{name:prompt("bmk name",document.title),url:prompt("bmk url",location.href)}]
			}
		},"*");
	},

	newfld: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"new",
				loc:document.getElementById("dir").dataset.loc,
				data:[{name:prompt("bmk name",document.title)}]
			}
		},"*");
	},

	move: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"move",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.map.call(document.querySelectorAll("#bmks .__checkbox.__checked"),(v=>({loc:v.dataset.loc,name:v.dataset.name})))
			}
		},"*");
        document.getElementById("pastebmk").classList.remove("__hided");
		extension.edtdact();
	},

	copy: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"copy",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>({loc:v.dataset.loc,name:v.dataset.name})))
			}
		},"*");
        document.getElementById("pastebmk").classList.remove("__hided");
		extension.edtdact();
	},

	remove: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"remove",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>({loc:v.dataset.loc,name:v.dataset.name})))
			}
		},"*");
	},

	goup: function () {
		var loc="";
		document.getElementById("dir").dataset.loc.split("/").forEach(function (v,i,arr) {
			if (i==arr.length-1) {
				return undefined;
			}
			else if (i==arr.length-2) {
				loc+=v;
			}
			else {
				loc+=v+"/";
			}
		});
		if (loc.split("/").length==1) {
			document.getElementById("go_up").classList.add("__disabled");
		}
		document.getElementById("dir").dataset.loc=loc;
		document.getElementById("dir").textContent=loc;
		extension.show(loc);
	},

	importbmk: function () {
		extension.bmkaction({
			type:"import"
		},"*");
	},

	exportbmk: function () {
		extension.bmkaction({
			type:"export"
		},"*");
	},

	search: function (bmk,option) {
		var arr=[]
		for (var a in bmk.value) {
			if (option.url&&bmk.value[a].type=="link"&&bmk.value[a].value.match(new RegExp(option.url,"i"))) {
				arr.push(bmk.value[a]);
			}
			else if (option.name&&a.match(new RegExp(option.name,"i"))) {
				arr.push(bmk.value[a]);
			}
			if (bmk.value[a].type=="folder") {
				arr=arr.concat(extension.search(bmk.value[a],option));
			}
		}
		return arr;
	},

	sort: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"sort",
				loc:document.getElementById("dir").dataset.loc
			}
		},"*");
	},

	paste: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"paste",
				loc:document.getElementById("dir").dataset.loc
			}
		},"*");
        document.getElementById("pastebmk").classList.add("__hided");
	},

	cancel: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"cancel",
				loc:document.getElementById("dir").dataset.loc
			}
		},"*");
        document.getElementById("pastebmk").classList.add("__hided");
	},

	edtact: function () {
		document.querySelectorAll(".__inedit").forEach(function (v) {
			v.classList.add("__disabled");
		});
		document.querySelectorAll(".__editout").forEach(function (v) {
			v.classList.remove("__invisibled");
		});
		document.querySelectorAll(".__checkbox").forEach(function (v) {
			v.classList.remove("__hided");
		});
		extension.inedit=true;
	},

	edtdact: function () {
		document.querySelectorAll(".__inedit").forEach(function (v) {
			v.classList.remove("__disabled");
		});
		document.querySelectorAll(".__editout").forEach(function (v) {
			v.classList.add("__invisibled");
		});
		document.querySelectorAll(".__checkbox").forEach(function (v) {
			v.classList.add("__hided");
		});
		if (document.getElementById("dir").dataset.loc.split("/").length==1) {
			document.getElementById("go_up").classList.add("__disabled");
		}
		extension.inedit=false;
	},

	toggle: function (e) {
		this.classList.toggle("__checked");
	},

	stopprop: function (e) {
		e.stopPropagation(); 
		return false;
	},

	iptnds: function (item) {
		var div = document.createElement(item.tag);
		if (item.classname) {
			for (var i = 0; i < item.classname.length; i++) {
				div.classList.add(item.classname[i]);
			}
		}
		div.classList.toggle("__extension");
		if (item.id) {
			div.id = item.id;
		}
		if (item.image) {
			if (!item.childs) {
				item.childs=[];
			}
			var b = {}
			b.tag = "img"
			b.attributes = [{
				name: "src",
				value: item.image
			}];
			if (item.name) {
				b.attributes.push({
					name: "title",
					value: item.name
				});
			}
			b.classname = ["__innerimage","__extension"];
			item.childs.push(b);
		}
		if (item.childs) {
			for (i = 0; i < item.childs.length; i++) {
				if (item.childs[i].tag=="#text") {
					div.appendChild(document.createTextNode(item.childs[i].name));
					continue;
				}
				item.childs[i].target = div;
				extension.iptnds(item.childs[i]);
			}
		}
		if (!item.image&&item.name) {
			div.appendChild(document.createTextNode(item.name));
		}
		if (item.events) {
			for (i = 0; i < item.events.length; i++) {
				div.addEventListener(item.events[i].name, item.events[i].value);
			}
		}
		if (item.attributes) {
			for (i = 0; i < item.attributes.length; i++) {
				div.setAttribute(item.attributes[i].name, item.attributes[i].value);
			}
		}
		if (item.data) {
			for (i = 0; i < item.data.length; i++) {
				div.dataset[item.data[i].name]= item.data[i].value;
			}
		}
		if (item.target) {
			if (item.insert) {
				item.target.insertBefore(div,item.insert)
			}
			else {
				item.target.appendChild(div);
			}
		} else {
			document.body.appendChild(div);
		}
		return div;
	}

};

extension.bmkaction = function (a,b) {
    document.getElementById("bmkaction").contentWindow.postMessage(a,b);
};

extension.changebmk = function (bmk,path) {
	bmk.data.order=[];
	for (var a in bmk.value) {
		bmk.data.order.push(a);
		bmk.value[a].path=path;
		if (!bmk.value[a].data) {
			bmk.value[a].data={};
		}
		bmk.value[a].data.name=a;
		delete bmk.value[a].tags;
		if (bmk.value[a].type=="folder") {
			extension.changebmk(bmk.value[a],bmk.value[a].path+(path?"/":"")+a);
		}
	}
    if (bmk==extension.bmk) {
		extension.bmkaction({type:"setbmk",bmk:bmk},"*");
        extension.show(document.getElementById("dir").dataset.loc);
    }
}

extension.intfc = [{
		tag: "div",
		name: "edit bmks",
		image: dataurls.edit,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: extension.edtact
		}]
	},
	{
		tag: "div",
		name: "toggle bmktool",
		image: dataurls.bmktool,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: function () {
				var a = document.querySelectorAll(".__bmktool");
				a.forEach(function (val) {
					val.classList.toggle("__hided");
				});
			}
		}]
	},
	{
		tag: "div",
		name: "search bmk",
		image: dataurls.search,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: extension.bmksearch
		}]
	},
	{
		tag: "div",
		name: "add bmk",
		image: dataurls.add,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: extension.add
		}]
	},
	{
		tag: "div",
		name: "sort bmk",
		classname: ["__buttons","__inedit"],
		image: dataurls.sort,
		events: [{
			name: "click",
			value: extension.sort
		}]
	},
	{
		tag: "div",
		name: "new folder",
		image: dataurls.newfld,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: extension.newfld
		}]
	},
	{
		tag: "div",
		name: "go up",
		classname: ["__buttons","__disabled","__inedit"],
		image: dataurls.up,
		id:"go_up",
		events: [{
			name: "click",
			value: extension.goup
		}]
	},
	{
		tag: "div",
		name: "hide",
		classname: ["__buttons","__inedit"],
		image: dataurls.hide,
		id:"go_up",
		events: [{
			name: "click",
			value: ()=>document.getElementById("bmkmain").classList.add("__hided")
		}]
	},
	{
		tag: "br"
	},
	{
		tag: "div",
		id: "tab",
		events: [{
			name: "click",
			value: extension.toggle
		}],
		classname:["__checkbox","__extension"]
	},
	{
		tag: "span",
		name: "this tab",
		events: [{
			name: "click",
			value: function (event) {
				extension.toggle.call(document.getElementById("tab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "input",
		id: "getbmk",
		classname: ["__hided"],
		events: [{
			name: "change",
			value: extension.getexternal
		}],
		attributes: [{
				name: "accept",
				value: ".json"
			},
			{
				name: "type",
				value: "file"
			}
		]
	},
	{
		tag: "div",
		name: "root",
		id: "dir",
		attributes: [{
			name: "data-loc",
			value: "root"
		}]
	},
	{
		tag: "div",
		name: "all select",
		image: dataurls.all,
		events: [{
			name: "click",
			value: ()=>document.querySelectorAll("#bmks .__checkbox").forEach((v)=>(v.classList.toggle("__checked")))
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "remove",
		image: dataurls.remove,
		events: [{
			name: "click",
			value: extension.remove
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{//
		tag: "div",
		name: "copy",
		image: dataurls.copy,
		events: [{
			name: "click",
			value: extension.copy
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "move",
		image: dataurls.move,
		events: [{
			name: "click",
			value: extension.move
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "end",
		image: dataurls.end,
		events: [{
			name: "click",
			value: extension.edtdact
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "import",
		image: dataurls["import"],
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: ()=>window.postMessage({
				type:"exportFromExtension"
			},"*")
		}]
	},
	{
		tag: "div",
		name: "export",
		image: dataurls["export"],
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: ()=>window.postMessage({
				type:"exportToExtension",
				bmk:extension.bmk
			},"*")
		}]
	},
	{
		tag: "div",
		name: "backup",
		image: dataurls.backup,
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: extension.backup
		}]
	},
	{
		tag: "div",
		name: "merge",
		image: dataurls.merge,
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: extension.external
		}]
	},
	{
		tag: "div",
		name: "reset",
		image: dataurls.reset,
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: ()=>extension.changebmk(extension.bmk,"")
		}]
	},
	{
		tag: "div",
		name: "editview",
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: extension.bmkedit
		}]
	},
	{
		tag: "div",
		name: "expand",
		image: dataurls.expand,
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: function (event) {
				document.getElementById("bmkmain").classList.toggle("__expanded");
			}
		}]
	},
	{
		tag: "div",
		name: "loading...",
		id: "bmks"
	},
	{
		tag: "div",
		id: "pastebmk",
		classname: ["__hided"],
		childs:[{
			tag: "div",
			name: "paste bmk",
			image: dataurls.paste,
			classname: ["__buttons"],
			events: [{
				name: "click",
				value: extension.paste
			}],
			target: document.getElementById("pastebmk")
		},
		{
			tag: "div",
			name: "cancel",
			image: dataurls.cancel,
			classname: ["__buttons"],
			events: [{
				name: "click",
				value: extension.cancel
			}],
			target: document.getElementById("pastebmk")
		}]
	}];

window.addEventListener("message",function (e) {
	console.log(e);
	if (e.data=="loaded") {
		extension.bmkaction({
			type:"getbmk"
		},"*");
	}
	else if (e.data.type=="iframe") {
		/*if (!sessionStorage.getItem("tabid")) {
			sessionStorage.setItem("tabid",Math.floor(Math.random()*100000000));
		}
		extension.bmkaction({
			type:"tabcontrol",
			info:{
				act:"open",
				url:location.href,
				title:document.title,
				tabid:sessionStorage.getItem("tabid")
			}
		},"*");*/
	}
	else if (e.data.type=="importFromExtension") {
		extension.bmk=e.data.bmk;
		extension.bmkaction({
			type:"setbmk",
			bmk:e.data.bmk
		},"*");
		extension.show(document.getElementById("dir").dataset.loc);
		alert("import complete");
	}
	else if (e.data.type=="importToExtension") {
		alert("export complete");
	}
	else if (e.data.type=="getted") {
		if (!e.data.bmk) {
			document.getElementById("bmkaction").contentWindow.postMessage({
				type:"import"
			},"*");
		}
		else {
			extension.bmk=e.data.bmk;
			extension.show(document.getElementById("dir").dataset.loc);
			if (e.data.croped) {
				document.getElementById("pastebmk").classList.remove("__hided");
				extension.edtdact();
			}
		}
	}
	else if (e.data.type=="setted") {
		alert("setted");
	}
	else if (e.data.type=="importd") {
		extension.bmk=e.data.bmk;
		extension.show(document.getElementById("dir").dataset.loc);
		if (e.data.croped) {
			document.getElementById("pastebmk").classList.remove("__hided");
			extension.edtdact();
		}
	}
	else if (e.data.type=="exportd") {
		alert("exported");
	}
	else if (e.data.type=="changd") {
		extension.bmk=e.data.bmk;
		extension.show(document.getElementById("dir").dataset.loc);
		if (e.data.croped) {
			document.getElementById("pastebmk").classList.remove("__hided");
			extension.edtdact();
		}
	}
});

window.addEventListener("beforeunload",async function (e) {
	console.log(e);
	extension.bmkaction({
		type:"tabcontrol",
		info:{
			act:"close",
			url:location.href,
			title:document.title
		}
	},"*");
	return await (new Promise(resolve => {
		setTimeout(() => {
			resolve('resolved');
		}, 2000);
	}));
});

extension.iptnds({
	tag:"div",
	id:"bmkmain",
	classname:["__hided"]
});

extension.iptnds({
	tag:"div",
	name:"tgl",
	id:"bmktoggle",
	events:[{
		name:"click",
		value:()=>{
			extension.bmkaction({type:"getbmk"},"*");
			document.getElementById("bmkmain").classList.remove("__hided");
		}
	}]
});

extension.iptnds({
	tag:"div",
	name:"prev",
	id:"gototop",
	events:[{
		name:"click",
		value:()=>history.go(-1)
	},
               {
		name:"long-press",
		value:()=>(document.documentElement.scrollTop=0)
	},
               {
		name:"selectstart",
		value:(e)=>e.preventDefault()
	},
               {
		name:"contextmenu",
		value:(e)=>e.preventDefault()
	},
               {
		name:"mousedown",
		value:console.log
	},
               {
		name:"touchstart",
		value:console.log
	}]
});

extension.iptnds({
	tag:"div",
	name:"next",
	id:"gotobottom",
	events:[{
		name:"click",
		value:()=>history.go(1)
	},
               {
		name:"long-press",
		value:()=>(document.documentElement.scrollTop=document.documentElement.scrollHeight)
	},
               {
		name:"selectstart",
		value:(e)=>e.preventDefault()
	},
               {
		name:"contextmenu",
		value:(e)=>e.preventDefault()
	},
               {
		name:"mousedown",
		value:console.log
	},
               {
		name:"touchstart",
		value:console.log
	}]
});

extension.intfc.map(v=>{v.target=document.getElementById("bmkmain"); return v;}).forEach(extension.iptnds);

document.querySelectorAll("div").forEach(function (v) {
	if (v.className.match(/ad\_[0-9]{2,}_[0-9]{2,}/gi)) {
		v.classList.add("__hided");
	}
});

var list=document.querySelectorAll("table.board_list_table tr.table_body");
var users=["驅逐艦_響"];
list.forEach(function (v) {
	if (v.querySelector("td.writer")) {
		users.forEach(function (e) {
			if (v.querySelector("td.writer").textContent.match(e)) {
				v.classList.add("__hided");
				console.log(v.querySelector("td.subject").textContent);
			}
		});
	}
});
