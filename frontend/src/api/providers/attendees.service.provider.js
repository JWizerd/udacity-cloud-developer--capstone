import { AttendeesService } from "../services/attendees.service";

export const attendeesServiceProvider = (container) => {
  return new AttendeesService(container.axios);
}