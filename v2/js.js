var dragBar = {
	en: false,
	min: 0.05,
	max: 0.95,
	left: 0.5,
	right: 0.5,
	cdir: 'vertical', // cdir (current direction), horizontal ou vertical
};
function dragBarInit(){
	let bar = document.getElementById("dragbar");
	let a = document.getElementById("textareacontainer");
	let b = document.getElementById("iframecontainer");
	bar.addEventListener("mousedown", function(){
		dragBar.en = true;
	});
	dragBarDefDim();
	sidesClassStart();
	dragBarResetPos();
}
function dragBarDefDim(){
	let bar = document.getElementById("dragbar");
	let w, h;
	
	if(dragBar.cdir == "horizontal"){
		w = window.innerWidth;
		h = 10;
	} else {//vertical
		w = 10;
		h = -150 + window.innerHeight - 10;
	}
	bar.style.width = w + "px";
	bar.style.height = h + "px";
}

function dragBarMove(){
	let x, y;
	if(dragBar.cdir == "horizontal"){
		x = 0;
		y = event.pageY - 150;//traduz my
	} else {//quando for vertical, executa este bloco
		x = event.pageX;
		y = 0 + 150;
	}
	dragBarGetPos(x, y);
	dragBarDefPos();
}
function dragBarResetPos(){
	let x, y;
	let bar = document.getElementById("dragbar");
	let w, h, w2, h2;
	w = window.innerWidth;
	h = window.innerHeight;
	w2 = bar.offsetWidth/2;
	h2 = bar.offsetHeight/2;
	if(dragBar.cdir == "horizontal"){
		x = 0;
		y = (h-150)/2;
	} else {//quando for vertical, executa este bloco
		x = w/2 - w2;
		y = 150;
	}
	dragBarGetPos(x, y);
	dragBarDefPos();
}
function dragBarDefPos(){
	let a = document.getElementById("textareacontainer");
	let b = document.getElementById("iframecontainer");
	let bar = document.getElementById("dragbar");
	
	if(dragBar.cdir == "horizontal"){
		let h = window.innerHeight - 150;
		let v = dragBar.left
		let y = v * h;
		let h2 = bar.offsetHeight;
		
		bar.style.left = 0 + "px";
		bar.style.top = 150 + (y-h2) + "px";
		a.style.height = (dragBar.left*100) + "%";
		b.style.height = (dragBar.right*100) + "%";
	} else { //vertical
		let w= window.innerWidth;
		let v = dragBar.left
		let x = v * w;
		let w2 = bar.offsetWidth/2;
		
		bar.style.left = (x-w2) + "px";
		bar.style.top = 150 + "px";
		a.style.width = (dragBar.left*100) + "%";
		b.style.width = (dragBar.right*100) + "%";
	}
}
function dragBarGetPos(mx, my){//argumentos: mx é em relação à window.innerWidth, mx/window.innerWidth; my é em relação à (window.innerHeight-150), my/(window.innerHeight-150).
	if(dragBar.cdir == "horizontal"){
		let h = window.innerHeight - 150;
		let v = my / h;
		v = clamp(v, dragBar.min, dragBar.max);
		dragBar.left = v;
		dragBar.right = 1 - v;
	} else { //vertical
		let w= window.innerWidth;
		let v = mx/w;
		v = clamp(v, dragBar.min, dragBar.max);
		dragBar.left = v;
		dragBar.right = 1 - v;
	}
}
function clamp(v, min, max){
	if(v < min){ return min; }
	if(v > max){ return max; }
	return v;
}


function dragBarResize(){
	let w= window.innerWidth;
	let h= window.innerHeight;
	let a = document.getElementById("textareacontainer");
	let b = document.getElementById("iframecontainer");
	let x, y;
	if(dragBar.cdir == "horizontal"){
		x = 0;
		y = dragBar.left * (h-150);
	} else {//vertical
		x = dragBar.left * w;
		y = 150;
	}
	dragBarDefDim();
	dragBarDefPos();
}
function shieldOn(){
	let s = document.getElementById("shield");
	s.style.display = "block";
}
function shieldOff(){
	let s = document.getElementById("shield");
	s.style.display = "none";
}

function resultSize(){
	let r = document.getElementById("resultsize");
	let b = document.getElementById("iframewrapper");
	let w = b.offsetWidth;
	let h = b.offsetHeight;
	r.innerHTML = "tamanho: " + w + " x " + h;
}

function redirInit(){
	let b = document.getElementById("redirbutton");
	b.addEventListener("click", redir);
}

function sideBoxesRedef(){
	let a = document.getElementById("textareacontainer");
	let b = document.getElementById("iframecontainer");
	if(dragBar.cdir == "horizontal"){
		a.style.width = "100%";
		a.style.height = "50%";
		b.style.width = "100%";
		b.style.height = "50%";
	} else {// vertical
		a.style.width = "50%";
		a.style.height = "100%";
		b.style.width = "50%";
		b.style.height = "100%";
	}
}
function sidesClassStart(){
	sidesClassDef("start")
}
function sidesClassToggle(){
	sidesClassDef("toggle");
}
function sidesClassDef(v){
	let ac = document.getElementById("textareacontainer")
	let bc = document.getElementById("iframecontainer");
	let a = document.getElementById("textarea");
	let b = document.getElementById("iframe");
	let c = "horizontal";
	if(v == "start"){
		if(dragBar.cdir == "horizontal"){
			ac.classList.add(c);
			bc.classList.add(c);
			a.classList.add(c);
			b.classList.add(c);
		} else {
			ac.classList.remove(c);
			bc.classList.remove(c);
			a.classList.remove(c);
			b.classList.remove(c);
		}
	} else {//toggle
		ac.classList.toggle(c);
		bc.classList.toggle(c);
		a.classList.toggle(c);
		b.classList.toggle(c);
	}
}
function dragBarCursorToggle(){
	let bar = document.getElementById("dragbar");
	if(dragBar.cdir == "horizontal"){
		bar.style.cursor = "row-resize";
	} else {//vertical
		bar.style.cursor = "col-resize";
	}
}

function redir(){//toggle "horizontal" e "vertical"
	dragBar.cdir = ( dragBar.cdir == "horizontal" ? "vertical" : "horizontal"  );
	
	sidesClassToggle();
	sideBoxesRedef();
	dragBarDefDim();
	dragBarResetPos();
	dragBarCursorToggle();
}

function init(){
	dragBarInit();
	resultSize();
	redirInit();
}

document.addEventListener("readystatechange", init);

window.addEventListener("mouseup", function(){
	if(dragBar.en){
		dragBar.en = false;
		shieldOff();
	}
});
window.addEventListener("mousemove", function(){
	if(dragBar.en){
		shieldOn();
		dragBarMove();
		resultSize();
	}
});
window.addEventListener("resize", function(){
	dragBarResize();
	resultSize();
});