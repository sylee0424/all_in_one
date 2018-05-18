function contentonmessage(event) {
		if (event.data.type=="removebmk") {
			extension.storage.local.remove("bmks");
		}
		else if (event.data.type=="importbmk") {
			var req = new XMLHttpRequest();
			req.open('GET', "https://psydel.000webhostapp.com/",true);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4&&req.status == 200) {
					extension.storage.local.set({"bmks":escape(req.responseText)});
					console.log("imported");
				}
				else if (req.status == 423) {
					
				}
			};
			req.onerror=function () {
				
			};
			req.send(null);
		}
		else if (event.data.type=="check") {
			extension.storage.local.get("bmks",function (c) {
				window.postMessage({
					type:"update",
					bmk:JSON.parse(unescape(c.bmks))
				},location.href);
			});
		}
		else if (event.data.des=="back") {
			extension.runtime.sendMessage(extension.runtime.id,event.data);
		}
		else if (event.data.type=="change") {
			if (!event.data.changeinfo) {
				return undefined;
			}
			console.log(event.data.changeinfo);
			extension.storage.local.get(["bmks","croped"],function (c) {
				if (c.bmks) {
					var bmk=JSON.parse(unescape(c.bmks));
					var bmkptr=bmk;
					event.data.changeinfo.loc.split("/").forEach(function (val) {
						bmkptr=bmkptr.value[val];
					});
				}
				else {
					var bmk={};
					var bmkptr=bmk;
					event.data.changeinfo.loc.split("/").forEach(function (val) {
						bmkptr.value={};
						bmkptr.value[val]={};
						bmkptr=bmkptr.value[val];
					});
				}
				if (event.data.changeinfo.type=="add") {
					event.data.changeinfo.data.forEach(function (val) {
						if (!val.title) {
							return undefined;
						}
						else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
							while (val.title.indexOf("/")!=-1) {
								val.title = prompt("'/'는 사용할수 없습니다.", val.title);
							}
						}
						else if (!bmkptr.value[val.title]) {
							if (!val.title) {
								return undefined;
							}
						}
						else if (val.type=="link"&&confirm("이미 '" + val.title + "'가 있습니다. 덮어쓰시겠습니까?")) {
							if (val.type=="folder") {
								return undefined;
							}
						}
						else if ((val.title = prompt("사용 중인 이름입니다." , val.title))) {
							while (bmkptr.value[val.title]||(val.type=="folder"&&val.title.indexOf("/")!=-1)) {
								if (bmkptr.value[val.title]) {
									val.title = prompt("사용 중인 이름입니다.", val.title);
								} else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
									val.title = prompt("'/'는 사용할수 없습니다.", val.title);
								} else {
									return undefined;
								}
							}
						}
						else {
							return undefined;
						}
						bmkptr.value[val.title] = {};
						bmkptr.value[val.title].path = event.data.changeinfo.loc;
						bmkptr.value[val.title].data={};
						var b=(new Date()).getTime();
						bmkptr.value[val.title].data.created = b;
						bmkptr.value[val.title].data.modified = b;
						bmkptr.value[val.title].data.croped=false;
						bmkptr.value[val.title].type = val.type;
						if (val.type=="link") {
							bmkptr.value[val.title].value = val.url;
						}
						else {
							bmkptr.value[val.title].value = {};
						}
					});
				}
				else if (event.data.changeinfo.type=="remove") {
					if (event.data.changeinfo.crop) {
						if (!c.croped) {
							c.croped=[];
						}
						event.data.changeinfo.data.forEach(function (val) {
							bmkptr.value[val].data.name=val;
							bmkptr.value[val].path=event.data.changeinfo.loc;
							c.croped.push(bmkptr.value[val]);
							delete bmkptr.value[val];
						});
						extension.storage.local.set({"croped":c.croped});
					}
					else {
						event.data.changeinfo.data.forEach(function (val) {
							delete bmkptr.value[val];
						});
					}
				}
				else if (event.data.changeinfo.type=="update") {
					event.data.changeinfo.data.forEach(function (val) {
						if (!val.title) {
							return undefined;
						}
						bmkptr.value[val.title]=bmkptr.value[val.ptitle];
						if (val.title!=val.ptitle) {
							delete bmkptr.value[val.ptitle];
						}
						if (val.type=="link") {
							bmkptr.value[val.title].value=val.url;
						}
						var b=(new Date()).getTime();
						bmkptr.value[val.title].data.modified = b;
					});
				}
				else if (event.data.changeinfo.type=="edit") {
					event.data.changeinfo.data.forEach(function (val) {
						if (!val.title) {
							return undefined;
						}
						else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
							while (val.title.indexOf("/")!=-1) {
								val.title = prompt("'/'는 사용할수 없습니다.", val.title);
							}
						}
						else if (!bmkptr.value[val.title]) {
							if (!val.title) {
								return undefined;
							}
						}
						else if (val.type=="link"&&confirm("이미 '" + val.title + "'가 있습니다. 덮어쓰시겠습니까?")) {
							return undefined;
						}
						else if ((val.title = prompt("사용 중인 이름입니다." , val.title))) {
							while (bmkptr.value[val.title]||(val.type=="folder"&&val.title.indexOf("/")!=-1)) {
								if (bmkptr.value[val.title]) {
									val.title = prompt("사용 중인 이름입니다.", val.title);
								} else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
									val.title = prompt("'/'는 사용할수 없습니다.", val.title);
								} else {
									return undefined;
								}
							}
						}
						else {
							return undefined;
						}
						bmkptr.value[val.title]=bmkptr.value[val.ptitle];
						if (val.title!=val.ptitle) {
							delete bmkptr.value[val.ptitle];
						}
						if (val.type=="link") {
							bmkptr.value[val.title].value=val.url;
						}
						var b=(new Date()).getTime();
						bmkptr.value[val.title].data.modified = b;
					});
				}
				else if (event.data.changeinfo.type=="move") {
					c.croped.forEach(function (val) {
						if (val.type == "folder") {
							if (!bmkptr.value[val.data.name]) {
								bmkptr.value[val.data.name] = val;
								bmkptr.value[val.data.name].data.croped=false;
							} else {
								if (bmkptr.value[val.data.name].type=="link") {
									var a=bmkptr.value[val.data.name];
									bmkptr.value[val.data.name] = val;
									bmkptr.value[val.data.name].data.croped=false;
									bmkptr.value[val.data.name].data.exx=a;
								}
								else {
									MergeRecursive(bmkptr.value[val.data.name].value,val.value);
								}
								return undefined;
							}
						} else {
							console.log(bmkptr);
							if (bmkptr.value[val.data.name]) {
								if (confirm("이미 '" + val.data.name + "'가 있습니다. 덮어쓰시겠습니까?")) {
									if (!!(val.data.name = prompt("새 북마크 이름", val.data.name))) {
										while (bmkptr.value[val.data.name]) {
											if (!!(val.data.name = prompt("새 북마크 이름", val.data.name))) {
	
											} else {
												return undefined;
											}
										}
									} else {
										return undefined;
									}
								}
							}
							bmkptr.value[val.data.name] = val;
							bmkptr.value[val.data.name].data.croped=false;
						}
					});
					extension.storage.local.remove("croped");
				}
				else if (event.data.changeinfo.type=="return") {
					c.croped.forEach(function (val) {
						bmkptr=bmk;
						val.path.split("/").forEach(function (s) {
							bmkptr=bmkptr.value[s];
						});
						bmkptr.value[val.data.name]=val;
						bmkptr.value[val.data.name].data.croped=false;
					});
					extension.storage.local.remove("croped");
				}
				else if (event.data.changeinfo.type=="import") {
					event.data.changeinfo.data.forEach(function (val) {
						bmk=MergeRecursive(bmk,val);
					});
				}
				else if (event.data.changeinfo.type=="sort") {
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
				extension.storage.local.set({"bmks":escape(JSON.stringify(bmk))});
				window.postMessage({type:"update","bmk":bmk},location.href);
				console.log("setted");
			});
		}
		else if (event.data.type=="test") {
			alert("test");
			console.log(event.data);
		}
}

function topagescript(message,sender,sendResponse) {
	if (location.href.indexOf("file://")==-1) {
		window.postMessage(message,location.href);
	}
	else {
		window.postMessage(message,"*");
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

function MergeRecursive(obj1, obj2) {
	for (var p in obj2) {
		try {
			if ( obj2[p].constructor==Object ) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch(e) {
			obj1[p] = obj2[p];
		}
	}
	return obj1;
}

var extension=(!!chrome)?chrome:browser;

window.addEventListener("message",contentonmessage);

extension.runtime.onMessage.addListener(topagescript);

addscript(["pageobject.js","pagescript.js"],true);

extension.storage.local.get("setting",function (c) {
	if (c.setting) {
		window.postMessage(c.setting,location.href);
	}
	else {
		window.postMessage({
			type:"setting",
			scroll:false
		},location.href);
	}
});