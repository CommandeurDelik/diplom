import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createAccount from 'database/createGuestAccount';
import { createEntity } from '../utils/typeorm';
import { User } from '../entities';
// import {generateString} from "../utils/Random";

export const createGuestAccount = catchErrors(async (_req, res) => {
  // const user = await createAccount();
  res.respond({
    authToken: signToken({ sub: 5 }),
  });
});

export const login = catchErrors(async (_req, res) => {
  const user = await User.find({ email: _req.body.email, password: _req.body.password });
  console.log('user is', user);
  res.respond({
    user: user ? user[0] : null,
    authToken: user ? signToken({ sub: user[0].id }) : null,
  });
});

export const register = catchErrors(
  async (_req, res): Promise<void> => {
    const user = await createAccount();
    console.log('user', user);
    await createEntity(User, {
      email: _req.body.email,
      name: _req.body.name,
      password: _req.body.password,
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    });

    res.respond({ sub: true, body: _req.body });
  },
);
