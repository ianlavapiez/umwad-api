import {
  Profile as GoogleProfile,
  VerifyCallback as VerifyGoogleCallback,
} from 'passport-google-oauth20';
import { Profile as FacebookProfile } from 'passport-facebook';

export async function verifyFacebookCallback(
  accessToken: string,
  refreshToken: string,
  profile: FacebookProfile,
  cb: any,
) {
  console.log('accessToken', accessToken);
  console.log('profile', profile);

  return cb(null, profile);
}

export async function verifyGoogleCallback(
  accessToken: string,
  refreshToken: string,
  profile: GoogleProfile,
  done: VerifyGoogleCallback,
) {
  console.log('accessToken', accessToken);
  console.log('profile', profile);

  done(null, profile);
}
