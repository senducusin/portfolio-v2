
const express = require("express")
const compression = require('compression');
const path = require("path")
const fs = require('fs');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use("/public", express.static("public"))
app.use(express.json())
app.use(compression())

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
    },
    {
        name: "Job-Order Organizer",
        imageLink: "/public/assets/personal-projects/organizer.png",
        link: "https://github.com/senducusin/job-order-organizer-client"
    },
    {
        name: "Solar Tracker",
        imageLink: "/public/assets/personal-projects/solar.png",
        link: "https://github.com/senducusin/solar-tracker-arduino"
    },
    {
        name: "More Projects",
        imageLink: "/public/assets/personal-projects/more.png",
        link: "https://github.com/senducusin"
    }
]

const appstoreProjects = [
    {
        name: "Wave: Enterprise Inventory",
        imageLink: "/public/assets/appstore-projects/wave.png",
        link: "https://apps.apple.com/us/app/id1510087486"
    },
    {
        name: "A.I.M.S.",
        imageLink: "/public/assets/appstore-projects/aims.png",
        link: "https://apps.apple.com/us/app/id1496339487"
    },
    {
        name: "Simply RFID: Nox",
        imageLink: "/public/assets/appstore-projects/nox.png",
        link: "https://apps.apple.com/us/app/id1499461156"
    },
    {
        name: "My PC mobile (Prepaid)",
        imageLink: "/public/assets/appstore-projects/mpm.png",
        link: "https://apps.apple.com/ca/app/my-pc-mobile-prepaid/id1439611408"
    },
    {
        name: "MyBell",
        imageLink: "/public/assets/appstore-projects/mb.png",
        link: "https://apps.apple.com/ca/app/mybell/id850549838"
    },
    {
        name: "Virgin Plus My Account",
        imageLink: "/public/assets/appstore-projects/vp.png",
        link: "https://apps.apple.com/ph/app/virgin-plus-my-account/id853116586"
    },
    {
        name: "Lucky Mobile My Account",
        imageLink: "/public/assets/appstore-projects/lm.png",
        link: "https://apps.apple.com/ca/app/lucky-mobile-my-account/id1459173378"
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
