import { EVENT_MUTATIONS } from "./mutations";

export default {
  async GET_EVENTS({ commit }, marketplaceId) {
    const events = await this.$api.events.find({}, { marketplaceId });
    commit(EVENT_MUTATIONS.SET_EVENTS, events);
  },
  async GET_USER_EVENTS({ commit }, marketplaceId) {
    const events = await this.$api.events.find({}, { marketplaceId });
    commit(EVENT_MUTATIONS.SET_USER_EVENTS, events);
  },
  async GET_EVENT({ commit }, { eventId, marketplaceId }) {
    const event = await this.$api.events.findOne(eventId, { marketplaceId });
    commit(EVENT_MUTATIONS.SET_CURRENT_EVENT, event);
  },
  async CREATE_EVENT(_, { event, marketplaceId }) {
    await this.$api.events.create(event, { marketplaceId });
  },
  async UPDATE_EVENT({ commit }, { event, marketplaceId }) {
    const events = await this.$api.events.update(event.id, event, { marketplaceId });
    commit(EVENT_MUTATIONS.SET_EVENTS, events);
  },
  async DELETE_EVENT({ commit }, { eventId, marketplaceId }) {
    const events = await this.$api.events.remove(eventId, { marketplaceId });
    commit(EVENT_MUTATIONS.REMOVE_EVENT, events);
  },
}

export const EVENT_ACTIONS = {
  GET_EVENTS: "GET_EVENTS",
  GET_USER_EVENTS: "GET_USER_EVENTS",
  GET_EVENT: "GET_EVENT",
  CREATE_EVENT: "CREATE_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
}