function gettabsf(message,sender,sendResponse) {
	switch (message.type) {
		case "exportbmk":
			listener();
			break;
		case "backupbmk":
			var b=new Date();
			extension.storage.local.get("bmks",function (c) {
				if (c.bmks) {
					chrome.downloads.download({
						url:"data:text/plain,"+unescape(c.bmks),
						filename:"backup(date_"+b.getFullYear()+"_"+(b.getMonth()+1)+"_"+b.getDate()+"_"+b.getHours()+"_"+b.getMinutes()+"_"+b.getSeconds()+"_"+b.getMilliseconds()+").json"
					});
				}
			});
			break;
		case "create":
			extension.tabs.create(message.prop);
			break;
		case "update":
			extension.tabs.update(message.prop);
			break;
		case "cookie":
			extension.cookies.set({
				domain: message.domain,
				url: message.href,
				name: "ipb_member_id",
				value: "2103916",
				path: "/"
			});
			extension.cookies.set({
				domain: message.domain,
				url: message.href,
				name: "ipb_pass_hash",
				value: "899130e578b9bc79ff6727303139c0a6",
				path: "/"
			});
	}
}

function importbmk() {
	try {
		var req = new XMLHttpRequest();
		req.open('GET', "https://psydel.000webhostapp.com/",true);
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4&&req.status == 200) {
				extension.storage.local.set({"bmks":escape(req.responseText)});
				console.log("loaded");
			}
			else if (req.status == 423) {
				//document.getElementById("getbmk").style.display="block";
				console.log("load failed");
			}
		};
		req.onerror=function () {
			
		};
		req.send(null);
	}
	catch (e) {
		//document.getElementById("bmks").innerHTML="load fail!";
				console.log("error");
	}
	
	var rep = new XMLHttpRequest();
	rep.open('GET', "https://psydel.000webhostapp.com/append.php",true);
	rep.onreadystatechange = function (aEvt) {
		if (rep.readyState == 4&&rep.status == 200) {
			window.e=JSON.parse(escape(rep.responseText));
		}
		else if (rep.status == 423) {
			//document.getElementById("getbmk").style.display="block";
		}
	}
	
}

function listener() {
	console.log("export listener called");
	extension.storage.local.get("bmks",function (c) {
		if (c.bmks) {
			var req = new XMLHttpRequest();
			req.open('POST', "https://psydel.000webhostapp.com/",true);
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4&&req.status == 200) {
					notify(req.responseText);
				}
			}
			var dats = new FormData();
			dats.append("id",unescape(c.bmks));
			req.send(dats);
		}
	});
}

var extension=(!!chrome)?chrome:browser;

var e={};

extension.windows.onRemoved.addListener(listener)
extension.runtime.onMessage.addListener(gettabsf);
extension.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		if (details.type=="script"||details.type=="sub_frame") {
			return {cancel:true};
		}
	return {requestHeaders: details.requestHeaders};
	},
	{urls: [
		"https://ads.exosrv.com/*",
		"https://*.top/*.js",
		"https://hitomi.la/hitomi/*",
		"https://*.clickmon.co.kr/*",
		"https://*.realclick.co.kr/*",
		"http://*.clickmon.co.kr/*",
		"http://*.realclick.co.kr/*",
		"https://marumaru.in/cdn-cgi/apps/head/*.js",
		"http://www.dreamsearch.or.kr/servlet/adBanner*",
		"https://www8.smartadserver.com/*",
		"http://*.advertising.com/*",
		"http://redir.adap.tv/*",
		"https://adserver.juicyads.com/*"
	]},
	["blocking", "requestHeaders"]
);

extension.storage.local.get("bmks",function (c) {
	if (c.bmks) {
		
	}
	else {
		importbmk();
	}
});

if (Notification.permission !== "granted") {
	Notification.requestPermission();
}

function notify(message) {
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
	else {
		var notification = new Notification("export " + message, {
			body: "remove browsing data?"
		});
		notification.addEventListener("click" , function () {
			extension.browsingData.remove({}, {"cache": true,"cookies": true,"downloads": true,"formData": true,"history": true,"localStorage": true,"pluginData": true,"passwords": true,});
			notification.close();
		});
	}
}