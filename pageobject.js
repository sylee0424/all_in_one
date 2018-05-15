Object.prototype.keys||(Object.prototype.keys = function () {
	var a=[];
	for (var b in this) {
		if (Object.prototype.hasOwnProperty.call(this,b)) {
			a.push(b);
		}
	}
	return a;
});

NodeList.prototype.forEach||(NodeList.prototype.forEach = function (callback) {
	for (var a=0;a<this.length;a++) {
		callback(this[a],a,this);
	}
});

NodeList.prototype.entries||(NodeList.prototype.entries = function* () {
	for (var a=0;a<this.length;a++) {
		yield [a,this[a]];
	}
});

NodeList.prototype.keys||(NodeList.prototype.keys = function* () {
	for (var a=0;a<this.length;a++) {
		yield a;
	}
});

NodeList.prototype.values||(NodeList.prototype.values = function* () {
	for (var a=0;a<this.length;a++) {
		yield this[a];
	}
});

window.Action_Bar_Function = {

	Action_Bar_Function_1: {
		f: function() {
			history.back();
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			scroll(0, 0);
		},
		name: "Go_back"
	},

	Action_Bar_Function_2: {
		f: function() {
			history.forward();
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			scroll(0, document.body.scrollHeight);
		},
		name: "Go_forward"
	},

	Action_Bar_Function_3: {
		f: function() {
			document.getElementById("functionbar").classList.toggle("__hided");
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Toggle_Button_Tab"
	},

	Action_Bar_Function_4: {
		f: function() {
			console.log("f");
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Close_This_Tab."
	},

	Action_Bar_Function_5: {
		f: function() {
			document.getElementById("bmkmain").classList.remove("__hided");
			document.getElementById("actionbar").classList.add("__hided");
			window.postMessage({
				type: "check",
				bmk: Extension_Variables.Bookmark_Original
			}, location.href);
		},
		u: function() {
			window.postMessage({
				type: "create",
				prop: {active:true},
				des: "back"
			}, location.href);
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			Bookmark_User_Functions.Add_Bookmark.f.call(this);
		},
		name: "Open_Bookmark"
	},

	Action_Bar_Function_6: {
		f: function() {
			console.log("f");
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Open_Tab_Bar"
	},

	Action_Bar_Function_7: {
		f: function() {
			location.reload(true);
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Reload_Tab"
	},

	Action_Bar_Function_8: {
		f: function() {
			scroll(0, 0);
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Go_Up"
	},

	Action_Bar_Function_9: {
		f: function() {
			scroll(0, document.body.scrollHeight);
		},
		u: function() {
			console.log("u");
		},
		d: function() {
			console.log("d");
		},
		l: function() {
			console.log("l");
		},
		r: function() {
			console.log("r");
		},
		lt: function() {
			console.log("lt");
		},
		name: "Go_Down"
	}

};

window.Extension_Sub_Functions = {

	hitomi_Image_Sequential: {
		f: function (imagelist) {
			var __scr=document.createElement("img");
			__scr.classList.add("__loadedimg");
			document.body.appendChild(__scr);
			__scr.addEventListener("load",function () {
				if (imagelist.length) {
					Extension_Sub_Functions.hitomi_Image_Sequential.f(imagelist);
				}
			});
			__scr.addEventListener("error",function () {
				console.log(""+this.src);
				this.src+="#"+new Date().getTime();
			});
			__scr.setAttribute("src",imagelist.shift());
		},
		name:"hitomi_Image_Sequential"
	},

	hitomi_Link_Action: {
		f: function() {
			event.stopPropagation();
			var i = this.dataset.index;
			var j = this.dataset.type;
			var k = this.dataset.url;
			var url;
			if (location.protocol == "file:") {
				url = "";
			} else {
				url = "https://hitomi.la";
			}
			if (j == "normal") {
				url += k;
			} else if (j == "korean") {
				url += k.split("-all-")[0] + "-korean-" + k.split("-all-")[1];
			} else if (j == "reader") {
				url += k.split("galleries")[0] + "reader" + k.split("galleries")[1] + "#1";
			}
			if (document.getElementById("input-" + i).checked) {
				window.open(url)
			} else if (location.protocol == "file:") {
				location.hash = url;
			} else {
				location.href = url;
			}
		},
		name: "hitomi_Click_Action"
	},
	
	Add_Extension_Interface: {
		f: function() {
			if (!document.getElementById("bmkmain")) {
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "bmkmain",
					classname: ["__hided"],
					events: [{
						name: "wheel",
						value: function (event) {
							event.stopPropagation();
						}
					}],
					target: document.body
				});
				Extension_Variables.Bookmark_Interface_List.forEach (function (val) {
					Extension_Tool_Functions.Import_Nodes.f(val)
				});
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "pastebmk",
					classname: ["__hided"],
					target: document.getElementById("bmkmain")
				});
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					name: "paste bmk",
					image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD8SURBVEhL7dUxTgJBFMbx1XgPC2NJoSewtLSwQw5hhQVUFkqDx4Ab0FB4A7XVjgOQcACR/7fuSyYvM7OyErKJfskv2Rlm3stu2NmiLTnENW5xrIld5wlflSUaNznHG9awgmaKjpszK4xxgGxescAIj3iGCuj6Eoqfl0k1vkI2n1Bxyx200cfPH0Hj+3KUiRY9fF+WsUIpYTQO90bjF13AHkNMmEYNtkn7G+hl66GfoL1znCKZXAMV1+91PpCMFqQapP6yYWrX/Df4Aw38YRdmJw3suB7Av0gz/LrBGV6gO9HCmFx+cpfJ3MA3i3lHo+hz2EXs2DZDnGBfKYoNj8aK9uWSNrcAAAAASUVORK5CYII=",
					classname: ["__buttons"],
					events: [{
						name: "click",
						value: Bookmark_User_Functions.Paste_Bookmark_Second.f
					}],
					target: document.getElementById("pastebmk")
				});
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					name: "cancel",
					image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVEhL7dPLCQIxFIXhLNyJbrQA63AnFqAFia9arMBHB27VDmxBEXci+p/IwITRxei9m8EDHyQZJne4k4RKponFa2ifLo54xJlhapjgBm1uWqCDLbKNv3HFHnO0kcSiQN4JQyT5tUV19LCE3r1jgEIsfvIIev+MQrsUi2O6gopM48whapcKHOLMIQ2owCXOHOJewL1Fa6iAjr55xtDmunAtLVhEPe9jA22eXDQtiFJm/Im+PLnF2QOlzDhPp2WHGd7e3n8qmxCeHp1rU1t2vOAAAAAASUVORK5CYII=",
					classname: ["__buttons"],
					events: [{
						name: "click",
						value: Bookmark_User_Functions.Cancel_Paste_Second.f
					}],
					target: document.getElementById("pastebmk")
				});
			}
			if (!document.getElementById("actionbar")) {
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "actionbar",
					classname: [],
					target: document.body
				});
				for (s in Action_Bar_Function) {
					a = {};
					a.tag = "div";
					a.id = s;
					a.classname = ["__abtn"];
					a.name = Action_Bar_Function[s].name;
					a.events = [{
						name: "mousedown",
						value: Extension_Tool_Functions.Drag_Event_Checker.f
					}, {
						name: "mouseup",
						value: Extension_Tool_Functions.Remove_Longtab_Event_Checker.f
					}, {
						name: "touchstart",
						value: Extension_Tool_Functions.Drag_Event_Checker.f
					}, {
						name: "touchend",
						value: Extension_Tool_Functions.Drag_Event_Checker_Action.f
					}, {
						name: "selectstart",
						value: function(event) {
							event.preventDefault();
						}
					}];
					a.target = document.getElementById("actionbar");
					Extension_Tool_Functions.Import_Nodes.f(a);
				}
			}
			if (!document.getElementById("functionbar")) {
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "functionbar",
					classname: ["__hided"],
					target: document.body
				});
				for (var s in Extension_User_Functions) {
					var a = {};
					a.tag = "div";
					a.classname = ["__btnz"];
					if (Extension_User_Functions[s].image) {
						a.image=Extension_User_Functions[s].image;
					} else if (Extension_User_Functions[s].name) {
						a.name = Extension_User_Functions[s].name;
					} else {
						a.name = s;
					}
					a.events = [{
						name: "click",
						value: Extension_User_Functions[s].f
					}];
					a.target = document.getElementById("functionbar");
					Extension_Tool_Functions.Import_Nodes.f(a);
				}
				Extension_Tool_Functions.Import_Nodes.f({
					tag: "div",
					id: "sidebarpad",
					classname: ["__extension"],
					target: document.getElementById("functionbar")
				});
			}

			window.postMessage({
				type: "gettab",
				des: "back"
			}, location.href);
		},
		name: "Drag_Event_Checker"
	},

	hitomi_Link_Change: {
		f: function() {
			var d = 0;
			var divs = document.getElementsByTagName('a');
			var i = divs.length;
			while (i--) {
				var k = divs[i].getAttribute("href");
				if (k && divs[i].id != "dl-button" && divs[i].parentNode.parentNode.getAttribute("class") !=
					"simplePagerNav") {
					divs[i].dataset.url = k;
					divs[i].dataset.type = "normal";
					divs[i].dataset.index = i;
					divs[i].addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
					var inp = document.createElement("input");
					var inq = document.createElement("label");
					var tx = document.createTextNode("N");
					inp.type = "checkbox";
					inq.style.display = "inline";
					inp.id = "input-" + i;
					inp.addEventListener("click", Extension_Tool_Functions.Cancel_Event_Bubling.f);
					inp.style["vertical-align"] = "middle";
					inq.addEventListener("click", Extension_Tool_Functions.Element_Toggle.f);
					if (divs[i].parentNode.parentNode.parentNode.getAttribute("class") != "page-container" &&
						divs[i].parentNode.tagName != "DIV" && divs[i].href != "/") {
						if (k.match("galleries")) {
							var j = document.createElement("span");
							divs[i].insertBefore(j, divs[i].firstChild);
							j.innerHTML = "(R) ";
							j.dataset.url = k;
							j.dataset.type = "reader";
							j.dataset.index = i;
							j.addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
						}
						if (k.match("-all-")) {
							var j = document.createElement("span");
							divs[i].insertBefore(j, divs[i].firstChild);
							j.innerHTML = "(K) ";
							j.dataset.url = k;
							j.dataset.type = "korean";
							j.dataset.index = i;
							j.addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
						}
					} else {
						var j = document.createElement("span");
						while (divs[i].firstChild) {
							j.appendChild(divs[i].firstChild);
						}
						j.dataset.url = k;
						j.dataset.type = "normal";
						j.dataset.index = i;
						j.addEventListener("click", Extension_Sub_Functions.hitomi_Link_Action.f);
						divs[i].parentNode.insertBefore(j, divs[i]);
						var k = divs[i];
						divs[i] = j;
						k.parentNode.removeChild(k);
						inq.style.display = "none";
					}
					inq.appendChild(tx);
					inq.appendChild(inp);
					divs[i].insertBefore(inq, divs[i].firstChild);
					divs[i].removeAttribute("href");
				}
			}
			divs = document.getElementsByClassName("page-content")[0]
			if (divs) {
				divs = document.getElementsByClassName("page-content")[0].getElementsByTagName("label");
				i = divs.length;
				while (i--) {
					divs[i].setAttribute("style", "display:none");
				}
			}
		},
		name: "hitomi_Link_Change"
	},

	Ruliweb_Ad_Block: {
		f: function() {
			var arr = document.getElementsByTagName("div")
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].className.indexOf("ad_") != -1) {
					arr[i].parentNode.removeChild(arr[i]);
				}
			}
		},
		name: "Ruliweb_Ad_Block"
	},

	Marumaru_Ad_Block: {
		f: function() {
			var a=document.getElementById("responsive-banner");
			if (a) {
				a.parentNode.removeChild(a);
			}
			document.querySelectorAll("iframe").forEach(function (val) {
				val.parentNode.removeChild(val);
			});
			a=document.getElementById("header-anchor");
			if (a) {
				a.parentNode.removeChild(a);
			}
			a=document.getElementById("footer-anchor");
			if (a) {
				a.parentNode.removeChild(a);
			}
		},
		name: "Marumaru_Ad_Block"
	}

};

window.Extension_Tool_Functions = {
	
	Get_Bookmark_By_Tag: {
		f: function (bmk,tag) {
			var arr=[]
			for (var a in bmk.value) {
				if (bmk.value[a].type=="link") {
					if (bmk.value[a].tags[tag]) {
						bmk.value[a].data.name=a;
						arr.push(bmk.value[a]);
					}
				}
				else if (bmk.value[a].type=="folder") {
					arr.concat(Extension_Tool_Functions.Get_Bookmark_By_Tag.f(bmk.value[a],tag));
				}
			}
			return arr;
		},
		name:"Get_Bookmark_By_Tag"
	},

	change_bmk: {
		f: function (bmk,path) {
			for (var a in bmk.value) {
				bmk.value[a].path=path;
				bmk.value[a].tags={"test":false};
				if (bmk.value[a].type=="folder") {
					Extension_Tool_Functions.change_bmk.f(bmk.value[a],bmk.value[a].path+(path?"/":"")+a);
				}
			}
		},
		name:"change_bmk"
	},

	convert_bmk: {
		f: function (bmk,path) {
			for (var a in bmk) {
				var b={};
				b.value=bmk[a];
				b.data={created:-1,modified:-1,croped:false};
				if (!path) {
					b.path+="/";
				}
				if (typeof bmk[a]=="string") {
					b.type="link";
					bmk[a]=b;
				}
				else {
					b.type="folder"
					b.path+=a;
					bmk[a]=b;
					Extension_Tool_Functions.convert_bmk.f(bmk[a].value,bmk[a].path);
				}
			}
		},
		name:"hitomi_Image_Sequential"
	},

	Fake_Scroll_Event: {
		f: function(event) {
			if (event.altKey) {
				event.preventDefault();
				if (event.which == 3) {
					Extension_Variables.Fake_Scroll_Direction = "u";
				} else if (event.which == 1) {
					Extension_Variables.Fake_Scroll_Direction = "d";
				}
			}
		},
		name: "Fake_Scroll_Event"
	},

	Fake_Scroll_Event_End: {
		f: function(event) {
			delete Extension_Variables.Fake_Scroll_Direction;
		},
		name: "Fake_Scroll_Event_End"
	},

	Emulate_Click_Event: {
		f: function(hrf) {
			if (hrf.click) {
				hrf.click();
			} else if (document.createEvent) {
				var eventObj = document.createEvent('MouseEvents');
				eventObj.initEvent('click', true, true);
				hrf.dispatchEvent(eventObj);
			}
		},
		name: "Emulate_Click_Event"
	},

	Get_Childs_Index: {
		f: function(node) {
			return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
		},
		name: "Get_Child_Number"
	},

	Element_Toggle: {
		f: function(event) {
			event.stopPropagation();
			this.classList.toggle("__checked");
			this.checked = this.classList.contains("__checked");
		},
		name: "Element_Toggle"
	},
	
	utf8_encode : {
		f: function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		name: "utf8_encode"
	},

	utf8_decode: {
		f: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		},

		name: "utf8_decode"
	},

	Drag_Event_Checker: {
		f: function(event) {
			if (event.touches && event.touches.length > 1) {
				return undefined;
			}
			if (event.which && event.which == 3) {
				return undefined;
			}
			event.preventDefault();
			var eventx = event.clientX || event.changedTouches[0].clientX;
			var eventy = event.clientY || event.changedTouches[0].clientY;
			var nds = document.createElement("div");
			var id = window.setTimeout(Extension_Tool_Functions.Longtab_Event_Checker.f, 350);
			nds.setAttribute("style",
				"visibility:visible; position:fixed; bottom:0%; left:0%; width:100%; height:100%; background-color:#000000; opacity:0;"
			);
			nds.id = "setover";
			nds.dataset.x = eventx;
			nds.dataset.y = eventy;
			nds.dataset.id = this.id;
			nds.dataset.timeout = id;
			document.body.appendChild(nds);
			nds.addEventListener("mouseup", Extension_Tool_Functions.Drag_Event_Checker_Action.f);
		},
		name: "Drag_Event_Checker"
	},

	Remove_Longtab_Event_Checker: {
		f: function() {
			if (document.getElementById("setover")) {
				document.getElementById("setover").parentNode.removeChild(document.getElementById("setover"));
			}
			window.clearTimeout(Number(document.getElementById("setover").dataset.timeout));
		},
		name: "Drag_Event_Checker"
	},

	Longtab_Event_Checker: {
		f: function() {
			if (document.getElementById("setover")) {
				var a = document.createElement("div");
				a.style = document.getElementById(document.getElementById("setover").dataset.id).getAttribute(
					"style");
				a.setAttribute("data-id", document.getElementById("setover").dataset.id);
				a.id = "ltsde";
				a.appendChild(document.createTextNode("lt"));
				document.body.appendChild(a);
				a.addEventListener("mouseup", Extension_Tool_Functions.Drag_Event_Checker_Action.f);
			}
		},
		name: "Drag_Event_Checker"
	},

	Drag_Event_Checker_Action: {
		f: function(event) {
			var a = 15;
			var aaa = this;
			if (event.changedTouches || this.id == "ltsde") {
				aaa = document.getElementById("setover");
			}
			var eventx = event.clientX || event.changedTouches[0].clientX;
			var eventy = event.clientY || event.changedTouches[0].clientY;
			var movex = eventx - Number(aaa.dataset.x);
			var movey = Number(aaa.dataset.y) - eventy;
			if (Math.abs(movex) < a && Math.abs(movey) < a) {
				if (document.getElementById("ltsde")) {
					Action_Bar_Function[aaa.dataset.id].lt.call(document.getElementById(aaa.dataset.id));
					document.getElementById("ltsde").parentNode.removeChild(document.getElementById("ltsde"));
				} else {
					Action_Bar_Function[aaa.dataset.id].f();
				}
			} else if (movex >= 0 && movey >= 0) {
				if (movey / movex > 3) {
					if (Action_Bar_Function[aaa.dataset.id].u) {
						Action_Bar_Function[aaa.dataset.id].u();
					}
				} else if (movey / movex < 0.3) {
					if (Action_Bar_Function[aaa.dataset.id].r) {
						Action_Bar_Function[aaa.dataset.id].r();
					}
				}
			} else if (movex < 0 && movey >= 0) {
				if (movey / movex < -3) {
					if (Action_Bar_Function[aaa.dataset.id].u) {
						Action_Bar_Function[aaa.dataset.id].u();
					}
				} else if (movey / movex > -0.3) {
					if (Action_Bar_Function[aaa.dataset.id].l) {
						Action_Bar_Function[aaa.dataset.id].l();
					}
				}
			} else if (movex >= 0 && movey < 0) {
				if (movey / movex < -3) {
					if (Action_Bar_Function[aaa.dataset.id].d) {
						Action_Bar_Function[aaa.dataset.id].d();
					}
				} else if (movey / movex > -0.3) {
					if (Action_Bar_Function[aaa.dataset.id].r) {
						Action_Bar_Function[aaa.dataset.id].r();
					}
				}
			} else if (movex < 0 && movey < 0) {
				if (movey / movex > 3) {
					if (Action_Bar_Function[aaa.dataset.id].d) {
						Action_Bar_Function[aaa.dataset.id].d();
					}
				} else if (movey / movex < 0.3) {
					if (Action_Bar_Function[aaa.dataset.id].l) {
						Action_Bar_Function[aaa.dataset.id].l();
					}
				}
			}
			aaa.parentNode.removeChild(aaa);
		},
		name: "Drag_Event_Checker"
	},

	Import_Nodes: {
		f: function(item) {
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
			} else if (item.name) {
				div.appendChild(document.createTextNode(item.name));
			}
			if (item.childs) {
				for (var i = 0; i < item.childs.length; i++) {
					item.childs[i].target = div;
					Extension_Tool_Functions.Import_Nodes.f(item.childs[i]);
				}
			}
			if (item.events) {
				for (var i = 0; i < item.events.length; i++) {
					div.addEventListener(item.events[i].name, item.events[i].value);
				}

			}
			if (item.attributes) {
				for (var i = 0; i < item.attributes.length; i++) {
					div.setAttribute(item.attributes[i].name, item.attributes[i].value);
				}
			}
			if (item.target) {
				item.target.appendChild(div);
			} else {
				document.getElementById("bmkmain").appendChild(div);
			}
		},
		name: "Drag_Event_Checker"
	},

	On_Message: {
		f: function(event) {
			if (event.data.type == "update") {
				Extension_Variables.Bookmark_Original = event.data.bmk;
				Bookmark_User_Functions.Show_Bookmark.f(
					document.getElementById("dir").dataset.loc,
					document.getElementById("bmks").classList.contains("__editing")
				);
			}
			else if (event.data.type == "setting") {
				if (event.data.scroll) {
					window.addEventListener("mousedown",Extension_Tool_Functions.Fake_Scroll_Event.f);
					window.addEventListener("mouseup",Extension_Tool_Functions.Fake_Scroll_Event_End.f);
					setInterval(Extension_Tool_Functions.Fake_Scroll_Action.f,40);
				}
			}
		},
		name: "Drag_Event_Checker"
	},

	Fake_Scroll_Action: {
		f: function() {
			if (Extension_Variables.Fake_Scroll_Direction == "u") {
				document.documentElement.scrollTop -= 80;
			} else if (Extension_Variables.Fake_Scroll_Direction == "d") {
				document.documentElement.scrollTop += 80;
			}
		},
		name: "Set_Scroll"
	},

	Cancel_Event_Bubling: {
		f: function(event) {
			event.stopPropagation();
		},
		name: "Cancel_Event_Bubling"
	},
	
	testfunction : {
		f: function () {
			var a = document.querySelectorAll("p.mona span");
			a.forEach(function (val) {
				if (val.style.color=="white") {
					val.style.color="#000000";
				}
			});
		}
	}
};

window.Extension_User_Functions = {
	
	View_Source: {
		f: function () {
			String.prototype.htmlEscape || (function(){
				String.prototype.htmlEscape = (function(){
					var s = this;
					s=s.replace(/&/g,'&amp;');
					s=s.replace(/>/g,'&gt;');
					s=s.replace(/</g,'&lt;');
					return s;
				});
			})();
			var dw = window.innerWidth;
			var i = dw/50;
			var d = document;
			function getByTagName( name ) { return d.getElementsByTagName( name ).item(0); }
			function getById( name ) {  return d.getElementById( name ); }
			var SPACE = "&nbsp;",
				RETAB = true, // 탭을 스페이스 ts회로 바꿀까(true/false)
				TS    = 2;    // 탭의 스페이스 수
			var TAGNAME_HIGTHLIGHT_COLOR = "#00f";
			var VIEW_BTN_LABEL    = '소스보기',/*소스를 볼때 누르는 버튼 글자*/
			REWRITE_BTN_LABEL = '돌아가기';/*돌아갈때 누르는 버튼 글자*/
			var title = getByTagName('title').innerHTML;
			var html = ((((getByTagName('html').innerHTML + '').htmlEscape()).replace( /\n/g, "<br>\n" )).replace( / /g, SPACE )).replace( /&lt;([a-zA-Z0-9\/]*)/g, "&lt;<span style='color:"+TAGNAME_HIGTHLIGHT_COLOR+"'>$1</span>" );
			if( RETAB ) {
				var tab = "";
				for (var i=0; i<TS; i++ ) tab+=SPACE;
				html = html.replace( /\t/g, tab );
			}
			var rewriteBtn = "<button "
				+ 'onClick="javascript:document.location.reload()"'
				+ 'style="'
				+   'width:100%;'
				+   'text-align:left;'
				+ '">'
				+ REWRITE_BTN_LABEL
				+ '</button>';
			var vewCodeHtml = '<head><title>'+title+'</title></head><body style="padding:0;margin:0">'+rewriteBtn+'<hr>'+html+'</body>';
			function viewCode() {
				getByTagName('html').innerHTML = vewCodeHtml;
			}
			viewCode();
		},
		name:"view_source"
	},

	Change_Broken_Link: {
		f: function(element) {
			var i;
			if (!element) {
				element = document.body;
			}
			if (element.nodeName == "#text") {
				var urlreplace = /h?ttp(s?):\/\/([\S]*)/g;
				var nv = element.nodeValue;
				var ids = new Array();
				var at = nv.split(urlreplace);
				var ss = nv.match(urlreplace);
				var aq = new Array();
				var id = 0;
				ids[0] = at[0].length;
				aq[0] = element;
				if (ss) {
					for (var i = 0; i < ss.length; i++) {
						ids[i + 1] = ids[i] + ss[i].length + at[i + 1].length;
					}
				}
				if (element.parentNode.tagName != "SCRIPT" && ss) {
					for (i = 0; i < at.length - 1; i++) {
						if (i == 0) {
							aq[1] = aq[0].splitText(ids[0]);
							if (at.length - 1 == 1) {
								aq[1] = aq[1].splitText(ss[0].length);
								aq[1].parentNode.removeChild(aq[1].previousSibling);
							}
						} else {
							aq[i + 1] = aq[i].splitText(ids[i] - ids[i - 1]);
							aq[i] = aq[i].splitText(ss[i - 1].length);
							aq[i + 1].parentNode.removeChild(aq[i + 1].previousSibling);
						}
						var a = document.createElement("a");
						a.setAttribute("target", "_blank");
						a.setAttribute("href", ss[i].replace(urlreplace,"http$1://$2"));
						a.appendChild(document.createTextNode(ss[i]));
						aq[i + 1].parentNode.insertBefore(a, aq[i + 1]);
					}
				}
			} else {
				for (i = 0; i < element.childNodes.length; i++) {
					i = Extension_User_Functions.Change_Broken_Link.f(element.childNodes[i]);
				}
			}
			if (aq) {
				return Extension_Tool_Functions.Get_Childs_Index.f(aq[aq.length - 1]);
			} else {
				return Extension_Tool_Functions.Get_Childs_Index.f(element);
			}
		},
		name: "ttp://_Make_Link",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAA" +
			"AeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADs" +
			"IAAA7CARUoSoAAAAGaSURBVGhD7VeBqsMwCHx5///P2zIQrDVGrcoIFgbbUo" +
			"3encaM1+f5O+D5PyCHbwqdyK8x2Yw0I0kItLSSgHW7PZ+RMcYSHWlNCyn18d" +
			"RnCSNPg9SAM+isxW0K45hlTRrhph+8Tn9rAqfv3BiZG8Am+Ps0lNbw+nyvgg" +
			"WcTIm0PAhbbUITmSzAh0oHAsuQlTj9gjxWdQEBY+RAerQ+Kq48t2K3UrpC2u" +
			"vHaxcqLW8QEXZhiVTIR0r4Iq3qlikFZgUmrEYi5PHEBystCzPcu/g/3JJpp9" +
			"vNW5Y4LonsHK8Q222I27JVMlqWLong0cIy/+xGEsoKBMftB6BY9hcPRC0SXF" +
			"DUtpwRjMIOZS7RJzZ4ULWycWMkYrTgamAlLSvr6nNEKuasIo1KJuxkxwHtul" +
			"hU8Or7CO773LSLJZMRnMWn6mTnik+6V1BGKmSZIq2JJG65FVJLS8Qii4h3Vd" +
			"KaGwGqqyssnCHcWVIhLXUiEahl+jhGWp1Ipkw8vpsRD2qZNs1IJroe382IB7" +
			"VMm2YkE12P72bEg1qmzTGMvAEtK+dZydFd9QAAAABJRU5ErkJggg=="
	},

	Inject_Temporal_Script: {
		f: function() {
			eval(prompt("", ""));
		},
		name: "Inject_Temporal_Script"
	},

	Blink_Line_Fix: {
		f: function() {
			var br = document.getElementById("view_content").getElementsByTagName("div");
			for (var i = 0; i < br.length; i++) {
				br[i].style.display = "inline"
			}
		},
		name: "Blink_Line_Fix",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAA" +
			"D/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADs" +
			"MAAA7DAcdvqGQAAAJ3SURBVHhe7ZZhcoMgFAY9Vw7keTyNl8lhUlBBjMSwKZ" +
			"npdNYfHWM/n49lQYeHRzOBoTlp8CEsIIGwhAUIgKhmCQsQAFHNEhYgAKKaJS" +
			"xAAEQ1S1iAAIhqlrAAARDVLGEBAiCqWcICBEBUs4QFCICoZgkLEABRzRIWIA" +
			"CimiUsQABENUtYgACIapawAAEQ1SxhAQIgqlnCAgRAVLOEBQiAqGYJCxAAUc" +
			"0SFiAAopr1RVj36TbOoP7b6DzepvvbVIdAh86pWfmR8zh0GWUjrMbYBdQOnX" +
			"8Mq8NcLyXaKLSlLnv6plnBnH29hQcNy3Ebx20Zrs8Of5Nf+fRwZ73/IhIxzL" +
			"n8tiLjxWkMjyt+r2uVFX/EBvt1XjEr9BOOYmc6DC39Z5uonVY5+acSmVmteG" +
			"ZS8j42UK54VjyNI961nn/YebjzAGudhucN/LAEsszpJA2wslCWUeVh1osfl2" +
			"G1WH39tBTv1Hme6bNZy6COM1n8OsHaVuITq1OR7YHn69UBlRfPrJqLX8Ninc" +
			"cBvNjgl342xeL5S5lXrcOx+xjn/PJFWRaPm1BZfb2xGOUTK1S8d+dNb8O8Sw" +
			"7jlL6zikGUPeGXZNrLl214n5PitfGb77q+nTfBwgS63dDhk6FbLy+XYccn/K" +
			"NSf9ysv0VaWGA+hCUsQABENUtYgACIapawAAEQ1SxhAQIgqlnCAgRAVLOEBQ" +
			"iAqGYJCxAAUc0SFiAAopolLEAARDVLWIAAiGqWsAABENUsYQECIKpZwgIEQF" +
			"SzhAUIgKhmCQsQAFHNEhYgAKKaJSxAAEQ1S1iAAIhqlrAAARDVLGEBAiCqWc" +
			"ICBEBUs4QFCICoZgFYP1gVHwXKh5cqAAAAAElFTkSuQmCC"
	},

	Return_Blink_Line: {
		f: function() {
			var br = document.getElementById("view_content").getElementsByTagName("div");
			for (var i = 0; i < br.length; i++) {
				br[i].style.display = "block"
			}
		},
		name: "Return_Blink_Line",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAA" +
			"D/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADs" +
			"MAAA7DAcdvqGQAAAMjSURBVHhe7ZoxcvIwEIXlnAX+gskJ4ARMGqq0dFAmDR" +
			"0lHY0p83dpU9EEnyA5QYYi5i7OSrKN7WQGv5BZi+SpYDSeZ1v6/Fa2lo2yLD" +
			"Ns7QhctZNRZQkQFuADwiIsgAAgpbMICyAASOkswgIIAFI6i7AAAoCUziIsgA" +
			"AgpbMICyAASOkswgIIAFI6i7AAAoCUziIsgAAgpbMICyAASOkswgIIAFI6i7" +
			"AAAoA0KGcdNqN5AgxeWxoUrHLyyTwabQ7aLE7eL0xY44fs5a53cvDagm5giX" +
			"OO8SbBF7k2Wu/z6ft4lN/CX2W3duZvhyWTlbadZA9jP9Vk3t8vpe5J2tL8f6" +
			"3Ov3dza56eXTSme3N7Y60mnpts7SW6WNz0nOUNJJikFaSE1fYtXuTcxot4WD" +
			"NLSUtUnpVtwkuaQ6a8sOnB6t29ZFk6WCFTzGnVWBkbnlG0GqSZ9sKmB8u5wh" +
			"F7NNMyjPoDc7/OPxeS9X0tDK3eRuJ0ZZbFcm/DeGoe1Tl5U/vlosOWlrE3i+" +
			"PhbGeHIsd8x3VN0e9wlO7WEWtK279TlcOw/cBCVBIW8FQIi7AAAoCUziIsgA" +
			"AgpbMuCVYyV97gAXCa0ktxVhBMLwRWYyt9hjvOObUbWI0UXlqm//JcsvXRRr" +
			"bMRYQeWXWa/NPeSO9m9tFWdsb2wDCWdIvfNPuuPVjTFAqr+nQJtf21HiyfXf" +
			"iUQNjNKiAKWs2DX6QdHLIqQwVkemHYMvl3/a/xR8Xh+el6kudS/YLzZ5N/Mv" +
			"fXavbPDPr1JbjB6m8n/2zExW4hqwTpMQwraUCFODtxi8CTf/JafF8E8xdi4L" +
			"DO+Sr6+XP1FvifH7v6FQkLQE5YhAUQAKR0FmEBBABpUM5i5R/w5EopK/8Aaq" +
			"z8q8Bi5V8r57DyrxUmVv61wuRFLZN/tSuy8o+Vf9/PzLHyDwjPC5IG9QUfOj" +
			"fCAp4QYREWQACQ0lmEBRAApHQWYQEEACmdRVgAAUBKZxEWQACQ0lmEBRAApH" +
			"QWYQEEACmdRVgAAUBKZxEWQACQ0lmEBRAApHQWYQEEACmdRVgAAUBKZxEWQA" +
			"CQ0lkArA9MJatAph9IyQAAAABJRU5ErkJggg=="
	},

	hitomi_Image_Downloader: {
		f: function() {
			var num1 = Number(prompt("max", "-1"));
			var num2 = Number(prompt("min", "0"));
			var galleryId="";
			if (location.href.indexOf("/reader/") != -1 || location.href.indexOf("/galleries/") != -1) {
				galleryId = location.href.split("/")[location.href.split("/").length - 1].split(".")[0];
			}
			else if ((galleryId = prompt("다운 받을 갤러리 주소",""))) {
				
			}
			else {
				alert("갤러리/리더 화면이 아닙니다.");
				return undefined;
			}
			var target = galleryinfo.slice(num2,(num1==-1?undefined:num1));
			var key=document.querySelector("div.img-url").innerText.split(".hitomi.la/")[0].split("//")[1] + ".hitomi.la/galleries/";
			if (!confirm("download?")) {
				document.getElementsByTagName("head")[0].innerHTML = "";
				document.body.innerHTML = "";
				var arr=[];
				target.forEach(function (val) {
					arr.push("https://" + key + galleryId + "/" + val.name);
				});
				Extension_Sub_Functions.hitomi_Image_Sequential.f(arr);
			} 
			else {
				target.forEach(function (val,index) {
					var m = "";
					if ((index+num2 + 1) / 10 < 1) {
						m = m + "0";
					}
					if ((index+num2 + 1) / 100 < 1) {
						m = m + "0";
					}
					var hrf = document.createElement("a");
					hrf.href = "https://" + key + galleryId + "/" + val.name;
					hrf.download = "hitomi_" + galleryId + "_" + m + (index+num2 + 1) + ".jpg";
					if (hrf.click) {
						hrf.click();
					} else if (document.createEvent) {
						var eventObj = document.createEvent('MouseEvents');
						eventObj.initEvent('click', true, true);
						hrf.dispatchEvent(eventObj);
					}
				});
			}
		},
		name: "hitomi_Image_Downloader",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAA" +
			"AeP4ixAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6Q" +
			"AAdTAAAOpgAAA6mAAAF2+SX8VGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAW" +
			"JLR0QecgogKwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNC0xMC0xOVQyMTozMD" +
			"ozNyswMjowMF1ZuNsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTAtMTlUMj" +
			"E6MzA6MzcrMDI6MDAsBABnAAADX0lEQVRoQ+2YP0wTURzHv/enNoW2VG1LAE" +
			"shUQJEB1mcUBcHB00kDsawuOjsREyIiTEYMcRBBgcd1MRJIzFao4MmriYiYS" +
			"CKgRjRQBRBoBRo766+d6XlrELL3e8lhNxbmt67e+/3+X1/v9/73UlZNrANhk" +
			"QB0tp2pOAK3TAA5htJkiDLcuG6YWRhGLr5X5JkKMra3MjgW8euJAXxeDyIx+" +
			"qgst90Oo2vE9+haRrjyqK2tgYtzfvANsTk1A+MfBwtGE8BsuYWhz4xmBLRSB" +
			"g3e6/gwd1buNHTjZ2hKhOCz7UfaEbvxQvo77uKzrOnwXQDZUyTgXA/yLKEQM" +
			"APf2UFAn4/JPbfYCBNu4JoT8/i2/07mB8axO6shoPhIHwsvKhgSEFyov5r2q" +
			"HqEOp8O6Alk5h8lUBk+B262vbiWCxCJosAkFUcpoSu6SxHdEwll7DCcoVlOb" +
			"T5OejJBfhUBQ3BCjDRSIYwEL+/EqdOHkfnmQ7EDx+FFms0K1legrkVDUPT89" +
			"CJqj9Z1eIJHa/fYyZ6dZSFTNHIzP3GxMN7YBJhXJdxO/EGo7NJE2RLVa1S8e" +
			"GpCqHmRAcazp1Hqmk/RmYWyNQwC00pA+zOz8zM4npfPy5dvoau7h48efoCvl" +
			"g95ECQpwrLDaLkWDVQGEhyMYXEy9d4PPAcjwae4f2HYbs+Kes5YSA8sRVWmV" +
			"RVhaqof7UrZVm2yZsEgNCGTLk8pCC8HeE9Fu+vlpdXzObRHIyNVzU+p+u5s4" +
			"V6kJVfbpjX60VrSxM8LJxSqSV8+jyGTCZj9lvV0TAaG+LmWfJz+hfGxr8UWC" +
			"jKLykI97/BPM6F4EVJUZSCsRxG13mrmOvJrC3+lgGhDhM765EoUrxxrhVZf4" +
			"h4KRUGsp6xHFIECGnVshMSVM8IU8QNLZsSuaG1kePcqmUzrMwuiOIDnXuOOF" +
			"Cg+NFtk+wuCGFUkCzlKkLiRsJFXEUInUmylHsgkriRcJFtkyOOQ6tUp1uu05" +
			"2+/pKAODaC4D2eNLS4OhspZJ2jUjKvOBlI/usIVydvJLWxG4UpGYh1k3yoWU" +
			"PO+hlIxCchISDlJjjlfUJAikNLtBrcIWQg+dywGu20mm1GMTIQvik3/H/GW6" +
			"+JgiM5RzbjufXudQroGIQCgmIN0tCiMMjuGn8A/O2d15PLg+EAAAAASUVORK" +
			"5CYII="
	},

	Force_Drag_Enable: {
		f: function(element) {
			if (!element) {
				element = document.documentElement;
			}
			if (element.attributes) {
				if (element.id != "img") {
					element.removeAttribute("ondragstart");
				}
				element.removeAttribute("onselectstart");
				element.removeAttribute("oncontextmenu");
			}
			if (!element.childNodes) {
				return undefined;
			}
			for (i = 0; i < element.childNodes.length; i++) {
				i = Extension_User_Functions.fde.f(element.childNodes[i]);
			}
			return Extension_Tool_Functions.Get_Childs_Index.f(element);
		},
		name: "Force_Drag_Enable"
	}

};

window.Bookmark_User_Functions = {

	Show_Bookmark: {
		f: function(bmkpath,edit=false) {
			var a = document.getElementById("bmks");
			var e = Number(a.scrollTop);
			while (a.firstChild) {
				a.removeChild(a.firstChild);
			}
			if (!Extension_Variables.Bookmark_Original) {
				if (confirm("web bookmark load failed.\nload bookmark from local?")){
					Extension_Tool_Functions.Emulate_Click_Event.f(document.getElementById("getbmk"));
				}
				return undefined;
			}
			var Bookmark_Pointer = Extension_Variables.Bookmark_Original;
			bmkpath.split("/").forEach(function (val) {
				Bookmark_Pointer = Bookmark_Pointer.value[val];
			});
			if (!Bookmark_Pointer) {
				Bookmark_User_Functions.Show_Bookmark.f("root",edit);
				return undefined;
			}
			var lists=Object.keys(Bookmark_Pointer.value);
			lists.forEach(function (val) {
				var c = document.createElement("div");
				var b = document.createElement("label");
				c.dataset.id = val;
				c.id="chk"+val;
				c.classList.add("__input");
				c.classList.add("__hided");
				if (edit) {
					c.classList.remove("__hided");
				}
				b.appendChild(c);
				b.dataset.src = Bookmark_Pointer.value[val].value;
				b.dataset.loc = bmkpath;
				b.classList.add("__"+Bookmark_Pointer.value[val].type);
				b.id = val;
				b.appendChild(document.createTextNode(val));
				if (!Bookmark_Pointer.value[val].data.croped) {
					document.getElementById("bmks").appendChild(b);
					document.getElementById("bmks").appendChild(document.createElement("br"));
					b.addEventListener("mousedown", Bookmark_User_Functions.Bookmark_Click_Action.f);
				}
			});
			a.scrollTop = e;
		},

		name: "Show_Bookmark"
	},

	Add_Bookmark: {
		f: function() {
			if (!this||this.classList.contains("__disabled")) {
				return undefined;
			}
			var a = {};
			a.title = prompt("bookmark name", document.title);
			a.url = prompt("bookmark path", document.location.href);
			a.type = "link";
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"add",
					loc:document.getElementById("dir").dataset.loc,
					data:[a]
				}
			}, location.href);
		},

		name: "Add_Bookmark"
	},

	Bookmark_Click_Action: {
		f: function(e) {
			if (!document.getElementById("bmks").classList.contains("__editing") && e.which == 1) {
				if (this.classList.contains("__link")) {
					var a={};
					a.url=this.dataset.src;
					a.active=!document.getElementById("bactab").classList.contains("__checked");
					if (document.getElementById("tab").classList.contains("__checked")) {
						window.postMessage({
							type: "update",
							des: "back",
							prop:a
						},location.href);
					} else {
						window.postMessage({
							type: "create",
							des: "back",
							prop:a
						},location.href);
					}
				} else if (this.classList.contains("__folder")) {
					var s = document.getElementById("dir").dataset.loc + "/" + this.id;
					document.getElementById("dir").setAttribute("data-loc", s);
					document.getElementById("dir").innerHTML = s;
					Bookmark_User_Functions.Show_Bookmark.f(s);
					if (document.getElementById("go_up").classList.contains("__disabled")) {
						document.getElementById("go_up").classList.remove("__disabled");
					}
				}
			} else if (e.which == 1) {
				var input=document.getElementById("chk"+this.id);
				Extension_Tool_Functions.Element_Toggle.f.call(input,e);
			} else if (e.which == 3) {
				e.preventDefault();
				if (this.classList.contains("__link")) {
					var a = {};
					a.ptitle = this.id;
					a.title = prompt("bookmark name", this.id);
					a.url = prompt("bookmark path", this.dataset.src);
					a.type = "link";
					window.postMessage({
						type: "change",
						changeinfo: {
							type:"edit",
							loc:document.getElementById("dir").dataset.loc,
							data:[a]
						}
					}, location.href);
				} else if (this.classList.contains("__folder")) {
					var a = {};
					a.ptitle = this.id;
					a.title = prompt("bookmark name", this.id);
					a.type = "folder";
					window.postMessage({
						type: "change",
						changeinfo: {
							type:"edit",
							loc:document.getElementById("dir").dataset.loc,
							data:[a]
						}
					}, location.href);
				}
			} else if (e.which == 2) {
				e.preventDefault();
				if (this.getAttribute("class") == "__link") {
					window.postMessage({
						type: "change",
						changeinfo: {
							type:"update",
							loc:document.getElementById("dir").dataset.loc,
							data:[{
								type:"link",
								title:document.title,
								ptitle:this.id,
								url:location.href
							}]
						}
					}, location.href);
				}
			}
		},

		name: "Bookmark_Click_Action"
	},

	Activate_Bookmark_Edit: {
		f: function() {
			document.getElementById("bmks").classList.add("__editing")
			for (var s of document.getElementsByClassName("__inedit")) {
				s.classList.add("__disabled");
			}
			for (s of document.getElementsByClassName("__editout")) {
				s.classList.remove("__invisibled");
			}
			for (s of document.querySelectorAll("#bmks .__input")) {
				s.classList.remove("__hided");
			}
		},

		name: "Activate_Bookmark_Edit"
	},

	Deactivate_Bookmark_Edit: {
		f: function() {
			document.getElementById("bmks").classList.remove("__editing")
			for (var s of document.getElementsByClassName("__inedit")) {
				s.classList.remove("__disabled");
			}
			for (s of document.getElementsByClassName("__editout")) {
				s.classList.add("__invisibled");
			}
			if (document.getElementById("dir").dataset.loc == "root") {
				document.getElementById("go_up").classList.add("__disabled");
			}
			for (s of document.querySelectorAll("#bmks .__input")) {
				s.classList.add("__hided");
			}
		},

		name: "Deactivate_Bookmark_Edit"
	},

	Remove_Bookmark: {
		f: function() {
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"remove",
					loc:document.getElementById("dir").dataset.loc,
					data:Array.prototype.slice.call(
						document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
					).map(val => val.dataset.id)
				}
			}, location.href);
		},

		name: "Remove_Bookmark"
	},

	Go_To_Upper_Bookmark_Folder: {
		f: function() {
			var a = document.getElementById("dir").dataset.loc.split("/");
			if (a.length == 2) {
				document.getElementById("go_up").classList.add("__disabled")
			}
			var b = "";
			for (var i = 0; i < a.length - 1; i++) {
				if (i == 0) {
					b += a[i];
				} else {
					b += "/" + a[i];
				}
			}
			document.getElementById("dir").dataset.loc = b;
			document.getElementById("dir").innerHTML = b;
			Bookmark_User_Functions.Show_Bookmark.f(document.getElementById("dir").dataset.loc);
		},

		name: "Go_To_Upper_Bookmark_Folder"
	},

	Create_Bookmark_Folder: {
		f: function() {
			var a = {};
			a.title = prompt("bookmark name", document.title);
			a.type = "folder";
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"add",
					loc:document.getElementById("dir").dataset.loc,
					data:[a]
				}
			}, location.href);
		},

		name: "Create_Bookmark_Folder"
	},

	Move_Bookmarks: {
		f: function() {
			document.getElementById("pastebmk").classList.remove("__hided");
			document.getElementById("bmks").classList.add("__copyactive");
			Bookmark_User_Functions.Deactivate_Bookmark_Edit.f();
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"remove",
					loc:document.getElementById("dir").dataset.loc,
					data:Array.prototype.slice.call(
						document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
					).map(val => val.dataset.id),
					crop:true
				}
			}, location.href);
		},

		name: "Move_Bookmarks"
	},

	Cancel_Paste_Second: {
		f: function() {
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"return",
					loc:document.getElementById("dir").dataset.loc
				}
			}, location.href);
		},

		name: "Cancel_Paste2"
	},

	Paste_Bookmark_Second: {
		f: function() {
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"move",
					loc:document.getElementById("dir").dataset.loc
				}
			}, location.href);
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
		},

		name: "Paste_Bookmark2"
	},

	Export_Bookmark: {
		f: function() {
			window.postMessage({
				type: "exportbmk",
				des: "back"
			}, location.href);
		},

		name: "Export_Bookmark"
	},

	Sort_Bookmark: {
		f: function() {
			window.postMessage({
				type: "change",
				changeinfo: {
					type:"sort",
					loc:document.getElementById("dir").dataset.loc
				}
			}, location.href);
		},

		name: "Sort_Bookmark"
	},

	Hide_Bookmark: {
		f: function() {
			document.getElementById("bmkmain").classList.add("__hided");
			var a = document.getElementById("actionbar")
			a.classList.remove("__hided");
		},

		name: "Hide_Bookmark"
	},

	Backup_Bookmark: {
		f: function() {
			window.postMessage({
				type: "backupbmk",
				des: "back"
			}, location.href);
		},

		name: "Backup_Bookmark"
	},

	Import_Bookmark: {
		f: function() {
			window.postMessage({
				type: "importbmk"
			}, location.href);
		},

		name: "Import_Bookmark"
	},
	
	Merge_Bookmark: {
		f: function() {
			Extension_Tool_Functions.Emulate_Click_Event.f(document.getElementById("getbmk"));
		},
		name: "Remove_Saved_Bookmark"
	},

	Remove_Saved_Bookmark: {
		f: function() {
			window.postMessage({
				type: "removebmk"
			}, location.href);
		},

		name: "Remove_Saved_Bookmark"
	},

	Get_External_Bookmark: {
		f: function() {
			var reader = new FileReader();
			reader.addEventListener("load", function() {
				window.postMessage({
					type: "change",
					changeinfo: {
						type:"import",
						loc:document.getElementById("dir").dataset.loc,
						data:[JSON.parse(Extension_Tool_Functions.utf8_decode.f(reader.result))]
					}
				}, location.href);
			}, false);
			if (this.files[0]) {
				reader.readAsBinaryString(this.files[0]);
			}
			document.getElementById("getbmk").classList.add("__hided");
		},

		name: "Get_External_Bookmark"
	}

}

window.Extension_Variables = {
	Bookmark_Interface_List: [{
		tag: "div",
		name: "edit bmks",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFQSURBVEhL7dPPKwRhHMfxWcWVRBJyd+OERDnI38HfoHXh6Nd/ws1/4KokSiK5cEdCHPx4v3dNTds+9tk8k4tPvWp2dub5PvvZmew/7WYCp/jAZwSvO4H3RcWLb7CNrQg7uIX3ReUdLt5O1uF9UfFnb9YPy6nLC/MBpdRVHFBKXcUBxePYrML7gvnzAZVvofx6QAeusI8VTKETeZJU5OI+kvnje4gemCQD3LmLj2EZrzhCL0ZxjWCKj2ZowCT8bqn2KcsW8YJj9GEEweQv1xpCA7pgLW9wcbOAZ/jm93silHE4JO+32QDTDWtx5y5u5uGQMwx4olVavcl2bi0u6uJmFk84x6AnfkqxrmoT/qF2bi0OmYOZwSMuMOSJUBrrauTTMgw7txZ37uJmGg84qH1KEDu3Fnfu4mYP9/XDNLHzS7jzXfgrN5A0VmYtd2DxrPIF/Z6XYmBn5SYAAAAASUVORK5CYII=",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Activate_Bookmark_Edit.f
		}]
	},
	{
		tag: "div",
		name: "add bmk",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVGhD7dgxCoAwEETRtNqIJ/DWgqfV3XbRYDCRSfgPpgmC/kIEEwAAwCuT7Qjzs+4stjPMz7pDiBpC1BCihhA1hLQ229aCbbYY4md31z7N71ndbosP1np+z+oI+TBCcoZ52UvxHVFDiBpC1BCihhA1w4QM8xMbAAD8K6UL3iPe8XBShfQAAAAASUVORK5CYII=",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Add_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "sort bmk",
		classname: ["__buttons","__inedit"],
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVGhD7ZlL6A1RHMePdyTylrxSZIGtPBOyETuKkvKK9E+i2MjKY2WFjSXWIiWPLDzzihQbFIWFDYmV5+d7zj11mu7Mnbn3/OfOn/nUp/v73f+/e8+3uTNz5hxTU1NTmAm4BtdVVI1NY8xkBX7DPxVXY1yOqdzBD6jUKyuqxqYx3sJU3uFlV1YajVFjTaUOUjJRgwxovHaDqEGe4GFXlk7UIF/wvCtTmYVH8XjDPRiD0oNsx9/or/+fcCh2StQgn/GsK3MxBAe7smOiBtmJ811ZOlGDdJOoQU7ielemounEI3zcxGs4BtshapA8J/sSvIrXA++hgqgei+1QepDeog7SjDxB+uF0nJHiNByFw7EIpQfZh+EDUZq/cCnmpfQgE3Eb7sBdeCBFTV2KHJXSg/QWdZBm5AkyBfdj8qe0F/Vza+YWHI1ZlB6kB5ud3K1UmCzaDrIZL+JI2zmSQRbgXdRlNWQqJi+7Wepy3Yq2g2jO9BMfog8TBlEI9e9xvN7oZdoOIjahwmgSqDA+yMJGrRAzsQw6CiLCMN/xOWaF0MrlfbyB4cQxr5pwrsIkHQcRPow/MbOOhAbxAJNT+DSf4ZvAV7gBk0QJInyYMn9OIdGCCJ3guk90g6hBukkdpGr8n0GO4SlXWs7gIVdaLuFuV5r+qEUFbY2JYfgUl9nOPZe8xHm2M2Y2vsDJtjNmMeqe5GcNa1GziIG2M2YrXnGlpVCQ26gP96gOj1Y4RdEAdE9ReKH5lXo9TAkNVP1G2xmzGtXrfaH/Uz/XdsYcRPU+2GnU93kKBbmAN11p0VbXOVdaXuMJV9qlUH2RpuxCz+E/0N/MdAS0Buzv0otQA51jO3ckdV+aZDsXTPuEWmYVR/CtKy2FgmixOXz8HIH+g4UGO8iVFq1R6SfmGdd49ST75OQy/Ls+J1zz0l5M+IzSMkhf2AzV+fMRMzdDteXbF7anv2Lm9rTQIdcRCTfpq6TGVsYzT03NP4QxfwEEVaw9vxJoVgAAAABJRU5ErkJggg==",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Sort_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "new folder",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVGhD7Zo5rA1RAIZfYhd7ZY8gGiERQSnREFthaUS0Yo1GKB8iEh0SnS2CoFHQEBqhoqMQBAWJXYLC7vvGPc/cefPu3Ce5c8+T+ZIv754z52bmvzPnnJkzr6OioqJphuARfI+/mvA5LsLoOIwe4A98V+AHtO1HnIpR8QZ/4oykVMwpNMwt7GdFLHhQ/tLNMgKfoN/bg6NLcjg2pLdBZCF+R79bpk9xLeZig94GkTX4EPP6UisM/dMfcC5241+DtIP96PEeSEoZ+lKQdejxHk1KGUKQweiQGqsTsTCIw++32ueY/Vr722MQ/YyPI/YZ+oM3DOKs7qmLnU5sGOS/6ux9gSpIbFRBYqMKEhtVkNiogsRGFaRsBuJknIczcSSmiT7IYryILvx5PEEXGu7gdhyG0QbxGegGhgP3uegRuvh3D9PBXKoNi4NRBXFJ5wW6/1e4A8dimkG4DG9jCBRVEM9ECHEFXb1MMwEH/PnYxVYM6wrHrMjSjiDX0f1exuz68Xz02fxQUqpnPfq9TzjFijRlB1mC7vMljrIig5eS288kpe4cR7fbX+ooO4ijk/u0T+RRFGQ8uiz0BcdYESgziNe9I5Gj0zgrcigKIlfRNquTUo0ygzjZuT+H2MACdIU96LqubW6m6nQF+nZNfJ1hG5eHuigziAft/hxOZRKGRbdm3IWyBS37yrALK8oK4lsx9+dkJ15qjk4XUnombOPKYrr+LM5GMZBt9iWlGmUG8TbDM+Dw6WSXRzN9JMzwG5NSDTue675lEWbp5UmpO0VB+qN3AraZZkXgPlp5ENOdq1WG4df7qTyKgmxGt3szWcdKbNcrhW2YJUyYp5NSPdPxLbp9qRVZ5qBnJN25WukltK94m74B0/jCaTfOSkp/McQDNMQ5K2JhE4ah19uOniZI+4SXky9EbWsfG4pR4dlwxPQAve24hnvRkJ6Vk/ga3a7nMboQASfFE5h9Okx7F+07fQLnmFW4E/3/GM+M80TdEFtPR8dvE7bxLI9A09kAAAAASUVORK5CYII=",
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Create_Bookmark_Folder.f
		}]
	},
	{
		tag: "div",
		name: "go up",
		classname: ["__buttons","__disabled","__inedit"],
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALlSURBVGhD7ZhNqE1BAMePr0IpNpLFK0IpNmQjHz31LNgjSYpIiYXEAisLeRuvXkrpLWwslC2SRBaSvY2djZJvsSD8f3POaNzmns+Zc506//plZs7MnPm579yZe5I+ffr06Wy2idviQUVuikNijhh5Vonv4qN4UZF34re4KxaKkeaIYDEbTK1a+CTOi1/ioRipzHGByJip1ctJgcwjMTKZECLkhEDmudgslgRmtshNKBFyWPC8MV9oPgnWOjQhRchycUBcEpcD8kz8FCuFN6FFYmWHYJ27TM2TrohsEazzi3gv3or7YoUw6ZoIe9Z1wWb8VTwWJl0T2W1qaW6IH2kxngib5WRGiCOMT+SaoM0khggLnxHMC5SbyrQu4kpMZYSQaVVkUGJWRgiZ1kR8EjYhZFoRyZOwaSoTXaSMhE0TmagiVSRs6spEE8mT4GDnHrspu4e9OjLRRHYKxj0RrgRHeX6XHDS1NJRp45oNYxjLHBM0FCSayHxxTzD2NA2KlaCNeW3sPVwZxtDGHMxVlKjPyAJhZXgLw0JfZnWfCNfoQ1/qjGWOMokqQlyZp2JdVvaJcI0+lKtIkOgihAXxq3CRYB7m84lwjT70rSJBWhFxUyRSN6VF6LCxAWsEKSNCX98cefAlUUokBJtEkQh93DFVKRQ5J442YK+YK4pE5gn6+ubI44ooJcJNBnfYwZdiZa4XidS9R+lnZK3gzcQeQZaJz4I39WS94CUZ/5Ltguv0I/wvM555hok0uUdpEduRPzHCZNT3m1o6gTsR7dTtTRnnzuMTaXKPaJ8I7bE/EfcehSL7BJWtoukzQj3WM2JPDGdMLc0d8SYtJslSwZu7V+KU8H1jVMH+iflEmnwzHhMfxDdxUVwVnNumxd+Mi9eCm4XCJxISJG4Jjjz/hN8Hq4VvV62CfWB9IlzzjanDYhE1Rc9IZ9KL/G+xIhcELxyAcudE2LxYtA+7eXYmbLJnB2Dn7zM8SfIHVRHsBwr8ASgAAAAASUVORK5CYII=",
		id:"go_up",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Go_To_Upper_Bookmark_Folder.f
		}]
	},
	{
		tag: "div",
		name: "close bmks",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADfSURBVEhL3ZVBCsJAEAT3Jb7AJyjiSYgvUPy1d0HNSbz5AO0+DAzbDYqjlxQUYTc9M5BlSZsUWzjCZ1H2GKBwha7gGy9QcMGKggtVFFyoouBCZ3iAj7QX3uAe3tNeVnChFSRLmIew+RySHcw1oeBCJziDJIbk5nxy7WoFF6J5yAJ+0pwKLhTmIeRdcyq4UJg/C+nPxCm4EO2/eX8mroYKLtQ359odvKsVXGgNSTSP/TyE9yTXhIILHSGH5OYhh/Ce8DL276jgQhUFF6oouFBF4e8/HP7mfjGEzTdwErT2AjAPXxCNcx+EAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Hide_Bookmark.f
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
			value: Extension_Tool_Functions.Element_Toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "this tab",
		events: [{
			name: "click",
			value: function (event) {
				Extension_Tool_Functions.Element_Toggle.f.call(document.getElementById("tab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		id: "bactab",
		events: [{
			name: "click",
			value: Extension_Tool_Functions.Element_Toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "background tab",
		events: [{
			name: "click",
			value: function (event) {
				Extension_Tool_Functions.Element_Toggle.f.call(document.getElementById("bactab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		name: "import",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEYSURBVEhL7dWva0JRGMbxO5nVsLS0uGBY0SA2mwPDLEOWlvRP0ComDZaBYBSWjGNleWBaWhcMYnOYBhrU73suF0TmOe85acEHPnAPnHOf+/tGJI0pdgFWuIM1N0gmf3mYQ9Y9wZqk4N2M9GnhXGBNAU1kzciS0AJ1fAoeUI839dEUpNDDFt5n6iq4xCtkTtCltBVc4HDnhzb4wRLyJfjGBB8YowQTW0EbxzvWkgMzsRXIUaxxvFijDxPXPahCLkeycIERhuiiA3kfGqjhHkVkYOIqkFTwC9e8P6MpkOQxw5sZeURbILnCbbypj09BUEILniE/nrIZWRJa8P/+B5/IeXiBquAaMjHUI5yRN1E+UL4GkEf3RKJoD6oapuFu11fgAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Import_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "export",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEUSURBVEhL7dUxS0JRGMbx2+xHsF0QtxZpq8mtXRe3mgVJaG1ocpVoj/QTiKuDCE1BOAh+gSAbqiVB/8+RGzfJc46HMzj4wA/OK+fe56L3ehMyxjLAJ87gjDZ/43kHM+i4FpzRxpf10jtVHAqsKeIaZTM5ElKwU2IVNPDvbRurYIgFmmbKJGaBziVtHMHEVXCOezyhjxEm0MP2Dj3R6YmzVGKiwVYwwObBvi5hFraCLjYP9PGBE5jBVpDHBWrQFen+v8UdOtDX94g3pCf/wu8d5SrwTfojz3GqD9LELHhFwUyZxCooIbde/k2sgq0JKahAL566mRwJKdi/98EUeih83cC74AfaHEJ/0c5coRfgAcewJElWV7ymskrVIa4AAAAASUVORK5CYII=",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Export_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "backup",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVEhL7ZWtTsRAFEY3QeF4CQTBoQghKCwej0CC5AX4MQg8hv/wDHgeAgIOEgwOSeCcdi+ZNFOYaSr5kpPe2d3eM3sz3Z38pzZzsF7JGhRnFb4GcAxFCcEuuLvT6TrdseubpH6bXoskIfBq9sB1mjvYasvmvUOweZGkRJAmBOYEXC83q570Cdx1jlTQvTeb7oc2Idc4JcY1SFCTUQSz4LOSS7Ug6mAbbP4Jj3ALHucZMIMFl3AEG2Ae4B2ewfevQck8fEC1oHuDO39qy59TdgVKfPiWoDclgh3wdZubkPhNY1y9KRHYxLHkJBfwq6REYGziWKol0dTTIVGnP3ayADZxLDnJGWQlIfgLT4uiaknNH84KGJucQ05y0KxGSE7iQXhty3GixLEocWwvcA+jRsk+uHOaTxa/Ac9Gmu9xpJJiAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Backup_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "merge",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFXSURBVEhL1dW/K0VhHMfxI4UyYCGLkJTCQBYLu8FyDWbFhs0qg8EoIn+FDAwyGkiUwoJSfidlsnp/zjenc85z7/Uc96R86lXfM9znc+6553lu8JdpRFNMA3LLNu5xE/OIDVScejzbmEgNzjCDwYx6UIUwehR3Njrpxg72MzrHKsKUK/ht2nFroxV84ggnOTlFdNMq+EAvOnMyhkTBT4+oGqOYRgF6jculDd4FfbjEIdagV/oFKisV74JWPEB3HU8XVDoRXrnxLljBso1OBqANWSzeBccYsrFo9LkOGxPxLtBO7rexaK6gxdLxLtjCvI1OtMiTjU68C3SmaBHtkXh0fh1gNrxy412gjOMV65jCIq6hHbuLWqSTqUBpxhxUsgD9LjotN7GHdEnmglL5LtE3iY5nkluBooVHbIySKKjDG1oQ/8usxDAuEGUJelvec6K7n8S/TxB8AR2GeWDyey0JAAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Merge_Bookmark.f
		}]
	},
	{
		tag: "div",
		name: "expand",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVEhL7ZLLCYRAEEQniQ3D/E8mYUKrvfCgpj9DH7ys+KAQp6qrBWc8iu9CFVkWBbIQqsiyKKDmcelzqYtlbUY7AlrOs7NEy3VJAMMPrJZkWXoCanSWVBntmfCGFux24LAz8/wH+J4lNmhF2+9txs7M0/KXP+TWn+yvlw3eek3V0HJfAFVGeyYwOuWQZekJYHTLwS+hJ4BBsFMOugQF1PSqyLIokIVQRZZFj2CMEwcelwlE5J32AAAAAElFTkSuQmCC",
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: function (event) {
				document.getElementById("bmkmain").classList.toggle("__expanded");
			}
		}]
	},
	{
		tag: "input",
		id: "getbmk",
		classname: ["__hided"],
		events: [{
			name: "change",
			value: Bookmark_User_Functions.Get_External_Bookmark.f
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
		name: "remove",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACFSURBVEhL7Y5BCsMwEAP9u+ZX/Wv6kHR9E2FktKWHEDIwBwlr8Xj4F+/yODm7nzkfS42hceK1oB+ubENHVrahIyvb0Nhl7WJo7LJ2MTR2WbsYGrusXQyNXdYuhsYuaxdDY5e1i6Gxy9rF0Nhl7WJ0nNjmU9Ihci/bbOUc0kF1vnmVt2SMLxWMrm3WZuxXAAAAAElFTkSuQmCC",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Remove_Bookmark.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "move",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGESURBVEhL7dS/K0ZRHMfxg/xKfsdAShaTMhkM/gBRREpSisGg7CaDycSoGBhIPCIGhRgUq5LBrKTkRyLk1/tzn3sMt4fO5QwGn3r1nHNu93vuec651/yHFIe/3lOJCSwEPc9pwSPe0a0B31mFit8jTwNxkoX0ZDNlimCfflEDrinAHB6gAjMoRDR9UHFp14BrtFm66TSk9jKi2YSu3SJHAy7JxRuOkYkMHOEF1bDJxgU0wawGXKP/9RWHSNMAOYAKaZJtDKAEeoBm1CNWtqCCe9gJ21HP2EAvtGexUoFd2GJaQRumcRWOnWMsbOswJNAF/cXO0RtalWx+Rkd3CnbyqDvMoxXapx9lHyqmVXRgCVpFdLJr6Ig3wSn5aIBOmQpMwkbXerCOJ+i6VjOOcnwbnaZR2ButRqSKvqraj9Kg5xA9mQqeYQV2ohp4yRpUsDboGTMM9QeDnofYL2Zd0DNmBOr3Bz0P6YQK6lToxdMbfYMyeMsQLqGJTvDVBv86Oo5/McZ8ADxubY+z76C3AAAAAElFTkSuQmCC",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Move_Bookmarks.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "end",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVEhL7ZVBCoMwEEXTfYUu2oXgUbrsgbxF9z1aL+DeS7T/RwfLMAlxQqALH3wSBzMvqMRwsJcL8qgMeyS5I5/KsEcSEYyItbtcuKZYkL0pQdFa66brOmpOSLdMIy4Bm0/IM15tsPkLeSNnFoBLII1YE4lVIy4B0Q2t5sQtIL8Sqzn5X0HTR2S9UKtGXIIBmRG9W5HwE5azxyUg/TpqKLkt04hbUMouQfPDriZZQfMfzoEihC9fkncGqArhuAAAAABJRU5ErkJggg==",
		events: [{
			name: "click",
			value: Bookmark_User_Functions.Deactivate_Bookmark_Edit.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "loading...",
		id: "bmks"
	}]
}
