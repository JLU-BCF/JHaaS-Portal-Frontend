import { User } from '@/models/user.model';

interface AuthJWT {
  exp: Date;
  user: User;
}

export const jwt_decode = function (jwt: string): { header: object; payload: AuthJWT } | void {
  const splitted = jwt.split('.');

  if (splitted.length < 3) return;

  try {
    const headerJson = window.atob(splitted[0]);
    const payloadJson = window.atob(splitted[1]);
    const header = JSON.parse(headerJson);
    const payload = JSON.parse(payloadJson);
    return {
      header,
      payload: {
        exp: new Date(payload.exp),
        user: new User(payload.user)
      }
    };
  } catch (err) {
    console.log(err);
  }
};

export const jwt_payload = function (jwt: string): AuthJWT | null {
  const decoded = jwt_decode(jwt);
  return decoded ? decoded.payload : null;
};
