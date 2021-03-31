# Work Day Schedular

<p align="center">
  <img src="./assets/img/demo.gif" alt="JavaScript Work Day Scheduler Screenshot">
</p>

> <h2 align="center"><a  href="https://kevin-aminzadeh.github.io/work-day-scheduler/">Live Demo</a></h2>

## Table of Contents

- [Overview](#overview)
- [Acceptance Criteria](#acceptance-criteria)
- [Approach](#approach)
- [Technologies Used](#technologies-used)
- [License](#license)

## Overview

This project is a simple work day scheduler built with vanilla JavaScript and the Luxon JavaScript date/time wrapper library. The purpose of the project is to demonstrate an understanding of JS DOM manipulation, event handling, local data storage and retrieval techniques, as well as an ability to utilize third-party libraries.

The application presents the user with a working day schedule in the form of hourly time blocks, and allows them to schedule tasks for each hour by saving task descriptions in the provided blocks. Saved tasks are stored in the browser's Local Storage and retrieved on page load.

## Acceptance Criteria

The following criteria provided in the project brief were used as the requirements specifications when building this project:

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Approach

The various logical components of the application were first identified through the analysis of the requirements specifications, the `App`, `TimeBlock` and `AppStorageService` ES6 classes were then derived from this process. The purpose and functionality of each of these classes is described below:

### **`App` Class**

The `App` class is the overarching class in the application responsible for implementing the application's general functionality using its own methods and the methods of the `TimeBlock` and `AppStorageService` classes.

Upon initialization, this class creates a new instance of the `AppStorageService` service and uses its `getEvents()` method to retrieve any saved events that may exist.

After this, the class calls its own `initTimeBlocks()` method; The `initTimeBlocks()` method loops through the given range of hours, and creates a new `TimeBlock` instance for each hour of the working day.

At the time of creating a new `TimeBlock` instance, the `initTimeBlocks()` method determines if the hour in the current iteration of the loop is **"past"**, **"present"** or **"future"**; it then passes this value as the `blockState` parameter of the `TimeBlock`.

### **`TimeBlock` Class**

The `TimeBlock` class is a relatively simple view class which is responsible for rendering each time-block given the required data and attaching event handlers to each time-block's save button using its `attachEventHandlers()` method.

### **`AppStorageService` Class**

The `AppStorageService` class is an abstract class designed loosely around Angular's concept of service classes. This class is a data/storage service provider and through its various methods allows interaction with and manipulation of Local Storage data.

## Future Improvements

Due to the simplicity of the current implementation of this project, there are quite a lot of possible future improvements that could be made to this application bring it up to par with similar organizational aid tools available on the market.

Some of the more obvious areas of improvement include:

- UI/UX improvements
- User Authentication/Authorization
- Persistent Server-Side Storage
- Expansion of the time scope allowing users to set tasks for any future calendar

## Technologies Used

- HTML5
- CSS3
- JavaScript ES6
- [Luxon v1.26](https://moment.github.io/luxon/)

## License

This project is licensed under the terms of the MIT license.
