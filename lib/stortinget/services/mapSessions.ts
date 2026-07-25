import { ApiSession } from "../types/session";

export const mapSessions = (apiSession: ApiSession) => {
  return apiSession.id;
};
