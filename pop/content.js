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

function getChromeVersion() {
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
    if (pieces == null || pieces.length != 5) {
        return undefined;
    }
    pieces = pieces.map(piece => parseInt(piece, 10));
    return {
        major: pieces[1],
        minor: pieces[2],
        build: pieces[3],
        patch: pieces[4]
    };
}

if (getChromeVersion().major>=55) {
	window.addEventListener("load", function () {
		addscript(["pop/dataurls.js","pop/pageobject.js","pop/pagescript.js","pop/modal/modal.js"],true);
	});
}
else {
	window.addEventListener("load", function () {
		addscript(["pop/dataurls.js","pop/pageobject_alt.js","pop/pagescript.js","pop/modal/modal.js"],true);
	});
}

