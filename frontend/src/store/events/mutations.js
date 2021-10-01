import { removeItem } from "../utils/remove-item";

export default {
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_USER_EVENTS(state, events) {
    state.userEvents = events;
  },
  REMOVE_EVENT(state, eventId) {
    state.userEvents = removeItem(state.userEvents, eventId);
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