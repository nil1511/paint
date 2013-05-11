$(function () {
    var x1, y1, x2, y2l, d = 4;
    var img;
    var canvasid = document.getElementById("paint");
    var can = $("canvas")[0].getContext("2d");
    var local = window.localStorage;
    $("button").click(function (e) {
        //console.log(e.currentTarget.textContent);
        switch (e.currentTarget.textContent) {
        case "Line":
            {
                d = 0;
                break;
            }
        case "Rect":
            {
                d = 1;
                break;
            }
        case "Circle":
            {
                d = 2;
                break;
            }
        case "Square":
            {
                d = 3;
                break;
            }
        case "Pen":
            {
                d = 4;
                break;
            }
        case "Save":
            {
                img = canvasid.toDataURL();
                var name = prompt("Give a name to the file", "file");
                local.setItem(name, img);
                break;
            }
        case "Clear":
            {
                can.clearRect(0, 0, canvasid.width, canvasid.height);
                break;
            }
        case "Open":
            {
                can.clearRect(0, 0, canvasid.width, canvasid.height);
				var name = prompt("File to open", "file");
				var o = new Image();
				o.src =local.getItem(name);
				can.drawImage(o,0, 0);
                break;
            }
		case "Delete All":
			{
			local.clear();
			}
        }
    });
    $("#paint").mousedown(function (e) {
        x1 = e.pageX - this.offsetLeft;
        y1 = e.pageY - this.offsetTop;
        can.beginPath();
        can.moveTo(x1, y1);
    });
    $("#paint").mousemove(function (e) {
        if (d == 4 && e.which) {
            x2 = e.pageX - this.offsetLeft;
            y2 = e.pageY - this.offsetTop;
            can.lineTo(x2, y2);
            can.stroke();
        }
    });
    $("#paint").mouseup(function (e) {
        if (d == 4) return;
        x2 = e.pageX - this.offsetLeft;
        y2 = e.pageY - this.offsetTop;
        switch (d) {
        case 0:
            {
                can.lineTo(x2, y2);
                break;
            }
        case 1:
            {
                can.rect(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1));
                break;
            }
        case 2:
            {
                var r = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
                r = Math.sqrt(r);
                can.arc(x1, y1, r, 0, 2 * Math.PI, true);
                break;
            }
        case 3:
            {
                can.rect(x1, y1, Math.abs(x2 - x1), Math.abs(x2 - x1));
                break;
            }
        }
        can.stroke();
    });
});