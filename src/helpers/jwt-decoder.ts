import type { UserInterface } from '@/models/user.model';

interface AuthJWT {
  exp: Date;
  user: UserInterface;
}

export const jwt_decode = function (jwt: string): { header: object; payload: AuthJWT } | null {
  const splitted = jwt.split('.');

  if (splitted.length < 3) {
    return null;
  }

  try {
    const header = JSON.parse(atob(splitted[0]));
    const payload = JSON.parse(atob(splitted[1]));
    return { header, payload };
  } catch {
    return null;
  }
};

export const jwt_payload = function (jwt: string): AuthJWT | null {
  const decoded = jwt_decode(jwt);
  return decoded ? decoded.payload : null;
};
