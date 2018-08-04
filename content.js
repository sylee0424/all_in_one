function messageFromPage(event) {
	if (event.data.type=="exportFromExtension") {
		if (chrome) {
			(new Promise(resolve=>extension.storage.local.get("bmks",resolve))).then(v=>{
				window.postMessage({
					type:"importFromExtension",
					bmk:JSON.parse(unescape(v.bmks))
				},"*");
			},()=>undefined);
		}
		else {
			extension.storage.local.get("bmks").then(v=>{
				window.postMessage({
					type:"importFromExtension",
					bmk:JSON.parse(unescape(v.bmks))
				},"*");
			},()=>undefined);
		}
	}
	else if (event.data.type=="exportToExtension") {
		extension.storage.local.set({"bmks":escape(JSON.stringify(event.data.bmk))});
		window.postMessage({
			type:"importToExtension"
		},"*");
	}
}

function addscript(scriptlist,removenode) {
	var __scr=document.createElement("script");
	__scr.setAttribute("type","text/javascript");
	document.head.appendChild(__scr);
	__scr.addEventListener("load",function () {
		if (scriptlist.length) {
			addscript(scriptlist,removenode);
		}
		if (removenode) {
			if (this&&this.parentNode) {
				this.parentNode.removeChild(this);
			}
		}
	});
	__scr.setAttribute("src",extension.runtime.getURL(scriptlist.shift()));
}

var extension=(!!chrome)?chrome:browser;

addscript(["test.user.js",
	"test2.user.js",
	"pageobject.js",
	"pagescript.js"
	],true);

window.addEventListener("message",messageFromPage);
