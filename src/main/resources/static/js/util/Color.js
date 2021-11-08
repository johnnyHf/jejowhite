const Color = (function () {
    function toHex(num, padding) { return num.toString(16).padStart(padding || 2); }
    function parsePart(value) {
        var perc = value.lastIndexOf('%');
        return perc < 0 ? value : value.substr(0, perc);
    }
    function Color(data) {
        if (arguments.length > 1) {
            this[0] = arguments[0];
            this[1] = arguments[1];
            this[2] = arguments[2];
            if (arguments.length > 3) { this[3] = arguments[3]; }
        } else if (data instanceof Color || Array.isArray(data)) {
            this[0] = data[0];
            this[1] = data[1];
            this[2] = data[2];
            this[3] = data[3];
        } else if (typeof data === 'string') {
            data = data.trim();
            if (data[0] === "#") {
                switch (data.length) {
                    case 4:
                        this[0] = parseInt(data[1], 16); this[0] = (this[0] << 4) | this[0];
                        this[1] = parseInt(data[2], 16); this[1] = (this[1] << 4) | this[1];
                        this[2] = parseInt(data[3], 16); this[2] = (this[2] << 4) | this[2];
                        break;
                    case 9:
                        this[3] = parseInt(data.substr(7, 2), 16);
                    //Fall Through
                    case 7:
                        this[0] = parseInt(data.substr(1, 2), 16);
                        this[1] = parseInt(data.substr(3, 2), 16);
                        this[2] = parseInt(data.substr(5, 2), 16);
                        break;
                }
            } else if (data.startsWith("rgb")) {
                var parts = data.substr(data[3] === "a" ? 5 : 4, data.length - (data[3] === "a" ? 6 : 5)).split(',');
                this.r = parsePart(parts[0]);
                this.g = parsePart(parts[1]);
                this.b = parsePart(parts[2]);
                if (parts.length > 3) { this.a = parsePart(parts[3]); }
            }
        }
    }
    Color.prototype = {
        constructor: Color,
        0: 255,
        1: 255,
        2: 255,
        3: 255,
        get r() { return this[0]; },
        set r(value) { this[0] = value == null ? 0 : Math.max(Math.min(parseInt(value), 255), 0); },
        get g() { return this[1]; },
        set g(value) { this[1] = value == null ? 0 : Math.max(Math.min(parseInt(value), 255), 0); },
        get b() { return this[2]; },
        set b(value) { this[2] = value == null ? 0 : Math.max(Math.min(parseInt(value), 255), 0); },
        get a() { return this[3] / 255; },
        set a(value) { this[3] = value == null ? 255 : Math.max(Math.min(value > 1 ? value : parseFloat(value) * 255, 255), 0); },
        get luma() { return .299 * this.r + .587 * this.g + .114 * this.b; },
        get inverted() { return new Color(255 - this[0], 255 - this[1], 255 - this[2], this[3]); },
        get inverse() { return "rgb(" + (255 - this[0]) + "," + (255 - this[1]) + "," + (255 - this[1]) + ")"},
        toString: function (option) {
            if (option === 16) {
                return '#' + toHex(this.r) + toHex(this.g) + toHex(this.b) + (this[3] === 255 ? '' : toHex(this[3]));
            } else if (option === '%') {
                if (this.a !== 1) {
                    return `rgba(${this.r / 255 * 100}%, ${this.b / 255 * 100}%, ${this.g / 255 * 100}%, ${this.a / 255})`;
                } else {
                    return `rgb(${this.r / 255 * 100}%, ${this.b / 255 * 100}%, ${this.g / 255 * 100})%`;
                }
            } else {
                if (this.a !== 1) {
                    return `rgba(${this.r}, ${this.b}, ${this.g}, ${this.a})`;
                } else {
                    return `rgb(${this.r}, ${this.b}, ${this.g})`;
                }
            }
        }
    };
    return Color;
}());

function isSimilarColor(sHexColorA,sHexColorB,nOffset){
    var offsetNum = Math.abs(nOffset);
    offsetNum > 255 ? (offsetNum=offsetNum-256) : 0;
    var arrNumA=[parseInt(sHexColorA.substring(0,2),16),
        parseInt(sHexColorA.substring(2,4),16),
        parseInt(sHexColorA.substring(4,6),16)];
    var arrNumB=[parseInt(sHexColorB.substring(0,2),16),
        parseInt(sHexColorB.substring(2,4),16),
        parseInt(sHexColorB.substring(4,6),16)];

    var arr = [arrNumA[0]-arrNumB[0],arrNumA[1]-arrNumB[1],arrNumA[2]-arrNumB[2]];
    arr = [arr[0]*arr[0],arr[1]*arr[1],arr[2]*arr[2]];
    var v = Math.sqrt(arr[0] + arr[1] + arr[2]) / Math.sqrt(255*255*3);
    return v <= offsetNum;
}

function digit2Hex(num){
    num = "0x0" + parseInt(num).toString(16);
    var len = num.length;
    return num.substring(len-2,len);
}

function rgb2Hex(color){
    if(color.startsWith("rgb")){
        var arr = color.replace("rgb","").replace("(","").replace(")","").split(",");
        var r = digit2Hex(arr[0]);
        var g = digit2Hex(arr[1]);
        var b = digit2Hex(arr[2]);
        return r + g + b;
    }else if (color.startsWith("#")){
        color = color.substring(1);
        if(color.length === 3){
            var c1 = color.substring(0,1);
            var c2 = color.substring(1,2);
            var c3 = color.substring(2,3);
            color = c1+c1+c2+c2+c3+c3;
        }
    }
    return color;
}

function getReverseColorAgainstTheme(color1, color2, similar){
    var color2Hex = rgb2Hex(color1);
    if(isSimilarColor(rgb2Hex(color2), color2Hex, similar)){
        return new Color("#"+color2Hex).inverse;
    }else{
        return "#"+color2Hex;
    }
}