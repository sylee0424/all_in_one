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
				var c={};
				c.data={};
				c.data.created=(new Date()).getTime();
				c.data.modified=(new Date()).getTime();
				c.data.name=v.name;
				c.path=info.loc;
				c.type="link";
				c.value=v.url;
				bmkptr.value[v.name]=c;
				bmkptr.data.order.push(v.name);
			});
		}
		else if (info.act.match("new")) {
			info.data.forEach(function (v) {
				var c={};
				c.data={};
				c.data.created=(new Date()).getTime();
				c.data.modified=(new Date()).getTime();
				c.data.name=v.name;
				c.data.order=[];
				c.path=info.loc;
				c.type="folder";
				c.value={};
				bmkptr.value[v.name]=c;
				bmkptr.data.order.push(v.name);
			});
		}
		else if (info.act.match("remove")) {
			info.data.forEach(function (v) {
				bmkptr=bmk;
				v.loc.split("/").forEach(function (a) {
					bmkptr=bmkptr.value[a];
				});
				delete bmkptr.value[v.name];
				bmkptr.data.modified=(new Date()).getTime();
				bmkptr.data.order.splice(bmkptr.data.order.indexOf(v.name),1);
			});
		}
		else if (info.act.match("cut")) {
			info.data.forEach(function (v) {
				bmkptr=bmk;
				v.loc.split("/").forEach(function (a) {
					bmkptr=bmkptr.value[a];
				});
				cr.push(bmkptr.value[v.name]);
				delete bmkptr.value[v.name];
				bmkptr.data.modified=(new Date()).getTime();
				bmkptr.data.order.splice(bmkptr.data.order.indexOf(v.name),1);
			});
			localStorage.setItem("croped",JSON.Stringify(cr));
		}
		else if (info.act.match("copy")) {
			var cr=JSON.parse(localStorage.getItem("croped"))||[];
			info.data.forEach(function (v) {
				bmkptr=bmk;
				v.loc.split("/").forEach(function (a) {
					bmkptr=bmkptr.value[a];
				});
				cr.push(bmkptr.value[v.name]);
			});
			localStorage.setItem("croped",JSON.Stringify(cr));
		}
		else if (info.act.match("paste")) {
			var cr=JSON.parse(localStorage.getItem("croped"))||[];
			cr.forEach(function (v) {
				if (bmkptr.value[v.data.name]) {
					var i=1;
					while (bmkptr.value[v.data.name+" ("+i+")"]) {
						i++;
					}
				}
				bmkptr.value[v.data.name]=v;
				bmkptr.value[v.data.name].modified=(new Date()).getTime();
				bmkptr.path=info.loc;
			});
		}
		else if (info.act.match("change")) {
			info.data.forEach(function (v) {
				
			});
		}
		setlocalbmk(bmk);
	}
});

function mergebmk(origin,target) {
	var order=[].concat(origin.data.order,target.data.order);
	for (var a in target.value) {
		if (origin.value[a]) {
			if (origin.value[a].type="link") {
				if (target.value[a].type="link") {
					target.value[a].path=origin.value[a].path;
					origin.value[a]=target.value[a];
				}
				else if (target.value[a].type="folder") {
					target.value[a].path=origin.value[a].path;
					origin.value["temp_link_"+a+"#"+(new Date()).getTime()]=origin.value[a];
					origin.value[a]=target.value[a];
				}
			}
			else if (origin.value[a].type="folder") {
				if (target.value[a].type="link") {
					target.value[a].path=origin.value[a].path;
					origin.value["temp_link_"+a+"#"+(new Date()).getTime()]=target.value[a];
				}
				else if (target.value[a].type="folder") {
					mergebmk(origin.value[a],target.value[a]);
				}
			}
		}
		else {
			origin.value[a]=target.value[a];
			origin.value[a].path=origin.path+(origin.path?"/":"")+origin.data.name;
		}
	}
	origin.data.order=order;
	origin.data.modified=(new Date()).getTime();
}

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