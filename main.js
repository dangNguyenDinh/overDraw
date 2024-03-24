
//Thêm link style vào html
var style = document.createElement("style");
style.innerHTML = `
#board{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    z-index :100000;
    border: 5px solid black;
    box-sizing: border-box;
}
#canvas{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: rgba(0,0,0,0.05);
    z-index :100000;
    border: 5px solid black;
    box-sizing: border-box;
}
#drawState{
    position: fixed;
    top: 10vh;
    left: 10vw;
    z-index: 999999;
}
#drawState:hover{
    background-color: white;
}
`
document.querySelector("body").appendChild(style);

//thêm bảng vẽ vào trang
var board = document.createElement("div");
board.id = "board";
//thêm nút vẽ/xoá state
var state = document.createElement("button");
state.id = "drawState";
state.innerText = "RED";
var action = ()=>{
    if(drawState){
        drawState = false;
        state.innerText = "BLACK";
    }else{
        drawState = true;
        state.innerText = "RED";
    }
}
board.appendChild(state);
//trong thẻ div lớn có một thẻ canvas để vẽ lên
var canvas = document.createElement("canvas");
canvas.id = "canvas";
board.appendChild(canvas);
var ctx = canvas.getContext("2d");

// Định nghĩa hàm để đổi màu điểm tại toạ độ (x, y)
function draw(x, y, radius, color){
    
    //set thuộc tính
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    // Bắt đầu một hình tròn mới
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function draw2(x, y){
    //lấy dữ liệu màu từ canvas
    var imageData = ctx.getImageData(x, y, canvas.width, canvas.height);
    var data = imageData.data;
    //thay đổi toạ độ của nó
    data[0] = 0; //red
    data[1] = 0; //green
    data[2] = 0; //blue
    data[3] = 255; //opacity
    ctx.putImageData(imageData, x, y);
}

function draw3(x, y){
    ctx.moveTo(x, y);
    ctx.lineTo(x-1, y-1);
    ctx.stroke();
}

function draw4(x, y, color){
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = "3px";
    div.style.height = "3px";
    div.style.top = y - 6 + "px";
    div.style.left = x - 6 + "px";
    div.style.backgroundColor = color;
    div.style.borderRadius = "50%";
    div.className = "path";
    div.style.zIndex = "999999";
    board.appendChild(div);
}

function delete5(x, y, color){
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.top = y - 8 + "px";
    div.style.left = x - 8 + "px";
    div.style.backgroundColor = color;
    div.className = "path";
    div.style.zIndex = "999999";
    board.appendChild(div);
}

function delete4(x, y){
    var startX = x - 100;
    var startY = y - 100;
    for(let i = startX; i < x;i++){
        for(let j = startY; j < y; j++){
            var del = document.elementFromPoint(i,j);
            console.log(del);
            if(del?.className == "path"){
                del.remove();
            }
        }
    }
}

//
function delete6(x, y){
    var startX = x - 100;
    var startY = y - 100;
    var del = document.elementFromPoint(x, y);
    del.remove();
}

//quản lý trạng thái nhấn chuột
let isMouseHoldDown = false;
//hiển thị và ẩn bảng vẽ
function popup(){
    //hiển thị board
    document.querySelector("body").appendChild(board);
    //xoá bỏ thuộc tính có thể lăn chuột khi đang vẽ
    document.querySelector("html").style.overflow = "hidden";
}
//nhận sự kiện ấn giữ hay thả
board.addEventListener("mousedown", ()=>{
    isMouseHoldDown = true;
});
board.addEventListener("mouseup", ()=>{
    isMouseHoldDown = false;
});

let drawState = true;

//vẽ hoặc xoá nếu được phép
canvas.addEventListener("mousemove", (event)=>{
    console.log(isMouseHoldDown);   
    if(isMouseHoldDown){
        //vẽ vào đầu chuột
        //draw(mouseX, mouseY, 0.1, "black");
        //draw2(mouseX, mouseY);
        //draw3(mouseX, mouseY);
        if(drawState){
            draw4(event.clientX, event.clientY, "red");
        }else{
            draw4(event.clientX, event.clientY, "black");
        }
    }
})
canvas.addEventListener("mousedown", (event)=>{
    console.log(isMouseHoldDown);   
    if(isMouseHoldDown){
        //vẽ vào đầu chuột
        //draw(mouseX, mouseY, 0.1, "black");
        //draw2(mouseX, mouseY);
        //draw3(mouseX, mouseY);
        if(drawState){
            draw4(event.clientX, event.clientY, "red");
        }else{
            draw4(event.clientX, event.clientY, "black");
        }
    }
})

function popdown(){
    board.remove();
    document.querySelector("html").style.overflow = "auto";

}

//kiểm soát phím Alt được nhấn
let controlPopUp = true;
document.addEventListener("keydown", function(event) {
    if (event.code === "Insert") {
        if(controlPopUp){
            var res = confirm("Enable board");
            if(res){
                board.appendChild(canvas);
                state.addEventListener("click", action);
                popup();
                controlPopUp = false;
            }
        }else{
            var res = confirm("Disable board");
            if(res){
                board.innerHTML = "";
                state.removeEventListener("click", action);
                popdown();
                controlPopUp = true;
            }
            
       }
    }
});




