
const express = require("express")
const path = require("path")
const fs = require('fs');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use("/public", express.static("public"))
app.use(express.json())

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const personalProjects = [
    {
        name: "Cool Chat",
        imageLink: "/public/assets/personal-projects/cool-chat.png",
        link: "https://github.com/senducusin/cool-chat"
    },
    {
        name: "Seatmates",
        imageLink: "/public/assets/personal-projects/seatmates.png",
        link: "https://github.com/senducusin/seatmates"
    },
    {
        name: "TTC Routes",
        imageLink: "/public/assets/personal-projects/toronto-transit-commission.png",
        link: "https://github.com/senducusin/ttc-routes"
    },
    {
        name: "Papanam",
        imageLink: "/public/assets/personal-projects/papanam.png",
        link: "https://github.com/senducusin/papanam"
    },
    {
        name: "App News v2",
        imageLink: "/public/assets/personal-projects/news-app-v2.png",
        link: "https://github.com/senducusin/news-app"
    },
    {
        name: "Map Kit App",
        imageLink: "/public/assets/personal-projects/map-kit-app.png",
        link: "https://github.com/senducusin/map-app"
    }
]

const appstoreProjects = [
    {
        name: "Wave",
        imageLink: "/public/assets/appstore-projects/wave.png",
        link: "https://apps.apple.com/us/app/id1510087486"
    },
    {
        name: "A.I.M.S.",
        imageLink: "/public/assets/appstore-projects/AIMS.png",
        link: "https://apps.apple.com/us/app/id1496339487"
    },
    {
        name: "D.O.D. Nox",
        imageLink: "/public/assets/appstore-projects/nox.png",
        link: "https://apps.apple.com/us/app/id1499461156"
    }
]

const projects = {
    personalProjects: personalProjects,
    appstoreProjects: appstoreProjects
}

var transporter = nodemailer.createTransport({
    service: 'yahoo',
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: false,
    auth: {
        user: process.env.BOT_EMAIL,
        pass: process.env.BOT_PASSWORD
    },
    debug: false,
    logger: true
});

app.get("/", (req, res) => {

    const pageProperties = {
        nav: {
            projects: {
                css: "link-current",
                href: ""
            },
            contact: {
                css: "normal-link",
                href: "/contact"
            }
        },
        projects
    }

    res.render("index", pageProperties)
});

app.get("/contact", (req, res) => {

    const pageProperties = {
        nav: {
            projects: {
                css: "normal-link",
                href: "/"
            },
            contact: {
                css: "link-current",
                href: ""
            }
        },
        projects
    }

    res.render("contact", pageProperties)
});

app.get('/download', function (req, res) {
    const file = path.join(__dirname, "public/downloadables/Jansen_Ducusin_CV.pdf")
    res.download(file);
});

app.post('/send', function (req, res) {
    const body = req.body

    if (body.hasOwnProperty("first_name") &&
        body.hasOwnProperty("last_name") &&
        body.hasOwnProperty("message") &&
        body.hasOwnProperty("email")
    ) {
        console.log(body)

        var mailOptions = {
            from: process.env.BOT_EMAIL,
            to: process.env.BOT_EMAILRECEIVER,
            subject: `Portfolio Email from ${body.first_name} ${body.last_name}`,
            text: body.message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                res.status(200).send({
                    status: "error"
                })
            } else {
                res.status(200).send({
                    status: "ok"
                })
            }
        });
    }
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
