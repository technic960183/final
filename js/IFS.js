var position = [1000, 500];

$(() => {
    $('#step-e0').on('click', () => {
        IFS(1);
    })
})

$(() => {
    $('#step-e1').on('click', () => {
        IFS(10);
    })
})

$(() => {
    $('#step-e2').on('click', () => {
        IFS(100);
    })
})

$(() => {
    $('#step-e3').on('click', () => {
        IFS(1000);
    })
})

$(() => {
    $('#clear').on('click', () => {
        var c = document.getElementById("CanvasPanel");
        var ctx = c.getContext("2d");
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 2000, 1000);
        position = [1000, 500];
    })
})

$(() => {
    $('#show').on('click', () => {
        let n = $('#PointNumber').val();
        var c = document.getElementById("CanvasPanel");
        var ctx = c.getContext("2d");
        for (let i = 0; i < n; i++) {
            let theta = 2 * Math.PI / n;
            let destination = [400 * Math.cos(i * theta - Math.PI / 2) + 1000, 400 * Math.sin(i * theta - Math.PI / 2) + 500];
            ctx.beginPath();
            ctx.arc(destination[0], destination[1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(1000, 500, 1, 0, 2 * Math.PI);
        ctx.stroke();
    })
})



function IFS(t) {
    let n = $('#PointNumber').val();
    let s = $('#MovingRate').val();
    var c = document.getElementById("CanvasPanel");
    var ctx = c.getContext("2d");
    for (let i = 0; i < t; i++) {
        var m = RandomInt(1, n)
        let theta = 2 * Math.PI / n;
        let destination = [400 * Math.cos(m * theta - Math.PI / 2) + 1000, 400 * Math.sin(m * theta - Math.PI / 2) + 500];
        position = [position[0] + (destination[0] - position[0]) * (s / 100), position[1] + (destination[1] - position[1]) * (s / 100)];
        ctx.beginPath();
        ctx.arc(position[0], position[1], 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
}