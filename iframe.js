window.addEventListener("message",function (e) {
	if (e.data.type.match("getbmk")) {
		window.parent.postMessage({
			"bmk":getlocalbmk(),
			"type":"getbmk"
		},e.data.href);
	}
	else if (e.data.type.match("setbmk")) {
		setlocalbmk(e.data.bmk);
		window.parent.postMessage({
			"result":"complete",
			"type":"setbmk"
		},e.data.href);
	}
	else if (e.data.type.match("import")) {
		var req = new XMLHttpRequest();
		req.open('GET',window.parent.postMessage,true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				setlocalbmk(JSON.parse(escape(req.responseText)));
				window.parent.postMessage({
					"bmk":JSON.parse(escape(req.responseText)),
					"type":"getbmk"
				},e.data.href);
			}
		};
		req.send(null);
	}
	else if (e.data.type.match("export")) {
		var req = new XMLHttpRequest();
		req.open('POST',window.parent.postMessage,true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				alert(req.responseText);
			}
		}
		var dats = new FormData();
		dats.append("id",getlocalbmk());
		req.send(dats);
	}
	else if (e.data.type.match("change")) {
		var bmk=getlocalbmk();
		var bmkptr=bmk;
		var info=e.data.info;
		info.loc.split("/").forEach(function (v) {
			bmkptr=bmkptr.value[v];
		});
		if (info.act.match("add")) {
			info.data.forEach(function (v) {
				
			});
		}
		else if (info.act.match("new")) {
			info.data.forEach(function (v) {
				
			});
		}
		else if (info.act.match("remove")) {
			
		}
		else if (info.act.match("cut")) {
			
		}
		else if (info.act.match("copy")) {
			
		}
		else if (info.act.match("paste")) {
			
		}
		else if (info.act.match("change")) {
			
		}
	}
});

function getlocalbmk() {
	var bmklength=Number(localStorage.getItem("bmklength"));
	var bmkstring="";
	for (var i=0;i<bmklength;i++) {
		bmkstring+=localStorage.getItem("bmkbody"+i);
	}
	return JSON.parse(bmkstring);
}

function setlocalbmk(bmk) {
	var bmkstring=JSON.stringify(bmk);
	var bmklength=0;
	while (bmkstring) {
		localStorage.setItem("bmkbody"+bmklength,bmkstring.substr(0,4000));
		bmkstring=bmkstring.substr(4000);
		bmklength++;
	}
}