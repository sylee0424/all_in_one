// ==UserScript==
// @name            Sample extension
// @author          psydel
// @description     This is a sample extension.
// @include         *
// @exclude         http*://psydel.000webhostapp.com/iframe/
// ==/UserScript==

!function(t,e){
	"use strict";
	function n(){
		this.dispatchEvent(
			new CustomEvent("long-press",{
				bubbles:!0,
				cancelable:!0
			})
		),
		clearTimeout(o);
		if (console&&console.log) {
			console.log("long-press fired on "+this.outerHTML);
		}
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
		var u=(e.getAttribute("data-long-press-delay")||"1500")*1;
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

if (!window.dataurls) {
	dataurls={};
}

var a=document.createElement("style");
document.head.appendChild(a);
a.innerText=".__link {color:#aa8888;}\n.__folder {color:#88aaaa;}\n.__checked {background-color:#2f2f2f;}\n.__extension {word-wrap:break-word;line-height:10px;vertical-align: middle;box-sizing:border-box;z-index:11;border:1px solid #000000;background-color:#ffffff;font-size:10px;}\n.__disabled {filter:invert(100%); border-color:#ffffff;}\n.__buttons.__extension {width:20px; height:20px; display:inline-block; font-size:10px;}\n.__checkbox {display:inline-block; width:10px; height:10px; border:1px solid #000000;}\n.__hided {display:none !important; }\n.__invisibled {visibility:hidden; !important;}\n.__innerimage {width:100%; height:100%;}\nlabel.__extension {width:70px; height:20px; display:inline-block;}\n#dir {height:20px;}\n#pastebmk {position:absolute; bottom:0px; left:0px; width:100px; height:25px;}\n#bmkmain {text-align:left; position:fixed; top:20px; left:20px; width:320px; height:500px; z-index:9999; overflow:auto; max-width:calc(100% - 40px); max-height:calc(100% - 40px);}\n#bmks.__copyactive {height:calc(100% - 130px);}\n#bmks {height:calc(100% - 100px); overflow:auto; font-size:15px; line-height:20px;}\nlabel {display:inline-block; border:1px solid #000000; margin-bottom:10px; min-width:90px;}\n#setover {z-index:12;}\n#actionbar {position:fixed; bottom:0px; left:0px; width:100%; height:40px;}\n#sidebarpad {z-index:0; position:absolute; bottom:0px; left:0px; width:38px; height:40px;}";

a=document.createElement("iframe");
a.id="bmkaction";
a.style.display="none";
document.body.appendChild(a);
a.addEventListener("load",function () {
	this.contentWindow.postMessage({
		a:true,
		b:'data:text/javascript,function mergebmk(e,a){var t=[].concat(e.data.order,a.data.order);for(var n in a.value)e.value[n]?(e.value[n].type="link")?(a.value[n].type="link")?(a.value[n].path=e.value[n].path,e.value[n]=a.value[n]):(a.value[n].type="folder")&&(a.value[n].path=e.value[n].path,e.value["temp_link_"+n+"@"+(new Date).getTime()]=e.value[n],e.value[n]=a.value[n]):(e.value[n].type="folder")&&((a.value[n].type="link")?(a.value[n].path=e.value[n].path,e.value["temp_link_"+n+"@"+(new Date).getTime()]=a.value[n]):(a.value[n].type="folder")&&mergebmk(e.value[n],a.value[n])):(e.value[n]=a.value[n],e.value[n].path=e.path+(e.path?"/":"")+e.data.name);e.data.order=t,e.data.modified=(new Date).getTime()}function getlocalbmk(){for(var e=Number(localStorage.getItem("bmklength")),a="",t=0;t<e;t++)a+=localStorage.getItem("bmkbody"+t);return e?JSON.parse(a):{}}function setlocalbmk(e){for(var a=JSON.stringify(e),t=0;a;)localStorage.setItem("bmkbody"+t,a.substr(0,4e3)),a=a.substr(4e3),t++;localStorage.setItem("bmklength",t)}window.addEventListener("message",function(e){if(e.data.type.match("getbmk"))window.parent.postMessage({bmk:getlocalbmk(),type:"getted"},e.origin);else if(e.data.type.match("setbmk"))setlocalbmk(e.data.bmk),window.parent.postMessage({result:"complete",type:"setted"},e.origin);else if(e.data.type.match("import")){(a=new XMLHttpRequest).open("GET","https://psydel.000webhostapp.com/",!0),a.onreadystatechange=function(t){4==a.readyState&&200==a.status&&(setlocalbmk(JSON.parse(a.responseText)),window.parent.postMessage({bmk:JSON.parse(a.responseText),type:"importd"},e.origin))},a.send(null)}else if(e.data.type.match("export")){var a;(a=new XMLHttpRequest).open("POST","https://psydel.000webhostapp.com/",!0),a.onreadystatechange=function(t){4==a.readyState&&200==a.status&&(alert(a.responseText),window.parent.postMessage({result:"complete",type:"exportd"},e.origin))};var t=new FormData;t.append("id",JSON.stringify(getlocalbmk())),a.send(t)}else if(e.data.type.match("change")){var n=getlocalbmk(),l=n,o=e.data.info;if(o.loc.split("/").forEach(function(e){l=l.value[e]}),o.act.match("add"))o.data.forEach(function(e){var a={};if(a.data={},a.data.created=(new Date).getTime(),a.data.modified=(new Date).getTime(),a.data.name=e.name,a.path=o.loc,a.type="link",a.value=e.url,e.name){if(l.value[e.name])if(confirm(e.name+" is already exist.\\noverwrite it?"));else for(;l.value[e.name=prompt("new name",e.name)];)if(!e.name)return;l.value[e.name]=a,l.data.order.push(e.name)}});else if(o.act.match("new"))o.data.forEach(function(e){var a={data:{}};a.data.created=(new Date).getTime(),a.data.modified=(new Date).getTime(),a.data.name=e.name,a.data.order=[],a.path=o.loc,a.type="folder",a.value={},l.value[e.name]?alert(e.name+" is already exist."):(l.value[e.name]=a,l.data.order.push(e.name))});else if(o.act.match("remove"))o.data.forEach(function(e){l=n,e.loc.split("/").forEach(function(e){l=l.value[e]}),delete l.value[e.name],l.data.modified=(new Date).getTime(),l.data.order.splice(l.data.order.indexOf(e.name),1)});else if(o.act.match("cut"))o.data.forEach(function(e){l=n,e.loc.split("/").forEach(function(e){l=l.value[e]}),r.push(l.value[e.name]),delete l.value[e.name],l.data.modified=(new Date).getTime(),l.data.order.splice(l.data.order.indexOf(e.name),1)}),localStorage.setItem("croped",JSON.Stringify(r));else if(o.act.match("copy")){var r=JSON.parse(localStorage.getItem("croped"))||[];o.data.forEach(function(e){l=n,e.loc.split("/").forEach(function(e){l=l.value[e]}),r.push(l.value[e.name])}),localStorage.setItem("croped",JSON.Stringify(r))}else if(o.act.match("paste")){(r=JSON.parse(localStorage.getItem("croped"))||[]).forEach(function(e){if(l.value[e.data.name]){if("link"==l.value[e.data.name].type){if("link"==e.type)e.path=o.loc,l.value[e.data.name]=e;else if("folder"==e.type){var a="temp_link_"+e.data.name+"@"+(new Date).getTime();e.path=o.loc,l.value[a]=l.value[e.data.name],l.value[e.data.name]=e,l.data.order.push(a)}}else if("folder"==l.value[e.data.name].type)if("link"==e.type){a="temp_link_"+e.data.name+"@"+(new Date).getTime();e.path=o.loc,l.value[a]=e,l.data.order.push(a)}else"folder"==e.type&&(e.path=o.loc,mergebmk(l.value[e.data.name],e))}else l.value[e.data.name]=e,l.value[e.data.name].data.modified=(new Date).getTime(),l.value[e.data.name].path=o.loc})}else if(o.act.match("cancel"))o.data.forEach(function(e){(JSON.parse(localStorage.getItem("croped"))||[]).forEach(function(e){l=n,e.loc.split("/").forEach(function(e){l=l.value[e]}),l.value[e.data.name]=e}),localStorage.removeItem("croped")});else if(o.act.match("sort")){var d=[],m=[];Object.keys(l.value).forEach(function(e){"folder"==l.value[e].type?d.push(e):m.push(e)}),d.sort(),m.sort(),l.data.order=[].concat(d,m)}else o.act.match("change")&&o.data.forEach(function(e){if(e.name){if(l.value[e.name]&&!confirm(e.name+" is already exist.\\noverwrite it?"))for(;l.value[e.name=prompt("new name",e.name)];)if(!e.name)return;l.value[e.name]=l.value[e.pname],l.data.order.splice(l.data.order.indexOf(e.pname),1,e.name),l.value[e.name].data.modified=(new Date).getTime()}});setlocalbmk(n),console.log("setted"),window.parent.postMessage({bmk:n,type:"changd"},e.origin)}}),document.head.removeChild(document.getElementsByTagName("script")[0]);'
	},"*");
});
a.src="https://psydel.000webhostapp.com/iframe/";

window.extension = {
	
	bmkaction:document.getElementById("bmkaction").contentWindow.postMessage,
	
	show: function (path) {
		var bmkptr=extension.bmk;
		path.split("/").forEach(function (v) {
			bmkptr=bmkptr.value[v];
		});
		bmkptr.data.order.forEach(function (v) {
			var a=bmkptr.value[v];
			var b={
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
				}]
			};
			extension.iptnds(b);
		});
	},
	
	click: function (e) {
		if (extension.inedit) {
			
		}
		else {
			if (this.classList.contains("__link")) {
				window.open(this.dataset.val,"__blink")
			}
			else {
				document.getElementById("go_up").classList.remove("__disabled");
				document.getElementById("dir").dataset.loc+="/"+this.id;
				document.getElementById("dir").innerText+="/"+this.id;
				extension.show(document.getElementById("dir"));
			}
		}
	},
	
	lclick: function (e) {
		if (extension.inedit) {
			
		}
		else {
			
		}
	},
	
	add: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"add",
				loc:document.getElementById("dir"),
				data:[{name:prompt("bmk name",document.title),url:prompt("bmk url",location.href)}]
			}
		},"*");
	},
	
	newfld: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"new",
				loc:document.getElementById("dir"),
				data:[{name:prompt("bmk name",document.title)}]
			}
		},"*");
	},
	
	move: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"cut",
				loc:document.getElementById("dir"),
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>v.dataset))
			}
		},"*");
	},
	
	copy: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"copy",
				loc:document.getElementById("dir"),
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>v.dataset))
			}
		},"*");
	},
	
	remove: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"remove",
				loc:document.getElementById("dir"),
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>v.dataset))
			}
		},"*");
	},
	
	goup: function () {
		document.getElementById("dir");
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
			if (option.url&&bmk.value[a].type=="link"&&bmk.value[a].value.match(new RegExp(option.url.val,"i"))) {
				arr.push(bmk.value[a]);
			}
			else if (option.name&&a.match(new RegExp(option.name.val,"i"))) {
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
				loc:document.getElementById("dir")
			}
		},"*");
	},
	
	paste: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"paste",
				loc:document.getElementById("dir")
			}
		},"*");
	},
	
	cancel: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"cancel",
				loc:document.getElementById("dir")
			}
		},"*");
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
		if (document.getElementById("dir").split("/").length==1) {
			document.getElementById("go_up").classList.add("__disabled");
		}
		extension.inedit=false;
	},
	
	toggle: function (e) {
		this.classList.toggle("__checked");
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
			for (var i = 0; i < item.childs.length; i++) {
				item.childs[i].target = div;
				extension.iptnds(item.childs[i]);
			}
		}
		if (!item.image&&item.name) {
			div.appendChild(document.createTextNode(item.name));
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
		if (item.data) {
			for (var i = 0; i < item.data.length; i++) {
				div.dataset[item.data[i].name]= item.data[i].value;
			}
		}
		if (item.target) {
			item.target.appendChild(div);
		} else {
			document.body.appendChild(div);
		}
	}
	
};

window.extension.intfc=[{
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
			value: function () {
				var aaa = confirm("url값");
				var bbb = prompt("검색할 값","");
				var ccc={};
				if (!bbb) {
					return undefined;
				}
				var bmkptr = ev.bmk;
				document.getElementById("dir").dataset.loc.split("/").forEach(function (val) {
					bmkptr = bmkptr.value[val];
				});
				ccc[(aaa?"url":"name")]={val:bbb};
				document.getElementById("go_up").classList.remove("__disabled");
				document.getElementById("dir").dataset.loc+="/searchresult";
				document.getElementById("dir").innerText+="/searchresult";
				extension.showlist(extension.search(bmkptr,ccc));
			}
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
		image: dataurls["new"],
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
		classname:["__chackbox","__extension"]
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
		name: "remove",
		image: dataurls.remove,
		events: [{
			name: "click",
			value: extension.remove
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
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
			value: extension.importbmk
		}]
	},
	{
		tag: "div",
		name: "export",
		image: dataurls["export"],
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: extension.exportbmk
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
	}]

window.addEventListener("message",function (e) {
	console.log(e);
	if (e.data.type=="getted") {
		extension.bmk=e.data.bmk;
		show(document.getElementById("dir"));
	}
	else if (e.data.type=="setted") {
		alert("setted");
	}
	else if (e.data.type=="importd") {
		extension.bmk=e.data.bmk;
		show(document.getElementById("dir"));
	}
	else if (e.data.type=="exportd") {
		alert("exported");
	}
	else if (e.data.type=="changd") {
		extension.bmk=e.data.bmk;
		show(document.getElementById("dir"));
	}
});

extension.iptnds({
	tag:"div",
	id:"bmkmain",
	classname:["__hided"]
});

extension.intfc.map(v=>{v.target=document.getElementById("bmkmain"); return v;}).forEach(extension.iptnds);
