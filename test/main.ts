import * as express from "express"

import * as superagent from "superagent"


import { expect } from "chai"


import { htmlpage } from "../index"

const port = 3500

const baseurl = 'http://localhost:' + port + '/'


const baseplayer = {
  channel: 'test0',
  hostname: 'streamer.kernel.online'
}



before(function (done) {


  const app = express();

  app.use('/', htmlpage);


  app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
  });


  done()
})



describe("test player", function () {

  it("return no channel if no channel", function (done) {

    superagent
      .get(baseurl)
      .query({}) // query string
      .end(function (err, res) {

        if (err) {
          done(err)
        } else {

          expect(res.body.error).to.eql("no channel provided")
          done()
        }


      });

  })


  it("return no host if no host", function (done) {

    superagent
      .get(baseurl)
      .query({ channel: "dd" }) // query string
      .end(function (err, res) {

        if (err) {
          done(err)
        } else {

          expect(res.body.error).to.eql("no host provided")
          done()
        }


      });

  })



  it("test basic player", function (done) {

    superagent
      .get(baseurl)
      .query(baseplayer) // query string
      .end(function (err, res) {

        if (err) {
          done(err)
        } else {

          expect(res.body.error).to.not.be.ok

          expect(res.text.split("StrobeMediaPlayback"[1])).to.be.ok

          done()
        }


      });

  })


})