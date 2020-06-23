var position = [0, 0];

$(() => {
    $('#step-e0').on('click', () => {
        /*let n = +$('#PointNumber').val()
        let result = []
        for (let i = 0; i < n; i++) {
            let r = RandomInt(1, 49)
            result.push(r)
        }
        $('#outputRandom').val(result.join(', '))*/
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

function IFS(t) {
    let n = +$('#PointNumber').val()
    var c = document.getElementById("CanvasPanel");
    var ctx = c.getContext("2d");
    for (let i = 0; i < t; i++) {
        var m = RandomInt(1, n)
        let theta = 2 * Math.PI / n;
        let destination = [400 * Math.cos(m * theta - Math.PI / 2) + 1000, 400 * Math.sin(m * theta - Math.PI / 2) + 500];
        position = [(position[0] + destination[0]) / 2, (position[1] + destination[1]) / 2];
        ctx.beginPath();
        ctx.arc(position[0], position[1], 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
}