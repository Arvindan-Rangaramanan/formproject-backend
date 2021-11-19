const express = require("express");
const cors=require("cors")
const app = express()
app.use(cors())
app.use(express.json())

const nodemailer = require("nodemailer");

app.post("/user", function (req, res, ){

  console.log("REQ BODY", req.body)

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nyxtest123@gmail.com",
      pass: "testpassword123?!",
    },
});

//user: process.env.EMAIL,
//pass: process.env.PASSWORD,

  const mailOptions = {
    from: "nyxtest123@gmail.com",
    to: req.body.email,
    subject: `Thank you ${req.body.name} for contacting us`,
    html: `
    <div>
        <h4> Hello <p>${req.body.name}</p> 
        </h4>
    <p> We got your details. We'll get back to you as soon as possible. </p>
    <br/>

    <p>Thank you</p></div>`
    ,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(401).send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({message: "Rab ne bana di jodi"});
    }
  });
}
)

app.listen(5000 , () => {console.log("App is running")})
