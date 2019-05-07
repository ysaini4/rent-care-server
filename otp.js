var http = require("http");

var options = {
  method: "POST",
  hostname: "control.msg91.com",
  port: null,
  path:
    "/api/sendotp.php?otp_length=&authkey=&message=&sender=&mobile=&otp=&email=&otp_expiry=&template=",
  headers: {}
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
