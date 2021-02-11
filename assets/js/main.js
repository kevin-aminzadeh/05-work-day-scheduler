var DateTime = luxon.DateTime;

var now = DateTime.local();

// Determine the correct Ordinal Indicator (i.e. "st", "rd" or "th") for given day of the month
function getOrdinalIndicator(num) {
  const suffix = ["th", "st", "nd", "rd"];
  let lastDigit = num.toString().slice(-1);

  // Handle edge cases (i.e. when num == 11, 12 or 13)
  if (num == 11 || num == 12 || num == 13) {
    return suffix[0];
  }

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
  constructor() {}

  onInit() {}

  onUpdate() {}

  getEvents() {
    const events = JSON.parse(localStorage.getItem("events"));
    return events;
  }

  setEvent(hour, text) {
    let events = [];
    const event = {
      hour: hour,
      text: text,
    };

    if (JSON.parse(localStorage.getItem("events"))) {
      events = JSON.parse(localStorage.getItem("events"));
    }
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
  }
}

// Time Block Class Definition
class TimeBlock {
  constructor(hour, blockState, scheduledEvent, rootEl, id) {
    this.id = id;
    this.rootEl = rootEl;
    this.hour = hour;
    this.blockState = blockState;
    this.scheduledEvent = scheduledEvent;
    this.template = `
      <div class="row time-block" id="timeBlock-${this.id}">
        <div class="col-3 col-md-2 col-lg-1 hour">
          <p>${this.hour}</p>
        </div>

        <textarea class="col ${this.blockState}">Event</textarea>

        <button
          class="btn saveBtn col-3 col-md-2 col-lg-1 d-flex align-items-center justify-content-center"
          id="${this.id}-btn"
        >
          <i class="fas fa-save fa-lg"></i>
        </button>
      </div>
    `;
  }

  updateState(state) {}

  render() {
    return this.template;
  }

  attachEventHandlers() {
    $(`#${this.id}-btn`).click(() => {
      console.log(`#${this.id}-btn`);
    });
  }

  addEvent(descrp) {}
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

  init() {
    this.savedEvents = this.appStorageService.getEvents();
    console.log(this.timeBlockWrapper);
    this.render();
  }

  update() {}

  saveEvent() {}

  render() {
    for (let i = this.dayStartHour; i <= this.dayEndHour; i++) {
      let blockState;

      if (i < now.hour) {
        blockState = "past";
      } else if (i === now.hour) {
        blockState = "present";
      } else if (i > now.hour) {
        blockState = "future";
      }
      const timeBlock = new TimeBlock(
        i,
        blockState,
        undefined,
        this.timeBlockWrapper,
        i
      );
      $(this.timeBlockWrapper).append(timeBlock.render());
      timeBlock.attachEventHandlers();
    }
  }
}

let app = new App();

app.init();
