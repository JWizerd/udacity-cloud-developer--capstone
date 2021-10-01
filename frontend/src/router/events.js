import EventSingle from "../views/Event";

export const EventRoutes = [
  {
    path: "/marketplaces/:marketplaceId/events/:eventId",
    name: "marketplace event",
    component: EventSingle
  },
]