const express = require("express");
const helmet = require("helmet");
// const cors = require("cors");
const morgan = require("morgan");
const { Sequelize, DataTypes } = require("sequelize");

if (process.env.NODE_ENV === "prodiction") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 9000;
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || "jouje_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "zxpou1991",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    define: {
      freezeTableName: true,
      timestamps: true,
    },
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = sequelize.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync();
  console.log("passed");
})();
app.post("/api/user", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.create({ username, password });
  console.log("user ", user);
  res.json({ status: "ok" });
});

app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  const result = users.map((user) => {
    return {
      username: user.username,
      score: user.password,
    };
  });

  res.json(result);
});
//require('dotenv').config();

// const passport = require("passport");
// const exSession = require("express-session");
// const path = require("path");

// app.use("/", express.static(path.join(__dirname, "public")));
// const FileStore = require("session-file-store")(exSession);
// app.use(
//   exSession({
//     resave: false,
//     saveUninitialized: true,
//     secret: "unguessable",
//     store: new FileStore(),
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
/*
//////////////////////
/////////////DATABASE section//////////////////
const sequelize = new Sequelize('jouje', 'root', 'zxpou1991', {
	host: 'localhost',
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		timestamps: true,
	},
});

const User = sequelize.define('user', {
  // attributes
	id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
	google_id: {
		type: Sequelize.BIGINT,
		allowNull: false,
	},
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
	avatar: {
		type: Sequelize.STRING(1234),
	},
	provider: {
		type: Sequelize.STRING
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
}, {
  // options
});

User.findOne({
	where: {
		google_id: 839222847,
	}
}).then(data => console.log(data.dataValues))
	.catch(err => console.log('not found'));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
	})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//////////////////////////////////////////////
//////////////////////
*/
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
// 	clientID: '276142483872-q0ie7i43rbmoon55uf5u7gim94mnsm4e.apps.googleusercontent.com',
// 	clientSecret: 'o3Gbsnaqxc28fT3135f1T64j',
// 	callbackURL: '/auth/google/callback',
// 	scope: 'https://www.googleapis.com/auth/plus.login'
// 	},
// 	(accessToken, refreshToken, profile, done) => { //verify callback
// 		//database call here
// 		console.log('database calls');
// 		User.findOrCreate({where: {google_id: profile.id}, defaults: {
// 			firstName: profile.name.givenName,
// 			lastName: profile.name.familyName,
// 			google_id: profile.id,
// 			avatar: profile.photos[0].value,
// 			provider: profile.provider,
// 		}})
// 		.then(([user, created]) => {
// 			console.log(created);
// 		}).catch(err => console.log(err));
// 		return done(null, profile.id);
// 	})
// );

// passport.serializeUser((id, done) => {
// 	console.log('serial');
// 	console.log(id);
// 	done(null, {
// 		google_id: id,
// 	});
// });
// passport.deserializeUser(async (id, done) => {
// 	console.log('de serial');
// 	console.log(id.google_id);
// 	const user = await User.findOne({
// 		where: {
// 			google_id: id.google_id
// 		}
// 	});
// 	//console.log(user);
// 	done(null, user);
// });

// router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

// router.get('/auth/google/callback', passport.authenticate('google', {
// 	successRedirect: '/',
// 	failureRedirect: '/',
// }));
// router.get('/auth', (req, res, next) => {
// 	console.log('hereeeeeeeeeeeeeee');
// })
// app.use('/', router);

// app.get('/logout', (req, res) => {
// 	console.log('Login out');
// 	req.logout();
// 	res.redirect('/');
// })
// app.get('/auth/session', (req, res) => {
// 	console.log("called session");
// 	const session = {auth: req.isAuthenticated()};
// 	console.log(session);
// 	res.status(200).json(session);
// });

// app.get('/currentUser', (req, res) => {
// 	console.log('current user');
// 	console.log(req.user.dataValues.avatar);
// 	const {user} = req;
// 	res.status(200).json(user);
// });

// app.get('/test', (req, res) => {
// 	console.log(req.person);
// 	res.end();
// });

// app.use((req, res, next) => {
// 	console.log('testtesttesttesttesttesttesttesttesttest');
// 	req.person = {
// 		name: 'pooria',
// 		age: 33
// 	};
// 	next();
// })

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
