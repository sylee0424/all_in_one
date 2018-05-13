esfs.addui.f();

extension.storage.local.get(["bmks","loc"],function (c) {
	if (c.bmks) {
		ev.bmk=JSON.parse(unescape(c.bmks));
		if (c.loc) {
			bufs.show.f(c.loc,document.getElementById("bmks").classList.contains("__editing"));
			document.getElementById("dir").dataset.loc=c.loc;
			document.getElementById("dir").innerHTML=c.loc;
			if (c.loc!="root") {
				document.getElementById("go_up").classList.remove("__disabled");
			}
		}
		else {
			bufs.show.f("root",document.getElementById("bmks").classList.contains("__editing"));
			document.getElementById("dir").dataset.loc="root";
			document.getElementById("dir").innerHTML="root";
		}
	}
});

document.querySelector("#bmks").addEventListener("keydown",keyboardaction);