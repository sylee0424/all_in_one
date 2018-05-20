window.addEventListener("message",function (event) {
	if (event.type=="getbmk") {
		var bmklength=Number(localStorage.getItem("bmklength"));
		var bmkstring="";
		for (var i=0;i<bmklength;i++) {
			bmkstring+=localStorage.getItem("bmkbody"+i);
		}
		var bmk=JSON.parse(bmkstring);
		window.parent.postMessage({
			"bmk":bmk,
			"type":"getbmk"
		},event.href);
	}
	else if (event.type=="setbmk") {
		var bmkstring=JSON.stringify(event.bmk);
		var bmklength=0;
		while (bmkstring) {
			localStorage.setItem("bmkbody"+bmklength,bmkstring.substr(0,4000));
			bmkstring=bmkstring.substr(4000);
			bmklength++;
		}
		window.parent.postMessage({
			"result":"complete",
			"type":"setbmk"
		},event.href);
	}
});