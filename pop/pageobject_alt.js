window.esfs = {
	addui: {
		f: function() {
			ev.bmkif.forEach(etfs.iptnds.f);
			etfs.iptnds.f({
				tag: "div",
				id: "pastebmk",
				classname: ["__hided"],
				target: document.body
			});
			etfs.iptnds.f({
				tag: "div",
				name: "paste bmk",
				image: dataurls.paste,
				classname: ["__buttons"],
				events: [{
					name: "click",
					value: bufs.paste.f
				}],
				target: document.getElementById("pastebmk")
			});
			etfs.iptnds.f({
				tag: "div",
				name: "cancel",
				image: dataurls.cancel,
				classname: ["__buttons"],
				events: [{
					name: "click",
					value: bufs.cancel.f
				}],
				target: document.getElementById("pastebmk")
			});
		},
		name: "Drag_Event_Checker"
	}
};

window.etfs = {

	toggle: {
		f: function(event) {
			event.stopPropagation();
			this.classList.toggle("__checked");
			this.checked = this.classList.contains("__checked");
		}
	},
	
	utf8_encode : {
		f: function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		name: "utf8_encode"
	},

	utf8_decode: {
		f: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		},

		name: "utf8_decode"
	},

	emuclick: {
		f: function(hrf) {
			if (hrf.click) {
				hrf.click();
			} else if (document.createEvent) {
				var eventObj = document.createEvent('MouseEvents');
				eventObj.initEvent('click', true, true);
				hrf.dispatchEvent(eventObj);
			}
		},
		name: "emuclick"
	},

	iptnds: {
		f: function(item) {
			var div = document.createElement(item.tag);
			if (item.classname) {
				for (var i = 0; i < item.classname.length; i++) {
					div.classList.add(item.classname[i]);
				}
			}
			div.classList.toggle("__extension");
			if (item.id) {
				div.id = item.id;
			}
			if (item.image) {
				if (!item.childs) {
					item.childs=[];
				}
				var b = {}
				b.tag = "img"
				b.attributes = [{
					name: "src",
					value: item.image
				}];
				b.classname = ["__innerimage","__extension"];
				item.childs.push(b);
			} else if (item.name) {
				div.appendChild(document.createTextNode(item.name));
			}
			if (item.childs) {
				for (var i = 0; i < item.childs.length; i++) {
					item.childs[i].target = div;
					etfs.iptnds.f(item.childs[i]);
				}
			}
			if (item.events) {
				for (var i = 0; i < item.events.length; i++) {
					div.addEventListener(item.events[i].name, item.events[i].value);
				}

			}
			if (item.attributes) {
				for (var i = 0; i < item.attributes.length; i++) {
					div.setAttribute(item.attributes[i].name, item.attributes[i].value);
				}
			}
			if (item.target) {
				item.target.appendChild(div);
			} else {
				document.body.appendChild(div);
			}
		},
		name: "Drag_Event_Checker"
	}
};

window.bufs = {

	show: {
		f: function(bmkpath,edit,bmkname) {
			if (edit) {
				edit=false;
			}
			var a = document.getElementById("bmks");
			var e = Number(a.scrollTop);
			while (a.firstChild) {
				a.removeChild(a.firstChild);
			}
			if (!ev.bmk) {
				if (dialog({body:"web bookmark load failed.\nload bookmark from local?",confirm:true})){
					etfs.emuclick.f(document.getElementById("getbmk"));
				}
				return undefined;
			}
			var bmkptr = ev.bmk;
			bmkpath.split("/").forEach(function (val) {
				bmkptr = bmkptr.value[val];
			});
			if (!bmkptr) {
				bufs.show.f("root",edit);
				document.getElementById("dir").dataset.loc="root";
				return undefined;
			}
			var lists=Object.keys(bmkptr.value);
			lists.forEach(function (val,index) {
				var c = document.createElement("div");
				var b = document.createElement("label");
				c.dataset.id = val;
				c.id="chk"+val;
				c.classList.add("__input");
				if (!edit) {
					c.classList.add("__hided");
				}
				if (bmkname&&bmkname==val) {
					b.classList.add("__selected");
				}
				else if (!bmkname&&index==0) {
					b.classList.add("__selected");
				}
				b.appendChild(c);
				b.dataset.src = bmkptr.value[val].value;
				b.dataset.loc = bmkpath;
				b.dataset.index = index;
				b.classList.add("__"+bmkptr.value[val].type);
				b.id = val;
				b.appendChild(document.createTextNode(val));
				if (!bmkptr.value[val].data.croped) {
					document.getElementById("bmks").appendChild(b);
					document.getElementById("bmks").appendChild(document.createElement("br"));
					b.addEventListener("mousedown", bufs.clickact.f);
				}
			});
			a.scrollTop = e;
			extension.storage.local.set({"loc":bmkpath});
		},

		name: "show"
	},

	add: {
		f: function() {
			if (!this||this.classList.contains("__disabled")) {
				return undefined;
			}
			convertCF(this,extension.tabs.executeScript,function (a) {
				strgact({
					type:"add",
					loc:document.getElementById("dir").dataset.loc,
					data:a
				});
			},{code:"var a={}; a.title=document.title; a.url=location.href; a.type='link'; a;"});
		},

		name: "add"
	},

	clickact: {
		f: function(e) {
			if (!document.getElementById("bmks").classList.contains("__editing") && e.which == 1) {
				if (this.classList.contains("__link")) {
					var a={};
					a.url=this.dataset.src;
					a.active=!document.getElementById("bactab").classList.contains("__checked");
					if (document.getElementById("tab").classList.contains("__checked")) {
						extension.tabs.update(a);
					} else {
						extension.tabs.create(a);
					}
				} else if (this.classList.contains("__folder")) {
					var s = document.getElementById("dir").dataset.loc + "/" + this.id;
					document.getElementById("dir").dataset.loc=s;
					document.getElementById("dir").innerHTML = s;
					bufs.show.f(s);
					if (document.getElementById("go_up").classList.contains("__disabled")) {
						document.getElementById("go_up").classList.remove("__disabled");
					}
				}
			} else if (e.which == 1) {
				var input=document.getElementById("chk"+this.id);
				etfs.toggle.f.call(input,e);
			} else if (e.which == 3) {
				e.preventDefault();
				if (this.classList.contains("__link")) {
					var a = {};
					a.ptitle = this.id;
					a.title = dialog({body:"bookmark name",value: this.id});
					a.url = dialog({body:"bookmark path",value: this.dataset.src});
					a.type = "link";
					strgact({
						type:"edit",
						loc:document.getElementById("dir").dataset.loc,
						data:[a]
					});
				} else if (this.classList.contains("__folder")) {
					var a = {};
					a.ptitle = this.id;
					a.title = dialog({body:"폴더 이름",value:this.id});
					//a.title = prompt("bookmark name", this.id);
					a.type = "folder";
					strgact({
						type:"edit",
						loc:document.getElementById("dir").dataset.loc,
						data:[a]
					});
				}
			} else if (e.which == 2) {
				e.preventDefault();
				if (this.classList.contains("__link")) {
					convertCF(this,extension.tabs.executeScript,function (c) {
						console.log(c);
						strgact({
							type:"update",
							loc:document.getElementById("dir").dataset.loc,
							data:[{
								type:"link",
								title:c[0].title,
								ptitle:c[0].ptitle,
								url:c[0].url
							}]
						});
					},{code:"var a={}; a.title=document.title; a.url=location.href; a.ptitle='"+this.id+"'; a;"});
				}
			}
		},

		name: "clickact"
	},

	editact: {
		f: function() {
			document.getElementById("bmks").classList.add("__editing")
			for (var s of document.getElementsByClassName("__inedit")) {
				s.classList.add("__disabled");
			}
			for (s of document.getElementsByClassName("__editout")) {
				s.classList.remove("__invisibled");
			}
			for (s of document.querySelectorAll("#bmks .__input")) {
				s.classList.remove("__hided");
			}
		},

		name: "editact"
	},

	editdact: {
		f: function() {
			document.getElementById("bmks").classList.remove("__editing")
			for (var s of document.getElementsByClassName("__inedit")) {
				s.classList.remove("__disabled");
			}
			for (s of document.getElementsByClassName("__editout")) {
				s.classList.add("__invisibled");
			}
			if (document.getElementById("dir").dataset.loc == "root") {
				document.getElementById("go_up").classList.add("__disabled");
			}
			for (s of document.querySelectorAll("#bmks .__input")) {
				s.classList.add("__hided");
			}
		},

		name: "editdact"
	},

	remove: {
		f: function() {
			strgact({
				type:"remove",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.slice.call(
					document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
				).map(val => val.dataset.id)
			});
		},

		name: "remove"
	},

	goup: {
		f: function() {
			if (document.getElementById("go_up").classList.contains("__disabled")) {
				return undefined;
			}
			var a = document.getElementById("dir").dataset.loc.split("/");
			if (a.length == 2) {
				document.getElementById("go_up").classList.add("__disabled")
			}
			var b = "";
			for (var i = 0; i < a.length - 1; i++) {
				if (i == 0) {
					b += a[i];
				} else {
					b += "/" + a[i];
				}
			}
			document.getElementById("dir").dataset.loc = b;
			document.getElementById("dir").innerHTML = b;
			bufs.show.f(document.getElementById("dir").dataset.loc,false,a[a.length-1]);
		},

		name: "goup"
	},

	newfld: {
		f: function() {
			var a = {};
			a.title = dialog({body:"새 폴더 이름",value:"새 폴더"});
			a.type = "folder";
			strgact({
				type:"add",
				loc:document.getElementById("dir").dataset.loc,
				data:[a]
			});
		},

		name: "newfld"
	},

	move: {
		f: function() {
			document.getElementById("pastebmk").classList.remove("__hided");
			document.getElementById("bmks").classList.add("__copyactive");
			bufs.editdact.f();
			strgact({
				type:"remove",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.slice.call(
					document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
				).map(val => val.dataset.id),
				crop:true
			});
		},

		name: "move"
	},

	copy: {
		f: function() {
			document.getElementById("pastebmk").classList.remove("__hided");
			document.getElementById("bmks").classList.add("__copyactive");
			bufs.editdact.f();
			strgact({
				type:"remove",
				loc:document.getElementById("dir").dataset.loc,
				data:Array.prototype.slice.call(
					document.getElementById("bmks").querySelectorAll("#bmks .__input.__checked")
				).map(val => val.dataset.id),
				crop:true,
				copy:true
			});
		},

		name: "move"
	},

	cancel: {
		f: function() {
			strgact({
				type:"return",
				loc:document.getElementById("dir").dataset.loc
			});
		},

		name: "Cancel_Paste2"
	},

	paste: {
		f: function() {
			strgact({
				type:"move",
				loc:document.getElementById("dir").dataset.loc
			});
			document.getElementById("pastebmk").classList.add("__hided");
			document.getElementById("bmks").classList.remove("__copyactive");
		},

		name: "Paste_Bookmark2"
	},

	exportbmk: {
		f: function() {
			window.postMessage({
				type: "exportbmk",
				des: "back"
			}, location.href);
		},

		name: "exportbmk"
	},

	sort: {
		f: function() {
			strgact({
				type:"sort",
				loc:document.getElementById("dir").dataset.loc
			});
		},

		name: "sort"
	},

	Hide_Bookmark: {
		f: function() {
			document.getElementById("bmkmain").classList.add("__hided");
			var a = document.getElementById("actionbar")
			a.classList.remove("__hided");
		},

		name: "Hide_Bookmark"
	},

	backup: {
		f: function() {
			window.postMessage({
				type: "backupbmk",
				des: "back"
			}, location.href);
		},

		name: "backup"
	},

	importbmk: {
		f: function() {
			window.postMessage({
				type: "importbmk"
			}, location.href);
		},

		name: "importbmk"
	},
	
	Merge_Bookmark: {
		f: function() {
			etfs.emuclick.f(document.getElementById("getbmk"));
		},
		name: "removeall"
	},

	removeall: {
		f: function() {
			window.postMessage({
				type: "removebmk"
			}, location.href);
		},

		name: "removeall"
	},

	getexternal: {
		f: function() {
			var reader = new FileReader();
			reader.addEventListener("load", function() {
				strgact({
					type:"import",
					loc:document.getElementById("dir").dataset.loc,
					data:[JSON.parse(etfs.utf8_decode.f(reader.result))]
				});
			}, false);
			if (this.files[0]) {
				reader.readAsBinaryString(this.files[0]);
			}
			document.getElementById("getbmk").classList.add("__hided");
		},

		name: "getexternal"
	}

}

window.ev = {
	bmkif: [{
		tag: "div",
		name: "edit bmks",
		image: dataurls.edit,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: bufs.editact.f
		}]
	},
	{
		tag: "div",
		name: "add bmk",
		image: dataurls.add,
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: bufs.add.f
		}]
	},
	{
		tag: "div",
		name: "sort bmk",
		classname: ["__buttons","__inedit"],
		image: dataurls.sort,
		events: [{
			name: "click",
			value: bufs.sort.f
		}]
	},
	{
		tag: "div",
		name: "new folder",
		image: dataurls["new"],
		classname: ["__buttons","__inedit"],
		events: [{
			name: "click",
			value: bufs.newfld.f
		}]
	},
	{
		tag: "div",
		name: "go up",
		classname: ["__buttons","__disabled","__inedit"],
		image: dataurls.up,
		id:"go_up",
		events: [{
			name: "click",
			value: bufs.goup.f
		}]
	},
	{
		tag: "br"
	},
	{
		tag: "div",
		id: "tab",
		events: [{
			name: "click",
			value: etfs.toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "this tab",
		events: [{
			name: "click",
			value: function (event) {
				etfs.toggle.f.call(document.getElementById("tab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		id: "bactab",
		events: [{
			name: "click",
			value: etfs.toggle.f
		}],
		classname:["__input","__extension"]
	},
	{
		tag: "span",
		name: "background tab",
		events: [{
			name: "click",
			value: function (event) {
				etfs.toggle.f.call(document.getElementById("bactab"),event);
			}
		}],
		classname:["__extension"]
	},
	{
		tag: "div",
		name: "import",
		image: dataurls["import"],
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: bufs.importbmk.f
		}]
	},
	{
		tag: "div",
		name: "export",
		image: dataurls["export"],
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: bufs.exportbmk.f
		}]
	},
	{
		tag: "div",
		name: "backup",
		image: dataurls.backup,
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: bufs.backup.f
		}]
	},
	{
		tag: "div",
		name: "merge",
		image: dataurls.merge,
		classname: ["__buttons"],
		events: [{
			name: "click",
			value: bufs.Merge_Bookmark.f
		}]
	},
	{
		tag: "input",
		id: "getbmk",
		classname: ["__hided"],
		events: [{
			name: "change",
			value: bufs.getexternal.f
		}],
		attributes: [{
				name: "accept",
				value: ".json"
			},
			{
				name: "type",
				value: "file"
			}
		]
	},
	{
		tag: "div",
		name: "root",
		id: "dir",
		attributes: [{
			name: "data-loc",
			value: "root"
		}]
	},
	{
		tag: "div",
		name: "remove",
		image: dataurls.remove,
		events: [{
			name: "click",
			value: bufs.remove.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "copy",
		image: dataurls.copy,
		events: [{
			name: "click",
			value: bufs.copy.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "move",
		image: dataurls.move,
		events: [{
			name: "click",
			value: bufs.move.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "end",
		image: dataurls.end,
		events: [{
			name: "click",
			value: bufs.editdact.f
		}],
		classname: ["__invisibled","__buttons","__editout"]
	},
	{
		tag: "div",
		name: "loading...",
		id: "bmks"
	}]
}

window.strgact = function (changeinfo) {
	if (!changeinfo) {
		return undefined;
	}
	extension.storage.local.get(["bmks","croped"],function (c) {
		if (c.bmks) {
			var bmk=JSON.parse(unescape(c.bmks));
			var bmkptr=bmk;
			changeinfo.loc.split("/").forEach(function (val) {
				bmkptr=bmkptr.value[val];
			});
		}
		else {
			var bmk={};
			var bmkptr=bmk;
			changeinfo.loc.split("/").forEach(function (val) {
				bmkptr.value={};
				bmkptr.value[val]={};
				bmkptr=bmkptr.value[val];
			});
		}
		if (changeinfo.type=="add") {
			for (val of changeinfo.data) {
				console.log(val);
				if (!val.title) {
					continue;
				}
				else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
					while (val.title.indexOf("/")!=-1) {
						val.title = dialog({body:"'/'는 사용할수 없습니다.", value:val.title});
					}
				}
				else if (!bmkptr.value[val.title]) {
					if (!val.title) {
						continue;
					}
				}
				else if (val.type=="link"&&dialog({body:"이미 '" + val.title + "'가 있습니다. 덮어쓰시겠습니까?",confirm:true})) {
					if (val.type=="folder") {
						continue;
					}
				}
				else if ((val.title = dialog({body:"사용 중인 이름입니다." ,value: val.title}))) {
					while (bmkptr.value[val.title]||(val.type=="folder"&&val.title.indexOf("/")!=-1)) {
						if (bmkptr.value[val.title]) {
							val.title = dialog({body:"사용 중인 이름입니다.",value: val.title});
						} else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
							val.title = dialog({body:"'/'는 사용할수 없습니다.",value: val.title});
						} else {
							continue;
						}
					}
				}
				else {
					continue;
				}
				bmkptr.value[val.title] = {};
				bmkptr.value[val.title].path = changeinfo.loc;
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
			}
		}
		else if (changeinfo.type=="remove") {
			if (changeinfo.crop) {
				if (!c.croped) {
					c.croped=[];
				}
				changeinfo.data.forEach(function (val) {
					bmkptr.value[val].data.name=val;
					bmkptr.value[val].path=changeinfo.loc;
					c.croped.push(bmkptr.value[val]);
					delete bmkptr.value[val];
				});
				extension.storage.local.set({"croped":c.croped});
			}
			if (!changeinfo.copy) {
				changeinfo.data.forEach(function (val) {
					delete bmkptr.value[val];
				});
			}
		}
		else if (changeinfo.type=="update") {
			console.log(changeinfo);
			changeinfo.data.forEach(function (val) {
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
		else if (changeinfo.type=="edit") {
			for (val of changeinfo.data) {
				if (!val.title) {
					return undefined;
				}
				else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
					while (val.title.indexOf("/")!=-1) {
						val.title = dialog({body:"'/'는 사용할수 없습니다.",value: val.title});
					}
				}
				else if (!bmkptr.value[val.title]||val.title==val.ptitle) {
					if (!val.title) {
						return undefined;
					}
				}
				else if (val.type=="link"&&dialog({body:"이미 '" + val.title + "'가 있습니다. 덮어쓰시겠습니까?",confirm:true})) {
					return undefined;
				}
				else if ((val.title = dialog({body:"사용 중인 이름입니다." ,value: val.title}))) {
					while (bmkptr.value[val.title]||(val.type=="folder"&&val.title.indexOf("/")!=-1)) {
						if (bmkptr.value[val.title]) {
							val.title = dialog({body:"사용 중인 이름입니다.",value: val.title});
						} else if (val.type=="folder"&&val.title.indexOf("/")!=-1) {
							val.title = dialog({body:"'/'는 사용할수 없습니다.",value: val.title});
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
			}
		}
		else if (changeinfo.type=="move") {
			for (val of c.croped) {
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
						if (dialog({body:"이미 '" + val.data.name + "'가 있습니다. 덮어쓰시겠습니까?",confirm:true})) {
							if (!!(val.data.name = dialog({body:"새 북마크 이름",value: val.data.name}))) {
								while (bmkptr.value[val.data.name]) {
									if (!!(val.data.name = dialog({body:"새 북마크 이름", value:val.data.name}))) {

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
			}
			extension.storage.local.remove("croped");
		}
		else if (changeinfo.type=="return") {
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
		else if (changeinfo.type=="import") {
			changeinfo.data.forEach(function (val) {
				bmk=MergeRecursive(bmk,val);
			});
		}
		else if (changeinfo.type=="sort") {
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
			Bookmark_Folders.forEach(function (val) {
				Temporal_Bookmark[val] = bmkptr.value[val];
				delete bmkptr.value[val];
				bmkptr.value[val] = Temporal_Bookmark[val];
			});
			Bookmark_Links.forEach(function (val) {
				Temporal_Bookmark[val] = bmkptr.value[val];
				delete bmkptr.value[val];
				bmkptr.value[val] = Temporal_Bookmark[val];
			});
		}
		extension.storage.local.set({"bmks":escape(JSON.stringify(bmk))});
		ev.bmk=bmk;
		bufs.show.f(
			document.getElementById("dir").dataset.loc,
			document.getElementById("bmks").classList.contains("__editing")
		);
		console.log("setted");
	});
}

window.MergeRecursive = function (obj1, obj2) {
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

window.convertCF = function (thist,_function,callback,...argv) {
	if (chrome) {
		argv.push(callback);
		_function.apply(thist,argv);
	}
	else {
		_function.apply(thist,argv).then(callback);
	}
}

window.addall = function () {
	convertCF(this,extension.tabs.query,function (a){
		a.forEach(function (val) {
			val.type="link";
		});
		strgact({
			type:"add",
			loc:"temp",
			data:a
		});
	},{});
}

window.openall = function () {
	var bmkptr=ev.bmk.value.temp.value;
	var list=Object.keys(bmkptr);
	list.forEach(function (val) {
		var a={};
		a.url=bmkptr[val].value;
		a.active=false;
		extension.tabs.create(a);
	});
	strgact({
		type:"remove",
		loc:"temp",
		data:list
	});
}

window.getlocs = function (a,b) {
	var c={};
	var d=a.getClientRects()[0];
	var e=b.getClientRects()[0];
	c.bottom=d.bottom-e.bottom;
	c.top=d.top-e.top;
	return c;
}

window.keyboardaction = function (event) {
	event.preventDefault();
	if (event.ctrlKey&&event.keyCode==86) {
		if (!document.getElementById("pastebmk").classList.contains("__hided")) {
			bufs.paste.f();
		}
	}
	else if (event.ctrlKey&&event.keyCode==67) {
		bufs.copy.f();
	}
	else if (event.ctrlKey&&event.keyCode==88) {
		bufs.move.f();
	}
	else if (event.ctrlKey&&event.keyCode==90) {
		bufs.cancel.f();
	}
	else if (event.keyCode==46) {
		bufs.remove.f();
	}
	else if (event.keyCode==37) {//l
		bufs.goup.f();
	}
	else if (event.keyCode==38) {//u
		var a=document.querySelector(".__selected");
		var b=document.querySelector("[data-index='"+(Number(a.dataset.index)-1)+"']");
		var c=document.querySelector("#bmks");
		if (b) {
			if (getlocs(a,c).bottom>0) {
				c.scrollTop+=getlocs(a,c).bottom;
			}
			a.classList.remove("__selected");
			b.classList.add("__selected");
			if (getlocs(b,c).top<0) {
				c.scrollTop+=getlocs(b,c).top;
			}
		}
	}
	else if (event.keyCode==40) {//d
		var a=document.querySelector(".__selected");
		var b=document.querySelector("[data-index='"+(Number(a.dataset.index)+1)+"']");
		var c=document.querySelector("#bmks");
		if (b) {
			if (getlocs(a,c).top<0) {
				c.scrollTop+=getlocs(a,c).top;
			}
			a.classList.remove("__selected");
			b.classList.add("__selected");
			if (getlocs(b,c).bottom>0) {
				c.scrollTop+=getlocs(b,c).bottom;
			}
		}
	}
	else if (event.keyCode==39) {
		if (document.getElementById("bmks").classList.contains("__editing")) {
			bufs.editdact.f();
		}
		else {
			bufs.editact.f();
		}
	}
	else if (event.keyCode==13) {//r
		if (event.ctrlKey) {
			bufs.clickact.f.call(document.querySelector(".__selected"),{which:3,preventDefault:(a=>a),stopPropagation:(a=>a)});
		}
		else if (event.altKey) {
			bufs.clickact.f.call(document.querySelector(".__selected"),{which:2,preventDefault:(a=>a),stopPropagation:(a=>a)});
		}
		else {
			bufs.clickact.f.call(document.querySelector(".__selected"),{which:1,preventDefault:(a=>a),stopPropagation:(a=>a)});
		}
	}
}

window.dialog = function (option) {
	if (!option) {
		option = {};
	}
	if (option.value) {
		return prompt(option.body,option.value);
	}
	else if (option.confirm) {
		return confirm(option.body);
	}
	else {
		return alert(option.body);
	}
}

window.addEventListener("keydown",keyboardaction);

