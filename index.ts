
export interface IcodeStream {
    format?: string;
    width?: number;
    height?: number;
    hostname?: string;
    http_port?: number;
    channel: string;
    img?: string;
    rtmp_port?: number;
    rtmp_hostname?: string;
    http_hostname?: string;
    protocol?: string;
}


export function codeStream(data: IcodeStream) {

    if (!data) {
        throw "no data";
    } else if (!data.channel) {
        throw "no channel";
    } else if (!data.hostname && !data.rtmp_hostname && !data.http_hostname) {
        throw "no host data";
    }

    let code;

    if (!data.format) data.format = "desktop";

    switch (data.format) {

        case "mobile":

            if (!data.protocol) data.protocol = "http";

            if (!data.http_port) data.http_port = 80;

            if (!data.http_hostname && data.hostname) data.http_hostname = data.hostname;

            if (!data.width ) {

                data.width = 862;
                data.height = 465;

            } else if(!data.height){
                data.height = (1080*data.width)/1920;
            }

            if (!data.img) {
                data.img = 'https://lh6.ggpht.com/NrQdFAdPSI9-hreB4C7HNhj3yXRiW1jqOOi7eFyakIx_IA-Im0huIeYCs5jTidMT2qA=w300';
            }
            code = '<div style="width:' + data.width + ';height:' + data.height + ';text-align:center;"><a href="http://' + data.http_hostname + ":" + data.http_port + '/hls/' + data.channel + '.m3u8"><img style="max-width:120px" src="' + data.img + '"></a></div>';

            break;


        default:

            if (!data.rtmp_port) data.rtmp_port = 1935;

            if (!data.rtmp_hostname && data.hostname) data.rtmp_hostname = data.hostname;

            if (!data.width ) {

                data.width = 862;
                data.height = 465;

            } else if(!data.height){
                data.height = (1080*data.width)/1920;
            }

            code = '<object width="' + data.width + '" height="' + data.height + '"> <param name="movie" value="https://play.kernel.online/lib/StrobeMediaPlayback.swf"></param><param name="flashvars" value="src=rtmp%3A%2F%2F' + data.rtmp_hostname + '%3A' + data.rtmp_port + '%2Flive%2F' + data.channel + '&streamType=live&scaleMode=zoom"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="direct"></param><embed src="https://play.kernel.online/lib/StrobeMediaPlayback.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="direct" width="' + data.width + '" height="' + data.height + '" flashvars="src=rtmp%3A%2F%2F' + data.rtmp_hostname + '%3A' + data.rtmp_port + '%2Flive%2F' + data.channel + '&streamType=live&scaleMode=zoom"></embed></object>'


            break;


    }


    return code;




}