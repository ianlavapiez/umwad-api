import { Profile, VerifyCallback } from 'passport-google-oauth20';

export async function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);

  done(null, profile);
}
