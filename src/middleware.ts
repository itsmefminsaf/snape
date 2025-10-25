import { NextRequest } from "next/server";
import auth0 from "./lib/auth";

const middleware = (req: NextRequest) => {
  return auth0.middleware(req);
};

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
