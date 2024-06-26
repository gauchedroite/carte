const body_style = getComputedStyle(document.body);
const canvas_width = body_style.getPropertyValue('--canvas-width').replace("px", "");
const canvas_height = body_style.getPropertyValue('--canvas-height').replace("px", "");
export class MyCroquis {
    constructor() {
        this.initialized = false;
    }
    initialize() {
        if (this.initialized)
            return;
        const crayon = document.getElementById("menu_center");
        crayon.addEventListener("click", function (event) {
            const paquets_menu = document.querySelector(".left-tools");
            paquets_menu === null || paquets_menu === void 0 ? void 0 : paquets_menu.classList.toggle("opened");
        });
    }
    brushImagePointerDown(image, isDefaultBrush) {
        currentBrush = image;
        brush.setImage(isDefaultBrush ? null : image);
        this.updatePointer(isDefaultBrush);
    }
    updatePointer(isDefaultBrush) {
        if (pointerEventsNone) {
            var image = currentBrush;
            var threshold;
            if (isDefaultBrush) {
                image = null;
                threshold = 0xff;
            }
            else {
                threshold = 0x30;
            }
            // var brushPointer = Croquis.createBrushPointer(image, brush.getSize(), brush.getAngle(), threshold, true);
            // brushPointer.style.setProperty('margin-left', '-' + (brushPointer.width * 0.5) + 'px');
            // brushPointer.style.setProperty('margin-top', '-' + (brushPointer.height * 0.5) + 'px');
            // brushPointerContainer.innerHTML = '';
            // brushPointerContainer.appendChild(brushPointer);
        }
    }
    updateColor(rgb) {
        brush.setColor(rgb);
    }
    updateSize(px) {
        brush.setSize(px);
    }
    updateOpacity(alpha) {
        croquis.setPaintingOpacity(alpha);
    }
    undo() {
        croquis.undo();
    }
    redo() {
        croquis.redo();
    }
    eraseSurface() {
        croquis.fillLayer("white");
    }
}
export const myCroquis = new MyCroquis();
// https://labs.crosspop.in/Croquispop/croquispop.html
// Initialize croquis
const croquis = new Croquis();
croquis.lockHistory();
croquis.setCanvasSize(canvas_width, canvas_height);
croquis.addLayer();
croquis.fillLayer('#fff');
croquis.addLayer();
croquis.addLayer();
croquis.selectLayer(1);
croquis.unlockHistory();
var brush = new Croquis.Brush();
brush.setSize(23);
brush.setColor('#000');
brush.setSpacing(0.2);
croquis.setTool(brush);
croquis.setToolStabilizeLevel(10);
croquis.setToolStabilizeWeight(0.1); //(0.5);
var croquisDOMElement = croquis.getDOMElement();
var canvasArea = document.getElementById('canvas_surface');
canvasArea.appendChild(croquisDOMElement);
function canvasPointerDown(e) {
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    if (pointerEventsNone)
        canvasArea.style.setProperty('cursor', 'none');
    if (e.pointerType === "pen" && e.button == 5)
        croquis.setPaintingKnockout(true);
    croquis.down(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
    document.addEventListener('pointermove', canvasPointerMove);
    document.addEventListener('pointerup', canvasPointerUp);
}
function canvasPointerMove(e) {
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    croquis.move(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
}
function canvasPointerUp(e) {
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    if (pointerEventsNone)
        canvasArea.style.setProperty('cursor', 'crosshair');
    croquis.up(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
    if (e.pointerType === "pen" && e.button == 5)
        setTimeout(function () { croquis.setPaintingKnockout(false /*selectEraserCheckbox.checked*/); }, 30); //timeout should be longer than 20 (knockoutTickInterval in Croquis)
    document.removeEventListener('pointermove', canvasPointerMove);
    document.removeEventListener('pointerup', canvasPointerUp);
}
function getRelativePosition(absoluteX, absoluteY) {
    var rect = croquisDOMElement.getBoundingClientRect();
    return { x: absoluteX - rect.left, y: absoluteY - rect.top };
}
croquisDOMElement.addEventListener('pointerdown', canvasPointerDown);
//brush images
var circleBrush = document.getElementById('circle-brush');
var brushImages = document.getElementsByClassName('brush-image');
var currentBrush = circleBrush;
Array.prototype.map.call(brushImages, function (brush) {
    brush.addEventListener('pointerdown', brushImagePointerDown);
});
function brushImagePointerDown(e) {
    var image = e.currentTarget;
    currentBrush.className = 'brush-image';
    image.className = 'brush-image on';
    currentBrush = image;
    if (image == circleBrush)
        image = null;
    brush.setImage(image);
    updatePointer();
}
// checking pointer-events property support
var pointerEventsNone = document.documentElement.style.pointerEvents !== undefined;
//brush pointer
//var brushPointerContainer = document.createElement('div')!;
//brushPointerContainer.className = 'brush-pointer';
// if (pointerEventsNone) {
//     croquisDOMElement.addEventListener('pointerover', function () {
//         croquisDOMElement.addEventListener('pointermove', croquisPointerMove);
//         document.body.appendChild(brushPointerContainer);
//     });
//     croquisDOMElement.addEventListener('pointerout', function () {
//         croquisDOMElement.removeEventListener('pointermove', croquisPointerMove);
//         brushPointerContainer.parentElement!.removeChild(brushPointerContainer);
//     });
// }
// function croquisPointerMove(e: any) {
//     if (pointerEventsNone) {
//         var x = e.clientX + window.pageXOffset;
//         var y = e.clientY + window.pageYOffset;
//         brushPointerContainer.style.setProperty('left', x + 'px');
//         brushPointerContainer.style.setProperty('top', y + 'px');
//     }
// }
function updatePointer() {
    if (pointerEventsNone) {
        var image = currentBrush;
        var threshold;
        if (currentBrush == circleBrush) {
            image = null;
            threshold = 0xff;
        }
        else {
            threshold = 0x30;
        }
        // var brushPointer = Croquis.createBrushPointer(image, brush.getSize(), brush.getAngle(), threshold, true);
        // brushPointer.style.setProperty('margin-left', '-' + (brushPointer.width * 0.5) + 'px');
        // brushPointer.style.setProperty('margin-top', '-' + (brushPointer.height * 0.5) + 'px');
        // brushPointerContainer.innerHTML = '';
        // brushPointerContainer.appendChild(brushPointer);
    }
}
updatePointer();
function setPointerEvent(e) {
    if (e.pointerType !== "pen" && Croquis.Tablet.pen() && Croquis.Tablet.pen().pointerType) { //it says it's not a pen but it might be a wacom pen
        e.pointerType = "pen";
        e.pressure = Croquis.Tablet.pressure();
        if (Croquis.Tablet.isEraser()) {
            Object.defineProperties(e, {
                "button": { value: 5 },
                "buttons": { value: 32 }
            });
        }
    }
}
/*
const kri1 = document.getElementById("kri-1")!;
const kri2 = document.getElementById("kri-2")!;

kri1.addEventListener("click", function() {
    croquis.selectLayer(1);
})

kri2.addEventListener("click", function() {
    croquis.selectLayer(2);
})



async function uploadCanvasData(url: string, canvas: HTMLCanvasElement) {
    const imageDataUrl = canvas.toDataURL("image/png");
    const body = JSON.stringify({ image: imageDataUrl });

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text(); //.json(); // or `response.text()` if your server sends a text response
}

const kri_upload = document.getElementById("kri-upload")!;
kri_upload.addEventListener("click", function() {
    const canvas = croquis.getLayerCanvas(1);
    uploadCanvasData("/upload-canvas", canvas)
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
})



const kri_load = document.getElementById("kri-load")!;
kri_load.addEventListener("click", function() {
    const canvas = croquis.getLayerCanvas(1);
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };
    img.src = "/assets/layer-1.png";
})
*/ 
//# sourceMappingURL=mycroquis.js.map