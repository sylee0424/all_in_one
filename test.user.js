// ==UserScript==
// @name            Sample extension
// @author          psydel
// @description     This is a sample extension.
// @include         *
// @exclude         http*://psydel.000webhostapp.com/iframe/
// ==/UserScript==

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
	
	show: function (path,inedit) {
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
				childs:[],
				classname:["__extension","__bmk"],
				events:[],
				data:[],
			};
			extension.iptnds(b);
		});
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
	}
}