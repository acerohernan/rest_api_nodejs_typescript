import { Response, Request } from "express";
import { get } from "lodash";
import { createSessionInput } from "../schema/auth.schema";
import { findSessionById, signAccessToken, signRefreshToken } from "../service/auth.service";
import { findUserByEmail, findUserById } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionInput>,
  res: Response
) {
  const { email, password } = req.body;

  const errorMsg = "Invalid email or password";

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(errorMsg);
  }

  if (!user.verified) {
    return res.send("Pelase verify your email");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(errorMsg);
  }

  //Sign a access token
  const accessToken = signAccessToken(user);

  //Sign a refresh token
  const refreshToken = await signRefreshToken({
    userId: user._id,
  });

  //Send the tokens
  return res.send({
    accessToken,
    refreshToken
  })
}

export async function refreshAccessTokenHandler(req:Request, res:Response) {
  const refreshToken = get(req, "headers.x-refresh");

  const decoded = verifyJwt<{session: string}>(refreshToken, "refreshTokenPrivateKey");

  if(!decoded){
    return res.status(401).send("Could not refresh access token");
  };

  const session = await findSessionById(decoded.session);

  if(!session || !session.valid){
    return res.status(401).send("Could not refresh access token");
  };

  const user = await findUserById(String(session.user));

  if(!user){
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({accessToken});
}