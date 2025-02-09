
document.addEventListener("readystatechange", runInit);

function runInit(){
	
	let btn = document.getElementById("runbtn");
	btn.addEventListener("click", runClick);
	
	adjustCodeMirror();
}

function runClick(){
	let cm = document.querySelector(".CodeMirror-code");
	ifm = document.getElementById("iframeResult");
	ifm.srcdoc = cm.innerText;
	console.log(cm.innerText)
}

function adjustCodeMirror(){
	let e;
	e = document.querySelector(".CodeMirror");
	if(e != null){
		e.style.height="100%";
	}
}

