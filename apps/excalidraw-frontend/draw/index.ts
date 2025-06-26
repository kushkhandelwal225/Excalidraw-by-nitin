export function initDraw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    


    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY
        console.log(clicked);
        console.log("mousedown", e.clientX, e.clientY);
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log(clicked);
        console.log("mouseup", e.clientX, e.clientY);
    });
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeRect(startX, startY, width, height);
            console.log(e.clientX);
            console.log(e.clientY);
        }

    })
}