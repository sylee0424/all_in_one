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
		this.contentWindow.postMessage({a:true,b:""},"*");
	});
	a.src="http://psydel.000webhostapp.com/iframe/";
}