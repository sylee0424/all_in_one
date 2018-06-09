// ==UserScript==
// @name            Sample extension
// @author          psydel
// @description     This is a sample extension.
// @include         *
// @exclude         http*://psydel.000webhostapp.com/iframe/
// ==/UserScript==

!function(t,e){"use strict";function n(){this.dispatchEvent(new CustomEvent("long-press",{bubbles:!0,cancelable:!0})),clearTimeout(o),console&&console.log&&console.log("long-press fired on "+this.outerHTML)}var o=null,u="ontouchstart"in t||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0,s=u?"touchstart":"mousedown",i=u?"touchcancel":"mouseout",a=u?"touchend":"mouseup",c=u?"touchmove":"mousemove";"initCustomEvent"in e.createEvent("CustomEvent")&&(t.CustomEvent=function(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var o=e.createEvent("CustomEvent");return o.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),o},t.CustomEvent.prototype=t.Event.prototype),e.addEventListener(s,function(t){var e=t.target,u=parseInt(e.getAttribute("data-long-press-delay")||"1500",10);o=setTimeout(n.bind(e),u)}),e.addEventListener(a,function(t){clearTimeout(o)}),e.addEventListener(i,function(t){clearTimeout(o)}),e.addEventListener(c,function(t){clearTimeout(o)})}(this,document);

window.addEventListener("message",function (e) {
	console.log(e);
	if (e.data.type=="getted") {
		
	}
	else if (e.data.type=="setted") {
		
	}
	else if (e.data.type=="importd") {
		
	}
	else if (e.data.type=="exportd") {
		
	}
	else if (e.data.type=="changd") {
		
	}
});

var a=document.createElement("style");
document.head.appendChild(a);
a.sheet.insertRule("");

a= document.createElement("iframe");
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
					classname:["__checkbox"],
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
				}]
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
			if (this.classList.contains("__link")) {
				
			}
			else {
				
			}
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
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>(v.dataset))
			}
		},"*");
	},
	
	copy: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"copy",
				loc:document.getElementById("dir"),
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>(v.dataset))
			}
		},"*");
	},
	
	remove: function () {
		extension.bmkaction({
			type:"change",
			info:{
				act:"remove",
				loc:document.getElementById("dir"),
				data:Array.prototype.map.call(document.querySelectorAll(".__checkbox.__checked"),(v=>(v.dataset))
			}
		},"*");
	},
	
	goup: function () {
		
	},
	
	importbmk: function () {
		
	},
	
	exportbmk: function () {
		
	},
	
	sort: function () {
		
	},
	
	edtact: function () {
		
	},
	
	edtdact: function () {
		
	},
	
	lclick: function (e) {
		if (extension.inedit) {
			
		}
		else {
			
		}
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
				etfs.iptnds.f(item.childs[i]);
			}
		}
		if (item.name&&!item.image) {
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
	},
	
	intfc:[{
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
		tag: "br"
	},
	{
		tag: "div",
		id: "tab",
		events: [{
			name: "click",
			value: extension.toggle
		}],
		classname:["__input","__extension"]
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
	}]
};

extension.iptnds({
	tag:"div",
	id:"bmkmain",
	classname:["__hided"];
});
extension.intfc.map(v=>{v.target=document.getElementById("bmkmain"); return v;}).forEach(extension.iptnds);
