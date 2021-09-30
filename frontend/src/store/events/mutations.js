export default {
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_USER_EVENTS(state, events) {
    state.userEvents = events;
  },
  REMOVE_EVENT(state, eventId) {
    if (state.userEvents.items.length === 1) {
      state.userEvents.items = [];
    } else {
      const index = state.userEvents.items.findIndex(m => m.id === eventId);
      if (index !== -1) state.userEvents.items.splice(index, 1);
      state.userEvents = {...state.userEvents};
    }
  },
  SET_CURRENT_EVENT(state, event) {
    state.currentEvent = event;
  }
}

export const EVENT_MUTATIONS = {
  SET_EVENTS: "SET_EVENTS",
  SET_USER_EVENTS: "SET_USER_EVENTS",
  REMOVE_EVENT: "REMOVE_EVENT",
  SET_CURRENT_EVENT: "SET_CURRENT_EVENT",
}