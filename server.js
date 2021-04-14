
const express = require("express")
const path = require("path")
var fs = require('fs');

const app = express()

app.use("/public", express.static("public"))
app.use(express.json())

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const personalProjects = [
    {
        name: "Cool Chat",
        imageLink: "/public/assets/personal-projects/cool-chat.png",
        link: "https://bitbucket.org/senducusin/cool-chat/src/main/"
    },
    {
        name: "Map Kit App",
        imageLink: "/public/assets/personal-projects/map-kit-app.png",
        link: "https://bitbucket.org/senducusin/map-kit-app/src/main/"
    },
    {
        name: "App News v2",
        imageLink: "/public/assets/personal-projects/news-app-v2.png",
        link: "https://bitbucket.org/senducusin/news-app-v2/src/main/"
    },
    {
        name: "TTC Routes",
        imageLink: "/public/assets/personal-projects/toronto-transit-commission.png",
        link: "https://bitbucket.org/senducusin/ttc-routes/src/main/"
    }
]

const appstoreProjects = [
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

app.get("/", (req, res) => {

    const pageProperties = {
        nav: {
            projects: "link-current",
            contact: "normal-link"
        },
        personalProjects: personalProjects,
        appstoreProjects: appstoreProjects
    }

    res.render("index", pageProperties)
})

app.get("/contact", (req, res) => {

    const pageProperties = {
        nav: {
            projects: "normal-link",
            contact: "link-current",
        },
        personalProjects: personalProjects,
        appstoreProjects: appstoreProjects
    }

    res.render("contact", pageProperties)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))