// ==UserScript==
// @name            Sample extension 2
// @author          psydel
// @description     This is a sample extension.
// @include         https://hitomi.la*
// ==/UserScript==

function hitomi() {
	var d = 0;
	var list = document.querySelectorAll("a[href]");
	var exclude =  Array.prototype.slice.call(document.querySelectorAll(".page-container>*>*>a,div>a,a[href='/']"));
	list.forEach(function (v,i,arr) {
		var k = v.href;
		v.dataset.url = k;
		v.dataset.type = "normal";
		v.dataset.index = i;
		v.addEventListener("click", hitomi_link);
		var inp = document.createElement("input");
		var inq = document.createElement("label");
		var tx = document.createTextNode("N");
		inp.type = "checkbox";
		inq.style.display = "inline";
		inp.id = "input-" + i;
		inq.addEventListener("click", (e)=>{e.stopPropagation(); return false;});
		inp.style["vertical-align"] = "middle";
		inp.addEventListener("click", (e)=>(this.checked=!this.checked));
		if (k.match("galleries")) {
			var j = document.createElement("span");
			v.insertBefore(j, v.firstChild);
			j.appendChild(document.createTextNode("(R) "));
			j.dataset.url = k;
			j.dataset.type = "reader";
			j.dataset.index = i;
			j.addEventListener("click", hitomi_link);
		}
		if (k.match("-all-")) {
			var j = document.createElement("span");
			v.insertBefore(j, v.firstChild);
			j.appendChild(document.createTextNode("(K) "));
			j.dataset.url = k;
			j.dataset.type = "korean";
			j.dataset.index = i;
			j.addEventListener("click", hitomi_link);
		}
		if (exclude.indexOf(v)!=-1) {
			var j = document.createElement("span");
			while (v.firstChild) {
				j.appendChild(v.firstChild);
			}
			j.dataset.url = k;
			j.dataset.type = "normal";
			j.dataset.index = i;
			j.addEventListener("click", hitomi_link);
			v.parentNode.insertBefore(j, v);
			v.parentNode.removeChild(v);
			v = j;
		}
		inq.appendChild(tx);
		inq.appendChild(inp);
		v.insertBefore(inq, v.firstChild);
		v.removeAttribute("href");
	});
}

function hitomi_link(event) {
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
}

function hitomi_image(imagelist) {
	var __scr=document.createElement("img");
	__scr.classList.add("__loadedimg");
	document.body.appendChild(__scr);
	__scr.addEventListener("load",function () {
		if (imagelist.length) {
			hitomi_image(imagelist);
		}
	});
	__scr.addEventListener("error",function () {
		console.log(""+this.src);
		this.src=this.src.match(/([^\#]*)\#?/)[1] + "#"+new Date().getTime();
	});
	__scr.setAttribute("src",imagelist.shift());
}

function hitomi_download() {
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
	var target = images.slice(num2,(num1==-1?undefined:num1));
	if (!confirm("download?")) {
		document.getElementsByTagName("head")[0].innerHTML = "";
		document.body.innerHTML = "";
		var arr=[];
		target.forEach(function (val) {
			arr.push("https:" + val.path);
		});
		hitomi_image(arr);
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
			hrf.href = "https:" + val.path;
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
}

if (location.href.match(/^https?\:\/\/hitomi\.la/i)) {

var div = document.createElement("div");
div.id = "hitomi_download";
div.className="__extension";
div.addEventListener("click",hitomi_download);
div.appendChild(document.createTextNode("download"));
document.body.appendChild(div);

var o=setInterval(function () {
    if (document.querySelectorAll("div.gallery-content img").length!=1) {
        hitomi();
        clearInterval(o)
    }
},50);

}
