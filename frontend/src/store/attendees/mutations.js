import { removeItem, updateItem } from "../utils";

export default {
  SET_ATTENDEES(state, attendees) {
    state.attendees = attendees;
  },
  REMOVE_ATTENDEE(state, attendeeId) {
    state.attendees = removeItem(state.attendees, attendeeId);
  },
  UPDATE_ATTENDEE(state, attendee) {
    state.attendees = updateItem(state.attendees, attendee.id, attendee);
  },
};

export const ATTENDEE_MUTATIONS = {
  SET_ATTENDEES: "SET_ATTENDEES",
  REMOVE_ATTENDEE: "REMOVE_ATTENDEE",
  UPDATE_ATTENDEE: "UPDATE_ATTENDEE"
};