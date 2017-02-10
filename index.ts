import { Router } from "express"

const router = Router()


export type IsTimetoStream = "now" | "past" | "future"

export interface IcodeStream {
    format?: string;
    width?: number;
    height?: number;
    hostname?: string;
    http_port?: number;
    channel: string;
    img?: string;
    rtmp_port?: number;
    protocol?: string;
    isTime?: IsTimetoStream
    flashplayer?: string
    app?: string
    hlsapp?: string
}


export function codeStream(data: IcodeStream) {

    if (!data) {
        throw "no data";
    } else if (!data.channel) {
        throw "no channel";
    } else if (!data.hostname) {
        throw "no host data";
    }

    let mediapp = "live"
    let hlsapp = "hls"


    if (data.app) mediapp = data.app
    if (data.hlsapp) hlsapp = data.hlsapp


    let code;

    if (!data.format) data.format = "desktop";



    if (!data.width) {

        data.width = 862;
        data.height = 465;

    } else if (!data.height) {
        data.height = (1080 * data.width) / 1920;
    }



    switch (data.format) {

        case "mobile":

            if (!data.protocol) data.protocol = "http";

            if (!data.http_port) data.http_port = 80;


            if (!data.img) {
                data.img = 'https://lh6.ggpht.com/NrQdFAdPSI9-hreB4C7HNhj3yXRiW1jqOOi7eFyakIx_IA-Im0huIeYCs5jTidMT2qA=w300';
            }

            if (!data.isTime || data.isTime === "now") {
                code = '<div style="width:' + data.width + ';height:' + data.height + ';text-align:center;"><a href="http://' + data.hostname + ":" + data.http_port + '/' + hlsapp + '/' + data.channel + '.m3u8"><img style="max-width:120px" src="' + data.img + '"></a></div>';

            } else if (data.isTime === "past") {
                code = '<div style="width:' + data.width + ';height:' + data.height + ';text-align:center;"><a href="http://' + data.hostname + ":" + data.http_port + '/' + hlsapp + '/' + data.channel + '.m3u8"><img style="max-width:120px" src="' + data.img + '"></a></div>';
            } else if (data.isTime === "future") {
                code = '<div style="width:' + data.width + ';height:' + data.height + ';text-align:center;"><a href="http://' + data.hostname + ":" + data.http_port + '/' + hlsapp + '/' + data.channel + '.m3u8"><img style="max-width:120px" src="' + data.img + '"></a></div>';

            }


            break;


        default:

            if (!data.rtmp_port) data.rtmp_port = 1935;

            let flashplayer = "https://play.kernel.online/lib/StrobeMediaPlayback.swf"
            if (data.flashplayer) flashplayer = data.flashplayer


            if (!data.isTime || data.isTime === "now") {
                code = '<object width="' + data.width + '" height="' + data.height + '"> <param name="movie" value=' + flashplayer + '></param><param name="flashvars" value="src=rtmp%3A%2F%2F' + data.hostname + '%3A' + data.rtmp_port + '%2F' + mediapp + '%2F' + data.channel + '&streamType=live&scaleMode=zoom"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="direct"></param><embed src=' + flashplayer + ' type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="direct" width="' + data.width + '" height="' + data.height + '" flashvars="src=rtmp%3A%2F%2F' + data.hostname + '%3A' + data.rtmp_port + '%2F' + mediapp + '%2F' + data.channel + '&streamType=live&scaleMode=zoom"></embed></object>'

            } else if (data.isTime === "past") {
                code = '<object width="' + data.width + '" height="' + data.height + '"> <param name="movie" value="' + flashplayer + '"></param><param name="flashvars" value="src=rtmp%3A%2F%2F' + data.hostname + '%3A' + data.rtmp_port + '%2F' + mediapp + '%2F' + data.channel + '&streamType=live&scaleMode=zoom"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="direct"></param><embed src="' + flashplayer + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="direct" width="' + data.width + '" height="' + data.height + '" flashvars="src=rtmp%3A%2F%2F' + data.hostname + '%3A' + data.rtmp_port + '%2F' + mediapp + '%2F' + data.channel + '&streamType=live&scaleMode=zoom"></embed></object>'
            } else if (data.isTime === "future") {
                code = '<object width="' + data.width + '" height="' + data.height + '"> <param name="movie" value="' + flashplayer + '"></param><param name="flashvars" value="src=rtmp%3A%2F%2F' + data.hostname + '%3A' + data.rtmp_port + '%2F' + mediapp + '%2F' + data.channel + '&streamType=live&scaleMode=zoom"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="direct"></param><embed src="' + flashplayer + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="direct" width="' + data.width + '" height="' + data.height + '" flashvars="src=rtmp%3A%2F%2F' + data.hostname + '%3A' + data.rtmp_port + '%2F' + mediapp + '%2F' + data.channel + '&streamType=live&scaleMode=zoom"></embed></object>'

            }






            break;


    }


    return code;




}


export function codeToHtml(code: string) {
    return '<!DOCTYPE html><html><meta charset="utf-8"><head><style>body{margin:0px;padding:0px;overflow:hidden}</style></head><body>' + code + '</body></html>'
}

export function HtmlPage(data: IcodeStream) {
    return codeToHtml(codeStream(data))
}

router.get('/flashplayer', function (req, res) {
    res.sendFile(__dirname + "/bin/StrobeMediaPlayback.swf")
});


// define the home page route
router.get('/', function (req, res) {



    if (req.query.channel) {

        if (!req.query.flashplayer && process.env.SERVERHOST) {


            req.query.flashplayer = process.env.SERVERHOST + "/flashplayer"
        }

        if (req.query.hostname) {


            res.send(HtmlPage(req.query));
        } else if (process.env.STREAMERHOST) {

            req.query.hostname = process.env.STREAMERHOST

            if (!req.query.rtmp_port && process.env.STREAMER_RTMP_PORT) req.query.rtmp_port = process.env.STREAMER_RTMP_PORT
            if (!req.query.http_port && process.env.STREAMER_HTTP_PORT) req.query.http_port = process.env.STREAMER_HTTP_PORT
            if (!req.query.protocol && process.env.STREAMER_HTTP_PROTOCOL) req.query.protocol = process.env.STREAMER_HTTP_PROTOCOL

            res.send(HtmlPage(req.query));

        } else {


            res.send({ error: "no host provided" });

        }



    } else {


        res.send({ error: "no channel provided" });

    }


});

export const htmlpage = router