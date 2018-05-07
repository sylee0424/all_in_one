Extension_Sub_Functions.Add_Extension_Interface.f();

extension.storage.local.get(["bmks","loc"],function (c) {
	if (c.bmks) {
		Extension_Variables.Bookmark_Original=JSON.parse(unescape(c.bmks));
		if (c.loc) {
			Bookmark_User_Functions.Show_Bookmark.f(c.loc,document.getElementById("bmks").classList.contains("__editing"));
			document.getElementById("dir").dataset.loc=c.loc;
			document.getElementById("dir").innerHTML=c.loc;
			if (c.loc!="root") {
				document.getElementById("go_up").classList.remove("__disabled");
			}
		}
		else {
			Bookmark_User_Functions.Show_Bookmark.f("root",document.getElementById("bmks").classList.contains("__editing"));
			document.getElementById("dir").dataset.loc="root";
			document.getElementById("dir").innerHTML="root";
		}
	}
});

document.querySelector("#bmks").addEventListener("keydown",keyboardaction);