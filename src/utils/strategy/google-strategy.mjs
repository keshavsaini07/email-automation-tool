import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../../models/user.mjs";
import { ServerConfig } from "../../config/index.js";

passport.serializeUser((user, done) => {
  console.log("3 - Insiden serialize user", user.accessToken);
  const id = user.id;
  const token = user.accessToken;
  done(null, {id, token});
});

passport.deserializeUser(async (user, done) => {
  console.log("4 - Inside Deserialize user", user.id);
  try {
    const findUser = await User.findById(user.id);
    console.log(findUser);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

export default passport.use(
  new GoogleStrategy(
    {
      clientID: ServerConfig.GOOGLE_CLIENT_ID,
      clientSecret: ServerConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: ServerConfig.GOOGLE_CLIENT_REDIRECT_URL,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/gmail.modify"
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("2 - Inside Strategy");
      console.log(accessToken);
      //   console.log(profile.displayName);
      //   console.log(profile.emails[0].value);
      let findUser;
      try {
        findUser = await User.findOne({ email: profile.emails[0].value });
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
      try {
        if (!findUser) {
          const newUser = new User({
            email: profile.emails[0].value,
            fullname: profile.displayName,
          });
          const newSavedUser = await newUser.save();
          newSavedUser.accessToken = accessToken;
          return done(null, newSavedUser);
        }
        findUser.accessToken = accessToken;
        return done(null, findUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

// for google auth, oauth client details
// client-id : 1033051502721-qf374u7vabbj6hcoops14ohll90eht3o.apps.googleusercontent.com
// client-secret : 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
// redirect-url : http://localhost:3000/api/auth/google/redirect
