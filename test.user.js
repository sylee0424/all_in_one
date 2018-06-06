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
	else if (e.data.type=="imported") {
		
	}
	else if (e.data.type=="exported") {
		
	}
	else if (e.data.type=="changed") {
		
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
		b:"data:text/javascript;base64,ZnVuY3Rpb24gbWVyZ2VibWsoZSxhKXt2YXIgdD1bXS5jb25jYXQoZS5kYXRhLm9yZGVyLGEuZGF0YS5vcmRlcik7Zm9yKHZhciBsIGluIGEudmFsdWUpZS52YWx1ZVtsXT8oZS52YWx1ZVtsXS50eXBlPSJsaW5rIik/KGEudmFsdWVbbF0udHlwZT0ibGluayIpPyhhLnZhbHVlW2xdLnBhdGg9ZS52YWx1ZVtsXS5wYXRoLGUudmFsdWVbbF09YS52YWx1ZVtsXSk6KGEudmFsdWVbbF0udHlwZT0iZm9sZGVyIikmJihhLnZhbHVlW2xdLnBhdGg9ZS52YWx1ZVtsXS5wYXRoLGUudmFsdWVbInRlbXBfbGlua18iK2wrIiMiKyhuZXcgRGF0ZSkuZ2V0VGltZSgpXT1lLnZhbHVlW2xdLGUudmFsdWVbbF09YS52YWx1ZVtsXSk6KGUudmFsdWVbbF0udHlwZT0iZm9sZGVyIikmJigoYS52YWx1ZVtsXS50eXBlPSJsaW5rIik/KGEudmFsdWVbbF0ucGF0aD1lLnZhbHVlW2xdLnBhdGgsZS52YWx1ZVsidGVtcF9saW5rXyIrbCsiIyIrKG5ldyBEYXRlKS5nZXRUaW1lKCldPWEudmFsdWVbbF0pOihhLnZhbHVlW2xdLnR5cGU9ImZvbGRlciIpJiZtZXJnZWJtayhlLnZhbHVlW2xdLGEudmFsdWVbbF0pKTooZS52YWx1ZVtsXT1hLnZhbHVlW2xdLGUudmFsdWVbbF0ucGF0aD1lLnBhdGgrKGUucGF0aD8iLyI6IiIpK2UuZGF0YS5uYW1lKTtlLmRhdGEub3JkZXI9dCxlLmRhdGEubW9kaWZpZWQ9KG5ldyBEYXRlKS5nZXRUaW1lKCl9ZnVuY3Rpb24gZ2V0bG9jYWxibWsoKXtmb3IodmFyIGU9TnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCJibWtsZW5ndGgiKSksYT0iIix0PTA7dDxlO3QrKylhKz1sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgiYm1rYm9keSIrdCk7cmV0dXJuIGU/SlNPTi5wYXJzZShhKTp7fX1mdW5jdGlvbiBzZXRsb2NhbGJtayhlKXtmb3IodmFyIGE9SlNPTi5zdHJpbmdpZnkoZSksdD0wO2E7KWxvY2FsU3RvcmFnZS5zZXRJdGVtKCJibWtib2R5Iit0LGEuc3Vic3RyKDAsNGUzKSksYT1hLnN1YnN0cig0ZTMpLHQrKztsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgiYm1rbGVuZ3RoIix0KX13aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsZnVuY3Rpb24oZSl7aWYoZS5kYXRhLnR5cGUubWF0Y2goImdldGJtayIpKXdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2JtazpnZXRsb2NhbGJtaygpLHR5cGU6ImdldHRlZCJ9LGUub3JpZ2luKTtlbHNlIGlmKGUuZGF0YS50eXBlLm1hdGNoKCJzZXRibWsiKSlzZXRsb2NhbGJtayhlLmRhdGEuYm1rKSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtyZXN1bHQ6ImNvbXBsZXRlIix0eXBlOiJzZXR0ZWQifSxlLm9yaWdpbik7ZWxzZSBpZihlLmRhdGEudHlwZS5tYXRjaCgiaW1wb3J0IikpeyhhPW5ldyBYTUxIdHRwUmVxdWVzdCkub3BlbigiR0VUIiwiaHR0cHM6Ly9wc3lkZWwuMDAwd2ViaG9zdGFwcC5jb20vIiwhMCksYS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24odCl7ND09YS5yZWFkeVN0YXRlJiYyMDA9PWEuc3RhdHVzJiYoc2V0bG9jYWxibWsoSlNPTi5wYXJzZShhLnJlc3BvbnNlVGV4dCkpLHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2JtazpKU09OLnBhcnNlKGEucmVzcG9uc2VUZXh0KSx0eXBlOiJpbXBvcnRlZCJ9LGUub3JpZ2luKSl9LGEuc2VuZChudWxsKX1lbHNlIGlmKGUuZGF0YS50eXBlLm1hdGNoKCJleHBvcnQiKSl7dmFyIGE7KGE9bmV3IFhNTEh0dHBSZXF1ZXN0KS5vcGVuKCJQT1NUIiwiaHR0cHM6Ly9wc3lkZWwuMDAwd2ViaG9zdGFwcC5jb20vIiwhMCksYS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24odCl7ND09YS5yZWFkeVN0YXRlJiYyMDA9PWEuc3RhdHVzJiYoYWxlcnQoYS5yZXNwb25zZVRleHQpLHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe3Jlc3VsdDoiY29tcGxldGUiLHR5cGU6ImV4cG9ydGVkIn0sZS5vcmlnaW4pKX07dmFyIHQ9bmV3IEZvcm1EYXRhO3QuYXBwZW5kKCJpZCIsSlNPTi5zdHJpbmdpZnkoZ2V0bG9jYWxibWsoKSkpLGEuc2VuZCh0KX1lbHNlIGlmKGUuZGF0YS50eXBlLm1hdGNoKCJjaGFuZ2UiKSl7dmFyIGw9Z2V0bG9jYWxibWsoKSxvPWwsbj1lLmRhdGEuaW5mbztpZihuLmxvYy5zcGxpdCgiLyIpLmZvckVhY2goZnVuY3Rpb24oZSl7bz1vLnZhbHVlW2VdfSksbi5hY3QubWF0Y2goImFkZCIpKW4uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBhPXtkYXRhOnt9fTthLmRhdGEuY3JlYXRlZD0obmV3IERhdGUpLmdldFRpbWUoKSxhLmRhdGEubW9kaWZpZWQ9KG5ldyBEYXRlKS5nZXRUaW1lKCksYS5kYXRhLm5hbWU9ZS5uYW1lLGEucGF0aD1uLmxvYyxhLnR5cGU9ImxpbmsiLGEudmFsdWU9ZS51cmwsby52YWx1ZVtlLm5hbWVdPWEsby5kYXRhLm9yZGVyLnB1c2goZS5uYW1lKX0pO2Vsc2UgaWYobi5hY3QubWF0Y2goIm5ldyIpKW4uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBhPXtkYXRhOnt9fTthLmRhdGEuY3JlYXRlZD0obmV3IERhdGUpLmdldFRpbWUoKSxhLmRhdGEubW9kaWZpZWQ9KG5ldyBEYXRlKS5nZXRUaW1lKCksYS5kYXRhLm5hbWU9ZS5uYW1lLGEuZGF0YS5vcmRlcj1bXSxhLnBhdGg9bi5sb2MsYS50eXBlPSJmb2xkZXIiLGEudmFsdWU9e30sby52YWx1ZVtlLm5hbWVdPWEsby5kYXRhLm9yZGVyLnB1c2goZS5uYW1lKX0pO2Vsc2UgaWYobi5hY3QubWF0Y2goInJlbW92ZSIpKW4uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe289bCxlLmxvYy5zcGxpdCgiLyIpLmZvckVhY2goZnVuY3Rpb24oZSl7bz1vLnZhbHVlW2VdfSksZGVsZXRlIG8udmFsdWVbZS5uYW1lXSxvLmRhdGEubW9kaWZpZWQ9KG5ldyBEYXRlKS5nZXRUaW1lKCksby5kYXRhLm9yZGVyLnNwbGljZShvLmRhdGEub3JkZXIuaW5kZXhPZihlLm5hbWUpLDEpfSk7ZWxzZSBpZihuLmFjdC5tYXRjaCgiY3V0Iikpbi5kYXRhLmZvckVhY2goZnVuY3Rpb24oZSl7bz1sLGUubG9jLnNwbGl0KCIvIikuZm9yRWFjaChmdW5jdGlvbihlKXtvPW8udmFsdWVbZV19KSxkLnB1c2goby52YWx1ZVtlLm5hbWVdKSxkZWxldGUgby52YWx1ZVtlLm5hbWVdLG8uZGF0YS5tb2RpZmllZD0obmV3IERhdGUpLmdldFRpbWUoKSxvLmRhdGEub3JkZXIuc3BsaWNlKG8uZGF0YS5vcmRlci5pbmRleE9mKGUubmFtZSksMSl9KSxsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgiY3JvcGVkIixKU09OLlN0cmluZ2lmeShkKSk7ZWxzZSBpZihuLmFjdC5tYXRjaCgiY29weSIpKXt2YXIgZD1KU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCJjcm9wZWQiKSl8fFtdO24uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe289bCxlLmxvYy5zcGxpdCgiLyIpLmZvckVhY2goZnVuY3Rpb24oZSl7bz1vLnZhbHVlW2VdfSksZC5wdXNoKG8udmFsdWVbZS5uYW1lXSl9KSxsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgiY3JvcGVkIixKU09OLlN0cmluZ2lmeShkKSl9ZWxzZSBpZihuLmFjdC5tYXRjaCgicGFzdGUiKSl7KGQ9SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgiY3JvcGVkIikpfHxbXSkuZm9yRWFjaChmdW5jdGlvbihlKXtpZihvLnZhbHVlW2UuZGF0YS5uYW1lXSl7aWYoImxpbmsiPT1vLnZhbHVlW2UuZGF0YS5uYW1lXS50eXBlKXtpZigibGluayI9PWUudHlwZSllLnBhdGg9bi5sb2Msby52YWx1ZVtlLmRhdGEubmFtZV09ZTtlbHNlIGlmKCJmb2xkZXIiPT1lLnR5cGUpe3ZhciBhPSJ0ZW1wX2xpbmtfIitlLmRhdGEubmFtZSsiIyIrKG5ldyBEYXRlKS5nZXRUaW1lKCk7ZS5wYXRoPW4ubG9jLG8udmFsdWVbYV09by52YWx1ZVtlLmRhdGEubmFtZV0sby52YWx1ZVtlLmRhdGEubmFtZV09ZSxvLmRhdGEub3JkZXIucHVzaChhKX19ZWxzZSBpZigiZm9sZGVyIj09by52YWx1ZVtlLmRhdGEubmFtZV0udHlwZSlpZigibGluayI9PWUudHlwZSl7YT0idGVtcF9saW5rXyIrZS5kYXRhLm5hbWUrIiMiKyhuZXcgRGF0ZSkuZ2V0VGltZSgpO2UucGF0aD1uLmxvYyxvLnZhbHVlW2FdPWUsby5kYXRhLm9yZGVyLnB1c2goYSl9ZWxzZSJmb2xkZXIiPT1lLnR5cGUmJihlLnBhdGg9bi5sb2MsbWVyZ2VibWsoby52YWx1ZVtlLmRhdGEubmFtZV0sZSkpfWVsc2Ugby52YWx1ZVtlLmRhdGEubmFtZV09ZSxvLnZhbHVlW2UuZGF0YS5uYW1lXS5kYXRhLm1vZGlmaWVkPShuZXcgRGF0ZSkuZ2V0VGltZSgpLG8udmFsdWVbZS5kYXRhLm5hbWVdLnBhdGg9bi5sb2N9KX1lbHNlIGlmKG4uYWN0Lm1hdGNoKCJjYW5jZWwiKSluLmRhdGEuZm9yRWFjaChmdW5jdGlvbihlKXsoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgiY3JvcGVkIikpfHxbXSkuZm9yRWFjaChmdW5jdGlvbihlKXtvPWwsZS5sb2Muc3BsaXQoIi8iKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe289by52YWx1ZVtlXX0pLG8udmFsdWVbZS5kYXRhLm5hbWVdPWV9KSxsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgiY3JvcGVkIil9KTtlbHNlIGlmKG4uYWN0Lm1hdGNoKCJzb3J0Iikpe3ZhciByPVtdLGM9W107T2JqZWN0LmtleXMoby52YWx1ZSkuZm9yRWFjaChmdW5jdGlvbihlKXsiZm9sZGVyIj09by52YWx1ZVtlXS50eXBlP3IucHVzaChlKTpjLnB1c2goZSl9KSxyLnNvcnQoKSxjLnNvcnQoKSxvLmRhdGEub3JkZXI9W10uY29uY2F0KHIsYyl9ZWxzZSBuLmFjdC5tYXRjaCgiY2hhbmdlIikmJm4uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe28udmFsdWVbZS5uYW1lXXx8KG8udmFsdWVbZS5uYW1lXT1vLnZhbHVlW2UucG5hbWVdLG8uZGF0YS5vcmRlci5zcGxpY2Uoby5kYXRhLm9yZGVyLmluZGV4T2YoZS5wbmFtZSksMSxlLm5hbWUpLG8udmFsdWVbZS5uYW1lXS5kYXRhLm1vZGlmaWVkPShuZXcgRGF0ZSkuZ2V0VGltZSgpKX0pO3NldGxvY2FsYm1rKGwpLGNvbnNvbGUubG9nKCJzZXR0ZWQiKSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtibWs6bCx0eXBlOiJjaGFuZ2VkIn0sZS5vcmlnaW4pfX0pLGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoInNjcmlwdCIpWzBdKTs="
	},"*");
});
a.src="http://psydel.000webhostapp.com/iframe/";

window.extension = {
	
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
					classname:["__checkbox"]
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
			
		}
		else {
			
		}
	},
	
	add: function () {
		document.getElementById("bmkaction").contentWindow.postMessage({
			type:"change",
			info:{
				act:"add",
				loc:document.getElementById("dir"),
				data:[{name:prompt("bmk name",document.title),url:prompt("bmk url",location.href)}]
			}
		},"*");
	}
	
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
			value: extension.actedt
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
			value: etfs.toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "this tab",
		events: [{
			name: "click",
			value: function (event) {
				etfs.toggle.f.call(document.getElementById("tab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		id: "bactab",
		events: [{
			name: "click",
			value: etfs.toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "background tab",
		events: [{
			name: "click",
			value: function (event) {
				etfs.toggle.f.call(document.getElementById("bactab"),event);
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
			value: extension.editdact
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "addall",
		image: dataurls.addall,
		classname: ["__buttons","__inedit","__bmktool","__hided"],
		events: [{
			name: "click",
			value: etfs.addall.f
		}]
	},
	{
		tag: "div",
		name: "openall",
		image: dataurls.openall,
		classname: ["__buttons","__bmktool","__hided"],
		events: [{
			name: "click",
			value: etfs.openall.f
		}]
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
}