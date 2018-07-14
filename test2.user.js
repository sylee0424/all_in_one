// ==UserScript==
// @name            Sample extension 2
// @author          psydel
// @description     This is a sample extension.
// @include         https://hitomi.la*
// ==/UserScript==

function hitomi() {
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
			divs[i].addEventListener("click", hitomi_link);
			var inp = document.createElement("input");
			var inq = document.createElement("label");
			var tx = document.createTextNode("N");
			inp.type = "checkbox";
			inq.style.display = "inline";
			inp.id = "input-" + i;
			inp.addEventListener("click", (e)=>e.preventDefault());
			inp.style["vertical-align"] = "middle";
			inq.addEventListener("click", (e)=>(this.checked=!this.checked));
			if (divs[i].parentNode.parentNode.parentNode.getAttribute("class") != "page-container" &&
				divs[i].parentNode.tagName != "DIV" && divs[i].href != "/") {
				if (k.match("galleries")) {
					var j = document.createElement("span");
					divs[i].insertBefore(j, divs[i].firstChild);
					j.innerHTML = "(R) ";
					j.dataset.url = k;
					j.dataset.type = "reader";
					j.dataset.index = i;
					j.addEventListener("click", hitomi_link);
				}
				if (k.match("-all-")) {
					var j = document.createElement("span");
					divs[i].insertBefore(j, divs[i].firstChild);
					j.innerHTML = "(K) ";
					j.dataset.url = k;
					j.dataset.type = "korean";
					j.dataset.index = i;
					j.addEventListener("click", hitomi_link);
				}
			} else {
				var j = document.createElement("span");
				while (divs[i].firstChild) {
					j.appendChild(divs[i].firstChild);
				}
				j.dataset.url = k;
				j.dataset.type = "normal";
				j.dataset.index = i;
				j.addEventListener("click", hitomi_link);
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

hitomi();

var div = document.createElement("div");
div.id = "hitomi_download";
div.className="__extension"
div.addEventListener("click",hitomi_download);
div.appendChild(document.createTextNode("download"));
document.body.appendChild(div);

document.querySelector(".gallery\-content").addEventListener("change",console.log);
