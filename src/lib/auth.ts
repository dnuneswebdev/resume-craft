import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/db/drizzle";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: DrizzleAdapter(db), //importa o drizze para usar com o Auth
  providers: [GitHub, Google],
  pages: {
    signIn: "/auth/login", //redireciona o user não logado *IMPORTANTE*
  },
  callbacks: {
    authorized: async ({auth}) => {
      return !!auth; //atua junto com o middleware para bloquear o acesso de usuario nao logado a certas paginas
    },
  },
});
