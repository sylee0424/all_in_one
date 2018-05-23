var w=w;
var x=w.parent;
var u="https://psydel.000webhostapp.com/";

w.addEventListener("message",function (e) {
	var f=e.data;
	if (f.type=="getbmk") {
		x.postMessage({
			"bmk":glb(),
			"type":"getbmk"
		},f.href);
	}
	else if (f.type=="setbmk") {
		slb(f.bmk);
		x.postMessage({
			"result":"complete",
			"type":"setbmk"
		},f.href);
	}
	else if (f.type=="import") {
		var req = new XMLHttpRequest();
		req.open('GET',u,true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				slb(JSON.parse(escape(req.responseText)));
			}
		};
		req.send(null);
	}
	else if (f.type=="export") {
		var req = new XMLHttpRequest();
		req.open('POST',u,true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				alert(req.responseText);
			}
		}
		var dats = new FormData();
		dats.append("id",glb());
		req.send(dats);
	}
});

function glb() {
	var bmklength=Number(localStorage.getItem("bmklength"));
	var bmkstring="";
	for (var i=0;i<bmklength;i++) {
		bmkstring+=localStorage.getItem("bmkbody"+i);
	}
	return JSON.parse(bmkstring);
}

function slb(bmk) {
	var bmkstring=JSON.stringify(bmk);
	var bmklength=0;
	while (bmkstring) {
		localStorage.setItem("bmkbody"+bmklength,bmkstring.substr(0,4000));
		bmkstring=bmkstring.substr(4000);
		bmklength++;
	}
}