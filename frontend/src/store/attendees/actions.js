import { ATTENDEE_MUTATIONS } from "./mutations";

export default {
  async GET_ATTENDEES({ commit }, eventId) {
    const attendees = await this.$api.attendees.find({}, { eventId });
    commit(ATTENDEE_MUTATIONS.SET_ATTENDEES, attendees);
  },
  async UPDATE_ATTENDEE({ commit }, { attendee, eventId }) {
    const updatedAttendee = await this.$api.attendees.update(attendee.id, attendee, { eventId });
    commit(ATTENDEE_MUTATIONS.SET_ATTENDEES, updatedAttendee);
  },
  async DELETE_ATTENDEE({ commit }, { attendeeId, eventId }) {
    await this.$api.attendees.remove(attendeeId, { eventId });
    commit(ATTENDEE_MUTATIONS.REMOVE_ATTENDEE, attendeeId);
  },
}

export const ATTENDEE_ACTIONS = {
  GET_ATTENDEES: "GET_ATTENDEES",
  UPDATE_ATTENDEE: "UPDATE_ATTENDEE",
  DELETE_ATTENDEE: "DELETE_ATTENDEE"
}