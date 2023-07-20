"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const event_bus_1 = require("sst/node/event-bus");
exports.event = (0, event_bus_1.createEventBuilder)({
    bus: "bus",
});
