require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");
const path = require("path");
const bodyParser = require("body-parser");
const Bundler = require("parcel-bundler");

const twilio = require("twilio");
const port = 3001;

const app = express();

const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET
} = process.env;

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

app.use(json());
app.use(cors());

// USED FOR SERVING PRODUCTION FILES!!!!!
app.use(express.static(`${__dirname}/../build/`)); // CREATES AN OPTIMIZED
// BUNDLE OF BUILD FOLDER

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000 * 100
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/auth"
    },
    (accessTokem, refreshToken, extraParams, profile, done) => {
      app
        .get("db")
        .getUserByAuthid(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthid([profile.id, profile.displayName])
              .then(create => done(null, create[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "www.dashyboards.com",
    failureRedirect: "www.dashyboards.com"
  })
);

app.get("/api/me", (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.status(400).json({ message: "User not logged in!" });
});

app.post("/api/insert", (req, res) => {
  app
    .get("db")
    .createNewUserAdmin([req.body.name, req.body.id])
    .then(create => done(null, created[0]));
});

app.get("/api/admin", (req, res) => {
  app
    .get("db")
    .getAllUserAdmins()
    .then(response => {
      res.status(200).json(response);
    });
});

app.get("/api/logout", (req, res) => {
  req.session.destroy(() => {
    successRedirect: "/#/";
  });
});

app.put("/api/disable/:name", (req, res) => {
  app
    .get("db")
    .disableAdmin([req.params.name])
    .then(response => {});
});

app.post("/api/delete/", (req, res) => {
  app
    .get("db")
    .deleteAdmin([req.body.id])
    .then(response => {});
  app
    .get("db")
    .getAllUserAdmins()
    .then(response => {
      res.status(200).json(response);
    });
});

app.put("/api/enable/:name", (req, res) => {
  app
    .get("db")
    .enableAdmin([req.params.name])
    .then(response => {});
  app
    .get("db")
    .getAllUserAdmins()
    .then(response => {
      res.status(200).json(response);
    });
});
app.get("/api/getallusers/", (req, res) => {
  app
    .get("db")
    .getAllUsers()
    .then(response => {
      res.status(200).json(response);
    });
});

let bundler = new Bundler("src/index.html");

app.use(bodyParser.json());

app.post("/api/send", (req, res) => {
  let SID = process.env.TWILIO_SID;
  let TOKEN = process.env.TWILIO_TOKEN;
  let SENDER = "+14696091079";
  if (!SID || !TOKEN) {
    return res.json({
      message: "add TWILIO_SID and TWILIO_TOKEN to .env file."
    });
  }

  let client = require("twilio")(SID, TOKEN);
  client.messages.create(
    {
      to: req.body.recipient,
      from: SENDER,
      body:
        "Please join the following conference bridge line ASAP regarding a priority 1 inc" +
        "ident: 10001234567,,9876543"
    },
    (err, responseData) => {
      if (!err) {
        res.json({ From: responseData.from, Body: responseData.body });
      }
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
