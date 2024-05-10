"use strict";
// Initialize croquis
var croquis = new Croquis();
croquis.lockHistory();
croquis.setCanvasSize(640, 480);
croquis.addLayer();
croquis.fillLayer('#fff');
croquis.addLayer();
croquis.addLayer();
croquis.selectLayer(1);
croquis.unlockHistory();
var brush = new Croquis.Brush();
brush.setSize(40);
brush.setColor('#000');
brush.setSpacing(0.2);
croquis.setTool(brush);
croquis.setToolStabilizeLevel(10);
croquis.setToolStabilizeWeight(0.5);
var croquisDOMElement = croquis.getDOMElement();
var canvasArea = document.getElementById('canvas-area');
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
var brushPointerContainer = document.createElement('div');
brushPointerContainer.className = 'brush-pointer';
if (pointerEventsNone) {
    croquisDOMElement.addEventListener('pointerover', function () {
        croquisDOMElement.addEventListener('pointermove', croquisPointerMove);
        document.body.appendChild(brushPointerContainer);
    });
    croquisDOMElement.addEventListener('pointerout', function () {
        croquisDOMElement.removeEventListener('pointermove', croquisPointerMove);
        brushPointerContainer.parentElement.removeChild(brushPointerContainer);
    });
}
function croquisPointerMove(e) {
    if (pointerEventsNone) {
        var x = e.clientX + window.pageXOffset;
        var y = e.clientY + window.pageYOffset;
        brushPointerContainer.style.setProperty('left', x + 'px');
        brushPointerContainer.style.setProperty('top', y + 'px');
    }
}
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
        var brushPointer = Croquis.createBrushPointer(image, brush.getSize(), brush.getAngle(), threshold, true);
        brushPointer.style.setProperty('margin-left', '-' + (brushPointer.width * 0.5) + 'px');
        brushPointer.style.setProperty('margin-top', '-' + (brushPointer.height * 0.5) + 'px');
        brushPointerContainer.innerHTML = '';
        brushPointerContainer.appendChild(brushPointer);
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
const kri1 = document.getElementById("kri-1");
const kri2 = document.getElementById("kri-2");
kri1.addEventListener("click", function () {
    croquis.selectLayer(1);
});
kri2.addEventListener("click", function () {
    croquis.selectLayer(2);
});
//# sourceMappingURL=mycroquis.js.map