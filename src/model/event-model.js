import { getRandomEvent } from '../mock/task.js';

const TASK_COUNT = 10;

export default class EventModel {
  events = Array.from({length: TASK_COUNT}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
