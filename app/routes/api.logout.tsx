import type { Route } from "./+types/api.logout";
import { destroyUserSession } from "~/lib/session.server";

export async function action({ request }: Route.ActionArgs) {
  return destroyUserSession(request, "/");
}
