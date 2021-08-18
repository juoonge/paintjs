const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

const INITIAL_COLOR="";
const CANVAS_SIZE=700;

// about canvas info : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

// default context
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting=false;
let filling=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){ // remember that path is a line
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{ // happening everythime when moving mouse
        console.log("creating line in ",x,y);
        ctx.lineTo(x,y); 
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    // filling=true에서 canvas를 클릭하면 canvas 전체에 색이 채워짐
    if(filling){
        filling=false;
        mode.innerText="Fill"
    }else{
        filling=true;
        mode.innerText="Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleSaveClick(){
    // canvas data -> image data
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS[JUOONGE]"; // download는 anchor("a")태그의 attribute
    link.click();
}

function handleCM(event){
    event.preventDefault() // prevent Right click
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM); // contextmenu 유용
}

Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick))
// color represent each of item in array, name? it doesn't matter

if(range){
    range.addEventListener("input",handleRangeChange);    
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}