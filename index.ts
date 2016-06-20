export = function codeStream(data: {
    format?: string;
    width?: number;
    height?: number;
    host?: string;
    hostname?: string;
    port?: number;
    channel: string;
    img?: string;
}) {

    if (!data) {
        throw Error("no data");
    } else if (!data.channel) {
        throw Error("no channel");
    } else {
        if (data.host) {
            data.port = parseInt(data.host.split(":")[0]);
            data.hostname = data.host.split(":")[1];
        } else if (data.hostname && data.port) {
            data.host = data.hostname + ":" + data.port;
        } else {
            throw Error("no host data");
        }
    }

    let code;

    if (!data.format) data.format = "desktop";

    switch (data.format) {

        case "mobile":

            if (!data.width || !data.height) {

                data.width = 862;
                data.height = 465;
                if (!data.img) {
                    data.img = 'https://lh6.ggpht.com/NrQdFAdPSI9-hreB4C7HNhj3yXRiW1jqOOi7eFyakIx_IA-Im0huIeYCs5jTidMT2qA=w300';
                }
            }


            code = '<div style="width:' + data.width + ';height:' + data.height + ';text-align:center;"><a href="http://' + data.host + '/hls/' + data.channel + '.m3u8"><img src="' + data.img + '"></a></div>';

            break;


        default:

            if (!data.width || !data.height) {

                data.width = 862;
                data.height = 465;

                code = '<object width="' + data.width + '" height="' + data.height + '"><param name="movie" value="http://fpdownload.adobe.com/strobe/FlashMediaPlayback.swf"></param><param name="flashvars" value="src=rtmp%3A%2F%2F' + data.hostname + '%2Flive%2F' + data.channel + '&scaleMode=zoom"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://fpdownload.adobe.com/strobe/FlashMediaPlayback.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + data.width + '" height="' + data.height + '" flashvars="src=rtmp%3A%2F%2F' + data.hostname + '%2Flive%2F' + data.channel + '&scaleMode=zoom"></embed></object>'


            }



            break;


    }


    return code;




}