const nodemailer = require("nodemailer");

function sendEmail(email,uniqueString) {
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.email",
    service: "gmail",
    secure: true,
    auth: {
      user: "creativitaeh8@gmail.com",
      pass: "umagboqwwaxhfnna",
    },
    debug: true,
    logger: true,
  });

  const option = {
    from: "creativitaeh8@gmail.com",
    to: email,
    subject: "Acount Success Create",
    text: "Your Account has been create in web Rifold ",
    html: `<center>
    <img src="https://ik.imagekit.io/ftti7xeyu/Final/verif_img2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675837980143" width=500">
    <div style="margin-top: 30px; font-size: large;">
    Click <a href = http://localhost:3000/public/verify/${uniqueString}> here </a> to verify
    </div>
    </center>`,

  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve("success");
      console.log("sent: " + info);
    });
  });
}

module.exports = sendEmail;
