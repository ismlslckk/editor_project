// SETTING ALL VARIABLES

var isMouseDown = false;
var canvas = document.createElement('canvas');
var body = document.getElementsByTagName("body")[0];
var ctx = canvas.getContext('2d');
var linesArray = [];
currentSize = 5;
var currentColor = "rgb(200,20,100)";
var currentBg = "white";
var tumIslemler = [];

let ilkKezGeriAliniyor = false;

// INITIAL LAUNCH

createCanvas();

// BUTTON EVENT HANDLERS


document.getElementById('colorpicker').addEventListener('change', function () {
    currentColor = this.value;
});
document.getElementById('bgcolorpicker').addEventListener('change', function () {
    ctx.fillStyle = this.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    redraw();
    currentBg = ctx.fillStyle;
});
document.getElementById('controlSize').addEventListener('change', function () {
    currentSize = this.value;
    document.getElementById("showSize").innerHTML = this.value;
});

document.getElementById('eraser').addEventListener('click', eraser);
document.getElementById('resmiEkranaSigdir').addEventListener('click', resmiEkranaSigdir);
document.getElementById('geriAl').addEventListener('click', geriAl);

// REDRAW 

function redraw() {
    for (var i = 1; i < linesArray.length; i++) {
        ctx.beginPath();
        ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
        ctx.lineWidth = linesArray[i].size;
        ctx.lineCap = "round";
        ctx.strokeStyle = linesArray[i].color;
        ctx.lineTo(linesArray[i].x, linesArray[i].y);
        ctx.stroke();
    }
}

// DRAWING EVENT HANDLERS

canvas.addEventListener('mousedown', function () { mousedown(canvas, event); });
canvas.addEventListener('mousemove', function () { mousemove(canvas, event); });
canvas.addEventListener('mouseup', mouseup);

// CREATE CANVAS

function createCanvas(width = 800, height = 600) {
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    ctx.fillStyle = currentBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

// DOWNLOAD CANVAS

function downloadCanvas(link, canvas, filename) {
    link.href = document.getElementById(canvas).toDataURL();
    link.download = filename;
}

// SAVE FUNCTION

function save() {
    localStorage.removeItem("savedCanvas");
    localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
    console.log("Saved canvas!");
}

// LOAD FUNCTION

function load() {
    if (localStorage.getItem("savedCanvas") != null) {
        linesArray = JSON.parse(localStorage.savedCanvas);
        var lines = JSON.parse(localStorage.getItem("savedCanvas"));
        for (var i = 1; i < lines.length; i++) {
            ctx.beginPath();
            ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
            ctx.lineWidth = linesArray[i].size;
            ctx.lineCap = "round";
            ctx.strokeStyle = linesArray[i].color;
            ctx.lineTo(linesArray[i].x, linesArray[i].y);
            ctx.stroke();
        }
        console.log("Canvas loaded.");
    }
    else {
        console.log("No canvas in memory!");
    }
}

// ERASER HANDLING

function eraser() {
    currentSize = 5;
    currentColor = ctx.fillStyle
}

function resmiEkranaSigdir() {
    const img = document.getElementById("kopyalananResim");
    img.width = 800;
    img.height = 600;
    createCanvas(800, 600);
    const canvasEl = document.getElementById("canvas");
    const ctxEl = canvasEl.getContext("2d");
    ctxEl.drawImage(img, 0, 0, img.width, img.height)
}

function tumIslemlereEkle() {
    const canvasEl = document.getElementById("canvas");

    tumIslemler.push(canvasEl.toDataURL());
}

function geriAl() {

    if (tumIslemler.length === 0)
        return;

    const canvasEl = document.getElementById("canvas");

    const sonEleman = tumIslemler[tumIslemler.length - 1];
    const suankiGoruntu = canvasEl.toDataURL();

    let islem;
    if (JSON.stringify(sonEleman) == JSON.stringify(suankiGoruntu)) {
        islem = tumIslemler.pop();
        if (!!tumIslemler.length)
            islem = tumIslemler.pop();
    }
    else
        islem = tumIslemler.pop();

    kopyalananResmiCanvasaCiz(islem);
}

const removeItem = (arr, item) => {
    let newArray = [...arr];
    const index = newArray.findIndex((element) => element === item)
    if (index !== -1) {
        newArray.splice(index, 1)
        fruits = newArray;
        return newArray
    }

}

document.onpaste = function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (index in items) {
        var item = items[index];
        if (item.kind === 'file') {
            var blob = item.getAsFile();
            var reader = new FileReader();
            reader.onload = function (event) {
                kopyalananResmiCanvasaCiz(event.target.result);
            }; // data url!
            reader.readAsDataURL(blob);
        }
        else if (item.kind === "string" && item.type.match("^text/plain")) {
            item.getAsString((url) => {
                toDataUrl(url, function(myBase64) {
                    kopyalananResmiCanvasaCiz(myBase64);
                });
            });
          } 
    }
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function kopyalananResmiCanvasaCiz(data) {
    const img = document.getElementById("kopyalananResim");
    img.src = data;
    img.onload = function () {
        createCanvas(img.width, img.height);
        const canvasEl = document.getElementById("canvas");
        const ctxEl = canvasEl.getContext("2d");

        ctxEl.drawImage(img, 0, 0, img.width, img.height)

        if (tumIslemler.length == 0)
            tumIslemlereEkle();
    };
}

// GET MOUSE POSITION

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// ON MOUSE DOWN

function mousedown(canvas, evt) {
    var mousePos = getMousePos(canvas, evt);
    isMouseDown = true
    var currentPosition = getMousePos(canvas, evt);
    ctx.moveTo(currentPosition.x, currentPosition.y)
    ctx.beginPath();
    ctx.lineWidth = currentSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

}

// ON MOUSE MOVE

function mousemove(canvas, evt) {

    if (isMouseDown) {
        var currentPosition = getMousePos(canvas, evt);
        ctx.lineTo(currentPosition.x, currentPosition.y)
        ctx.stroke();
        store(currentPosition.x, currentPosition.y, currentSize, currentColor);
    }
}

// STORE DATA

function store(x, y, s, c) {
    var line = {
        "x": x,
        "y": y,
        "size": s,
        "color": c
    }
    linesArray.push(line);
}

// ON MOUSE UP

function mouseup() {
    isMouseDown = false
    store()
    tumIslemlereEkle();

}


setTimeout(initialCanvas, 250);

function initialCanvas() {
    createCanvas();
    redraw();
    tumIslemlereEkle();
}

