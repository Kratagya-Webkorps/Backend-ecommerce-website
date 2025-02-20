const cors = require("cors");
const exp = require("express");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const fileUpload = require('express-fileupload');

const { DB, REQUEST_TIMEOUT } = require("./config");
const PORT = process.env.PORT || 5000;

const app = exp();

app.use(cors());
app.use(
  cors({
    origin: ["https://deploy-mern-1whq.verscel.app"],
    credentials: true,
  })
);

app.use(exp.json());
app.use(
  exp.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());
require("./middlewares/passport")(passport);

app.get("/", (req, res) => {
  res.send("Server running");
});
// User Router Middleware
app.use(fileUpload({
  useTempFiles:true
}))
app.use("/api", require("./routes"));

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: REQUEST_TIMEOUT,
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
