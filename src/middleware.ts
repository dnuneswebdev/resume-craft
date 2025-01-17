export {auth as middleware} from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*"], //bloqueia o acesso do usuário não logado a estas paginas especificas
};
