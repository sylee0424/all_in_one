var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
	document.querySelector("#modalinput").dispatchEvent(new Event("modalcancel"));
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		document.querySelector("#modalinput").dispatchEvent(new Event("modalcancel"));
    }
}

document.querySelector("#modalinput").addEventListener("keydown",function (event) {
	event.stopPropagation();
	if (event.keyCode==13) {
		document.querySelector("#modalinput").dispatchEvent(new Event("modalcomplete"));
		modal.style.display = "none";
	}
});

modal.querySelector(".left").addEventListener("click",function (event) {
    modal.style.display = "none";
	document.querySelector("#modalinput").value=true;
	document.querySelector("#modalinput").dispatchEvent(new Event("modalcomplete"));
});

modal.querySelector(".right").addEventListener("click",function (event) {
    modal.style.display = "none";
	document.querySelector("#modalinput").dispatchEvent(new Event("modalcancel"));
});