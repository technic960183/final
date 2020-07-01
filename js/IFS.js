var position = [1000, 500];
let center = [0, 0];

$(document).ready(function () {
    ChangeHTMLelement(3);
    resizeCanvas();
    center = [$('#CanvasPanel')[0].width / 2, $('#CanvasPanel')[0].height / 2];
    position = center;
});

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
        ctx.fillRect(0, 0, center[0] * 2, center[1] * 2);
        position = center;
    })
})

$(() => {
    $('#show').on('click', () => {
        let n = $('#PointNumber').val();
        var c = document.getElementById("CanvasPanel");
        var ctx = c.getContext("2d");
        for (let i = 0; i < n; i++) {
            let theta = 2 * Math.PI / n;
            let destination = [300 * Math.cos(i * theta - Math.PI / 2) + center[0], 300 * Math.sin(i * theta - Math.PI / 2) + center[1]];
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

$(() => {
    $('#PointNumber').on('change', () => {
        ChangeHTMLelement($('#PointNumber').val());
    })
})

function ChangeHTMLelement(n) {
    $('#PList').empty();
    $div = $('<div>').addClass('col');
    for (let i = 0; i < n; i++) {
        $input = $('<input>').addClass('form-control').attr('type', 'number').attr('value', 1);
        $input = $input.attr('id', 'PointP_' + i).attr('step', 0.1);
        $p = $('<p>').attr('id', 'TextP_' + i).append("第" + (i + 1) + "點權重(機率=" + Math.round(1000000 / n) / 1000000 + ")");
        $div.append($p)
        $div.append($input)
    }
    $('#PList').append($div)
    for (let i = 0; i < n; i++) {
        $('#PointP_' + i).on('change', () => { //設定計算機率事件
            var sum = 0.0;
            n = $('#PointNumber').val();
            for (let j = 0; j < n; j++) {
                sum += Number($('#PointP_' + j).val()); //要把型別轉成number才不會變成文字加法。
            }
            //console.log(sum);
            for (let j = 0; j < n; j++) {
                $('#TextP_' + j).text("第" + (j + 1) + "點權重(機率=" + Math.round(1000000 * $('#PointP_' + j).val() / sum) / 1000000 + ")");
            }
        })
    }
}

function resizeCanvas() {
    $('#CanvasPanel')[0].width = (this).innerWidth;
    $('#CanvasPanel')[0].height = (this).innerHeight;
}

function IFS(t) {
    let n = $('#PointNumber').val();
    let s = $('#MovingRate').val();
    var sum = 0.0;
    for (let j = 0; j < n; j++) {
        sum += Number($('#PointP_' + j).val());
    }
    var c = document.getElementById("CanvasPanel");
    var ctx = c.getContext("2d");
    for (let i = 0; i < t; i++) {
        let r = Math.random();
        var m = 0;
        for (let j = 0; j < n; j++) {
            m += Number($('#PointP_' + j).val()) / sum;
            if (r < m) {
                m = j;
                break;
            }
        }
        let theta = 2 * Math.PI / n;
        let destination = [300 * Math.cos(m * theta - Math.PI / 2) + center[0], 300 * Math.sin(m * theta - Math.PI / 2) + center[1]];
        position = [position[0] + (destination[0] - position[0]) * (s / 100), position[1] + (destination[1] - position[1]) * (s / 100)];
        ctx.beginPath();
        ctx.arc(position[0], position[1], 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

$(() => {
    $('#close').on('click', () => {
        $('#MainFloating').hide();
    })
})