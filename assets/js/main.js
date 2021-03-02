const DateTime = luxon.DateTime;

// Get Current Date and Time
var now = DateTime.local();

// Determine the correct Ordinal Indicator (i.e. "st", "rd" or "th") for given day of the month and return it
function getOrdinalIndicator(num) {
  const suffix = ["th", "st", "nd", "rd"];
  let lastDigit = num.toString().slice(-1);

  // Handle edge cases (i.e. when num == 11, 12 or 13)
  if (num == 11 || num == 12 || num == 13) {
    return suffix[0];
  }

  // Handle common cases
  switch (lastDigit) {
    case "1":
      return suffix[1];
    case "2":
      return suffix[2];
    case "3":
      return suffix[3];
    default:
      return suffix[0];
  }
}

// Render current day in header
$("#currentDay").text(
  `${now.weekdayLong}, ${now.monthLong} ${now.day}${getOrdinalIndicator(
    now.day
  )} `
);

// Handle Local Storage Operations
class AppStorageService {
  constructor() {
    this.events = [];
  }

  init() {
    console.log(`Initializing Storage Service...\n`);
    if (
      localStorage.getItem("events") &&
      JSON.parse(localStorage.getItem("events")).length
    ) {
      this.events = JSON.parse(localStorage.getItem("events"));
    }
  }

  // Get ALL Saved Events
  getEvents() {
    console.log("Fetching Events...");
    return this.events;
  }

  setEvent(hour, text) {
    const event = {
      hour: hour,
      text: text,
    };
    // If an event with matching hour value exists, store its index (matchingEventIndex === -1 if no match is found)
    const matchingEventIndex = this.events.findIndex((event) => {
      return event.hour === hour;
    });

    // If no event with matching hour value exists, push event object to events array
    if (matchingEventIndex == -1) {
      this.events.push(event);
    }
    // If an event with a matching hour value DOES exist, update the value of its text property to the value of the text parameter
    else {
      this.events[matchingEventIndex].text = text;
    }

    // Stringify this.events array and set it to local storage;
    localStorage.setItem("events", JSON.stringify(this.events));
    console.log(`Event Saved! "${text}" at ${hour}:00.`);
  }
}

// Time Block Class Definition
class TimeBlock {
  constructor(hour, blockState, scheduledEvent, id, app) {
    this.app = app;
    this.id = id;
    this.hour = hour;
    this.blockState = blockState;
    this.scheduledEvent = scheduledEvent;
    this.template;
  }

  updateText(text) {
    this.scheduledEvent = text;
  }

  render() {
    this.template = `
      <div class="time-block">
        <div class="row" id="timeBlock-${this.id}">
          <div class="col-3 col-md-2 col-lg-1 hour">
            <p>${this.hour}:00</p>
          </div>

          <textarea class="col ${this.blockState}" id="${this.id}-text" ${
      this.blockState === "past" ? "disabled" : ""
    }>${this.scheduledEvent}</textarea>

          <button
            class="btn saveBtn col-2 col-md-2 col-lg-1 d-flex align-items-center justify-content-center"
            id="${this.id}-btn"
            ${this.blockState === "past" ? "disabled" : ""}
          >
            <i class="fas fa-save fa-lg"></i>
          </button>
        </div>
      </div>
    `;
    return this.template;
  }

  attachEventHandlers() {
    $(`#${this.id}-btn`).click(() => {
      app.saveEvent(this.hour, $(`#${this.id}-text`).val());
    });
  }
}

// Application Controller Class Definition
class App {
  constructor() {
    this.timeBlockWrapper = $("#time-block-wrapper");
    this.appStorageService = new AppStorageService();
    this.savedEvents;
    this.timeBlocks = [];
    this.dayStartHour = 9;
    this.dayEndHour = 17;
  }

  // Initialize Application
  init() {
    console.log(`Initializing Application...\n`);
    this.appStorageService.init();
    this.savedEvents = this.appStorageService.getEvents();
    console.log(`Rendering Application UI...\n`);

    this.initTimeBlocks();
    this.render();
  }

  // Initialize Time Block Objects
  initTimeBlocks() {
    for (let i = this.dayStartHour; i <= this.dayEndHour; i++) {
      let blockState;

      if (i < now.hour) {
        blockState = "past";
      } else if (i === now.hour) {
        blockState = "present";
      } else if (i > now.hour) {
        blockState = "future";
      }

      let timeBlock = new TimeBlock(i, blockState, "", i, this);

      this.timeBlocks.push(timeBlock);
    }
  }

  // Update text in time blocks to reflect saved event data
  updateTimeBlocks() {
    for (const event of this.savedEvents) {
      for (const timeBlock of this.timeBlocks) {
        if (event.hour === timeBlock.hour) {
          timeBlock.updateText(event.text);
        }
      }
    }
  }

  saveEvent(eventID, text) {
    this.appStorageService.setEvent(eventID, text);
  }

  render() {
    this.updateTimeBlocks();
    for (const timeBlock of this.timeBlocks) {
      $(this.timeBlockWrapper).append(timeBlock.render());
      timeBlock.attachEventHandlers();
    }
  }
}

let app = new App();

app.init();
