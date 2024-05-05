function resizeCanvas() {
    const canvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Your drawing code here
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "orange";
    ctx.fillRect(10, 10, 150, 100);
}

// Add event listeners to resize the canvas appropriately
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
