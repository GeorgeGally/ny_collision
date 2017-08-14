
var oldColour = [];
var movement = [];
var sensitivity = 15;


function strobe(_prob, _c){
	var prob = _prob || 100;
	var c = _c || 0;
	if (chance(prob)) {
   	ctx.background(c);
  }
}


function pixelate(blocksize, blockshape) {
  if (blocksize == undefined) var blocksize = 20;
    var imgData=ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {
            //var pos = (x + y * w) * 4;
            var pos = (x + y * w);
            //ctx.fillStyle = rgb(sourceBuffer8[pos], sourceBuffer8[pos+1], sourceBuffer8[pos+2]);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
            //ctx.fillStyle = rgb(sourceBuffer32[pos], sourceBuffer32[pos+1], sourceBuffer32[pos+2]);
            ctx.fillStyle = rgb(r,g,b);
            if (blockshape == undefined || blockshape == 0) {
              ctx.fillRect(x, y, blocksize, blocksize);
            } else {
              ctx.fillEllipse(x, y, blocksize, blocksize);
            };

        }
    }
}


function colourArray(blocksize, alpha) {

  if (blocksize == undefined) var blocksize = 20;
  if (alpha == undefined) var alpha = 0.5;
    var imgData=hidden_ctx.getImageData(0,0,w,h);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i = 0;
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {

            var pos = (x + y * w);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;

            if(Math.abs(r - oldColour[i])>sensitivity) {
                movement[i] = rgba(r, g, b, alpha);
            } else {
                movement[i] = 0;
            }

            oldColour[i] = r;
            i++;

        }
    }
    return movement;
}


function lineFx(blocksize, blockshape, ww) {
  if (blocksize == undefined) var blocksize = 4;
    var imgData = ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {
            //var pos = (x + y * w) * 4;
            var pos = (x + y * w);
            //ctx.fillStyle = rgb(sourceBuffer8[pos], sourceBuffer8[pos+1], sourceBuffer8[pos+2]);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
            ctx.lineWidth = 1;
            ctx.strokeStyle = rgba(r,g,b, 0.8);
            if (blockshape == undefined || blockshape == 0) {
                if (ww == undefined || ww == 0) {
                    ww = random(145,295);
                }


             for (var i = 5 - 1; i >= 0; i--) {
                 drawline(x,y, ww);
             };

              //ctx.fillRect(x, y, blocksize, blocksize);
            } else {
                for (var i = 5 - 1; i >= 0; i--) {
                    ww = random(45,195);
                 drawCirc(x,y, ww, r,g,b);
             };

            }


        }
    }
}

function drawCirc(x,y, ww, r,g,b){

    x += random(-8,8);
    y += random(-8,8);
    if ( r!=182 && g!=213 && b !=255) {
    	ctx.fillStyle = rgba(r,g,b, 0.4);
      ww = random(20, 50);
      ctx.fillEllipse(x, y, ww, ww);
		}
}



 function drawText (_options){
	if (_options.background === undefined) _options.background = "none";

	options = {
		fontSize: 	_options.fontSize 	|| 20,
		blockSize: 	_options.blockSize 	|| 12,
		background: _options.background,
		colourType: _options.colourType || "all"
	}

	//console.log(options);

  	this.font= options.fontSize + "px Courier";

    var col = [];
    var j = 0;

    var imgData= this.getImageData(0,0,w,h);

    for(var x = 0; x < w; x += options.blockSize) {

        for(var y = 0; y < h; y += options.blockSize) {

            var pos = (x + y * w);
            var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
						// var brt = brightness(r, g, b, 100);

						if (options.colourType == "red") {
							var c = rgb(r, 0, 0);
						} else if (options.colourType == "green") {
							var c = rgb(0, r, 0);
						} else if (options.colourType == "blue") {
							var c = rgb(0, 0, r);
						} else {
							c = rgb(r,g,b);
						}
						col.push(c);
						//console.log(c);
        }

    }

		//console.log(col);

		if (options.background == "none") {
			ctx.background(250);
		} else {
			ctx.background(options.background);
		}


    var j = 0;
    for(var x = 0; x < w; x += options.blockSize) {

				for(var y = 0; y < h; y += options.blockSize) {

            this.fillStyle = col[j];
            this.fillText("*", x, y);
            j++;
        }
    }

}

function drawline(x,y, ww){
    var rr = random(360);
    x2 = x + random(-4,4);
    y2 = y + random(-4,4);
    ctx.translate(x2,y2);
    ctx.rotate(radians(rr));
    ctx.line(0-ww, 0-ww, 0+ww, 0+ww);
    ctx.rotate(radians(-rr));
    ctx.translate(-x2,-y2);
}

var motionArray = function(blocksize, blockshape) {
  if (blocksize == undefined) var blocksize = 20;
    var imgData=ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i = 0;
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {
            var pos = (x + y * w);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;

            if(Math.abs(r - oldColour[i])>sensitivity) {
                //movement[i]= 1;
                ctx.fillStyle = "red";
                ctx.fillEllipse(x,y, blocksize-2,blocksize-2);
            } else {
                movement[i] = 0;
            }

            oldColour[i] = r;
            i++;

        }
    }
}



function reverseUint32 (uint32) {
    var s32 = new Uint32Array(4);
    var s8 = new Uint8Array(s32.buffer);
    var t32 = new Uint32Array(4);
    var t8 = new Uint8Array(t32.buffer);
    reverseUint32 = function (x) {
        s32[0] = x;
        t8[0] = s8[3];
        t8[1] = s8[2];
        t8[2] = s8[1];
        t8[3] = s8[0];
        return t32[0];
    }
    return reverseUint32(uint32);
};
