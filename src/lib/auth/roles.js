export const DASHBOARD_ROLES = ["admin", "director", "finance", "dept_head"];
export const SPONSORS_ROLES = ["admin", "finance"];
export const ACHIEVEMENTS_ROLES = ["admin", "dept_head"];
export const APPLICATIONS_ROLES = ["admin", "dept_head"];
export const USERS_ROLES = ["admin"];
export const EVENT_ROLES = ["admin", "director", "dept_head"];

export function hasAnyRole(roles, allowed) {
  return roles.some((role) => allowed.includes(role));
}
