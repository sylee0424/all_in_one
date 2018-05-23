var w=window;
var x=w.parent;
var p=x.postMessage;
var u="https://psydel.000webhostapp.com/";

w.addEventListener("message",function (e) {
	var f=e.data;
	var g=f.type.match;
	if (g("getbmk")) {
		p({
			"bmk":glb(),
			"type":"getbmk"
		},f.href);
	}
	else if (g("setbmk")) {
		slb(f.bmk);
		p({
			"result":"complete",
			"type":"setbmk"
		},f.href);
	}
	else if (g("import")) {
		var req = new XMLHttpRequest();
		req.open('GET',u,true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				var r=JSON.parse(escape(req.responseText));
				slb(r);
				p({
					"bmk":r,
					"type":"getbmk"
				},f.href);
			}
		};
		req.send(null);
	}
	else if (g("export")) {
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
	else if (g("change")) {
		var b=glb();
		if (f.a=="add") {
			
		}
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