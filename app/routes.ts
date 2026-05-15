import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("auth", "routes/auth.tsx"),
  route("api/logout", "routes/api.logout.tsx"),
  ...prefix("dashboard", [
    index("routes/dashboard/index.tsx"),
    route("analytics", "routes/dashboard/analytics.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
  ]),
  route("debt/:id", "routes/debt.$id.tsx"),
  route(":username", "routes/$username.tsx"),
] satisfies RouteConfig;
