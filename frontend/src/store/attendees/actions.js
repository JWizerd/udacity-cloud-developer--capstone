import { ATTENDEE_MUTATIONS } from "./mutations";

export default {
  async GET_ATTENDEES({ commit }, { eventId, marketplaceId }) {
    const attendees = await this.$api.attendees.find({}, { eventId, marketplaceId });
    commit(ATTENDEE_MUTATIONS.SET_ATTENDEES, attendees);
  },
  async UPDATE_ATTENDEE({ commit }, { attendee, eventId, marketplaceId }) {
    const updatedAttendee = await this.$api.attendees.update(attendee.id, attendee, { eventId, marketplaceId });
    commit(ATTENDEE_MUTATIONS.SET_ATTENDEES, updatedAttendee);
  },
  async DELETE_ATTENDEE({ commit }, { attendeeId, eventId, marketplaceId }) {
    await this.$api.attendees.remove(attendeeId, { eventId, marketplaceId });
    commit(ATTENDEE_MUTATIONS.REMOVE_ATTENDEE, attendeeId);
  },
  async CREATE_ATTENDEE({ commit, getters }, { attendee, eventId, marketplaceId }) {
    await this.$api.attendees.create(attendee, { eventId, marketplaceId });
    commit(ATTENDEE_MUTATIONS.ADD_ATTENDEE, { ...attendee, user: getters.user });
  },
}

export const ATTENDEE_ACTIONS = {
  GET_ATTENDEES: "GET_ATTENDEES",
  UPDATE_ATTENDEE: "UPDATE_ATTENDEE",
  DELETE_ATTENDEE: "DELETE_ATTENDEE",
  CREATE_ATTENDEE: "CREATE_ATTENDEE"
}