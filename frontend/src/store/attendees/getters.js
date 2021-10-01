export default {
  attendees(state) {
    return state.attendees;
  },
  attendee(state, attendeeId) {
    return state.attendees.find(a => a.id === attendeeId);
  }
}