import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';
import { candidateService } from 'server/modules/candidate/services/candidate.service';
import { voterService } from 'server/modules/voter/services/voter.service';

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        matricule: {
          label: 'Matricule',
          type: 'text',
          placeholder: 'matricule',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        const voter = await voterService.authenticate(
          credentials.matricule,
          credentials.password,
        );
        if (voter) {
          return voter as unknown as User;
        } else {
          const candidate = await candidateService.authenticate(
            credentials.matricule,
            credentials.password,
          );
          if (candidate) {
            return candidate as unknown as User;
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: true,
  callbacks: {
    jwt: async (token: any, user: any) => {
      //"user" parameter is the object received from "authorize"
      //"token" is being send below to "session" callback...
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.surename = user.surename;
        token.matricule = user.matricule;
        token.voted = user.voted;
        token.role = user.likes ? 'candidate' : 'voter';
        token.apply = user.planOfAction ? false : true;
      }
      return token;
    },
    session: async (session, user) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      // @ts-ignore
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(options);
