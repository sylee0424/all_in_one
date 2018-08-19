window.addEventListener("message",function (e) {
	if (e.data.type.match("getbmk")) {
		window.parent.postMessage({
			"bmk":getlocalbmk(),
			"type":"getted"
		},e.origin);
	}
	else if (e.data.type.match("setbmk")) {
		setlocalbmk(e.data.bmk);
		window.parent.postMessage({
			"result":"complete",
			"type":"setted"
		},e.origin);
	}
	else if (e.data.type.match("import")) {
		var req = new XMLHttpRequest();
		req.open('GET',"https://home.psydel.com/",true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				setlocalbmk(JSON.parse(req.responseText));
				window.parent.postMessage({
					"bmk":JSON.parse(req.responseText),
					"type":"importd"
				},e.origin);
			}
		};
		req.send(null);
	}
	else if (e.data.type.match("export")) {
		var req = new XMLHttpRequest();
		req.open('POST',"https://home.psydel.com/",true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				alert(req.responseText);
				window.parent.postMessage({
					"result":"complete",
					"type":"exportd"
				},e.origin);
			}
		}
		var dats = new FormData();
		dats.append("id",JSON.stringify(getlocalbmk()));
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
				if (!v.name) {
					return undefined;
				}
				if (bmkptr.value[v.name]) {
					if (confirm(v.name+" is already exist.\noverwrite it?")) {
						
					}
					else {
						while(bmkptr.value[(v.name=prompt("new name",v.name))]) {
							if (!v.name) {
								return undefined;
							}
						}
					}
				}
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
				if (bmkptr.value[v.name]) {
					alert(v.name+" is already exist.");
					return undefined;
				}
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
					if (bmkptr.value[v.data.name].type=="link") {
						if (v.type=="link") {
							v.path=info.loc;
							bmkptr.value[v.data.name]=v;
						}
						else if (v.type=="folder") {
							var a="temp_link_"+v.data.name+"@"+(new Date()).getTime();
							v.path=info.loc;
							bmkptr.value[a]=bmkptr.value[v.data.name];
							bmkptr.value[v.data.name]=v;
							bmkptr.data.order.push(a);
						}
					}
					else if (bmkptr.value[v.data.name].type=="folder") {
						if (v.type=="link") {
							var a="temp_link_"+v.data.name+"@"+(new Date()).getTime();
							v.path=info.loc;
							bmkptr.value[a]=v;
							bmkptr.data.order.push(a);
						}
						else if (v.type=="folder") {
							v.path=info.loc;
							mergebmk(bmkptr.value[v.data.name],v);
						}
					}
				}
				else {
					bmkptr.value[v.data.name]=v;
					bmkptr.value[v.data.name].data.modified=(new Date()).getTime();
					bmkptr.value[v.data.name].path=info.loc;
				}
			});
		}
		else if (info.act.match("cancel")) {
			info.data.forEach(function (v) {
				var cr=JSON.parse(localStorage.getItem("croped"))||[];
				cr.forEach(function (v) {
					bmkptr=bmk;
					v.loc.split("/").forEach(function (a) {
						bmkptr=bmkptr.value[a];
					});
					bmkptr.value[v.data.name]=v;
				});
				localStorage.removeItem("croped");
			});
		}
		else if (info.act.match("sort")) {
			var Temporal_Bookmark = {};
			var Bookmark_Folders = [];
			var Bookmark_Links = [];
			Object.keys(bmkptr.value).forEach(function (val) {
				if (bmkptr.value[val].type == "folder") {
					Bookmark_Folders.push(val);
				} else {
					Bookmark_Links.push(val);
				}
			});
			Bookmark_Folders.sort();
			Bookmark_Links.sort();
			bmkptr.data.order=[].concat(Bookmark_Folders,Bookmark_Links);
		}
		else if (info.act.match("change")) {
			info.data.forEach(function (v) {
				if (!v.name) {
					return undefined;
				}
				if (bmkptr.value[v.name]&&v.name!=v.pname) {
					if (!confirm(v.name+" is already exist.\noverwrite it?")) {
						while(bmkptr.value[(v.name=prompt("new name",v.name))]) {
							if (!v.name) {
								return undefined;
							}
						}
					}
				}
				bmkptr.value[v.name]=bmkptr.value[v.pname];
				if (v.name!=v.pname) {
					delete bmkptr.value[v.pname];
				}
				bmkptr.data.order.splice(bmkptr.data.order.indexOf(v.pname),1,v.name);
				bmkptr.value[v.name].data.modified=(new Date()).getTime();
				if (bmkptr.value[v.name].type=="link") {
					bmkptr.value[v.name].value=v.url;
				}
			});
		}
		setlocalbmk(bmk);
		console.log("setted");
		window.parent.postMessage({
			"bmk":bmk,
			"type":"changd"
		},e.origin);
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
					origin.value["temp_link_"+a+"@"+(new Date()).getTime()]=origin.value[a];
					origin.value[a]=target.value[a];
				}
			}
			else if (origin.value[a].type="folder") {
				if (target.value[a].type="link") {
					target.value[a].path=origin.value[a].path;
					origin.value["temp_link_"+a+"@"+(new Date()).getTime()]=target.value[a];
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
	if (!bmklength) {
		return null;
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
	localStorage.setItem("bmklength",bmklength);
}

document.head.removeChild(document.getElementsByTagName("script")[0]);