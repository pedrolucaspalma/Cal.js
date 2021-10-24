const eventsList = document.querySelector(".activities-list");
let eventsListStorage = [];

const userId = {
  relatedUserId: localStorage.userId,
};

// ____Insert user name to greeting H2 tag

const appendUserNameToGreeting = () => {
  const h2 = document.querySelector("#user-pannel-greeting");
  h2.innerHTML = "Hello " + localStorage.userName;
};

appendUserNameToGreeting();

// ____Server Requests Methods

const requestUserEvents = async (userId) => {
  const res = await fetch(
    `http://localhost:3000/userevents/${userId.relatedUserId}`,
    {
      method: "GET",
    }
  );

  const userEvents = await res.json();

  return userEvents;
};

const sendDeleteRequest = async (Event) => {
  const res = await fetch(`http://localhost:3000/events/${Event.id}`, {
    method: "DELETE",
    body: JSON.stringify(Event),
  });
  const deletedEvent = await res.json();
  return deletedEvent;
};

// ____Appending Events to EventList on page Reload

const insertUserEventsToEventsList = requestUserEvents(userId).then(
  (userEvents) => {
    for (let i = 0; i < userEvents.length; i++) {
      const Event = {
        id: userEvents[i].id,
        description: userEvents[i].description,
        beginningDate: userEvents[i].beginningDate,
        endingDate: userEvents[i].endingDate,
      };

      pushEventToArray(Event);

      const newListItem = createNewListItem();

      const newPtagForDescription = createNewDescription();
      const newPtagForBeginningDate = createNewBeginningDate();
      const newPtagForEndingDate = createNewEndingDate();
      const newEditButton = createNewEditButton();
      const newRemoveButton = createNewRemoveButton();

      newPtagForDescription.innerHTML = Event.description;
      newPtagForBeginningDate.innerHTML = Event.beginningDate;
      newPtagForEndingDate.innerHTML = Event.endingDate;

      newEditButton.setAttribute(
        "onclick",
        `editEvent("${Event.id}", "${Event.description}", "${Event.beginningDate}", "${Event.endingDate}")`
      );
      newRemoveButton.setAttribute("onclick", `removeEvent(${Event.id})`);

      newListItem.appendChild(newPtagForDescription);
      newListItem.appendChild(newPtagForBeginningDate);
      newListItem.appendChild(newPtagForEndingDate);
      newListItem.appendChild(newEditButton);
      newListItem.appendChild(newRemoveButton);

      eventsList.appendChild(newListItem);
    }
  }
);

const createNewListItem = () => {
  const newListItem = document.createElement("li");
  newListItem.classList.add("activities-list-item");
  return newListItem;
};

const createNewDescription = () => {
  const newPelement = document.createElement("p");
  newPelement.classList.add("description");
  return newPelement;
};

const createNewBeginningDate = () => {
  const newPelement = document.createElement("p");
  newPelement.classList.add("beginning");
  return newPelement;
};

const createNewEndingDate = () => {
  const newPelement = document.createElement("p");
  newPelement.classList.add("ending");
  return newPelement;
};

const createNewEditButton = () => {
  const newButtonElement = document.createElement("button");
  newButtonElement.classList.add("edit-button");
  return newButtonElement;
};

const createNewRemoveButton = () => {
  const newButtonElement = document.createElement("button");
  newButtonElement.classList.add("remove-button");
  return newButtonElement;
};

const pushEventToArray = (userEvent) => {
  eventsListStorage.push(userEvent);
};

// ____Calling Server Request methods with Event data
const removeEvent = (eventId) => {
  const Event = {
    id: eventId,
  };
  sendDeleteRequest(Event).then((deletedEvent) => {
    location.reload();
  });
};

const editEvent = (
  eventId,
  eventDescription,
  eventBeginningDate,
  eventEndingDate
) => {
  const userEvent = {
    id: eventId,
    description: eventDescription,
    beginningDate: eventBeginningDate,
    endingDate: eventEndingDate,
  };

  openModalForEdit(userEvent);
};

const addEvent = (formData) => {
    
};

insertUserEventsToEventsList;

// ____Modal Manipulation Methods

const openModalForInsertion = () => {
  const modal = document.querySelector(".modal-overlay");
  modal.classList.add("active");

  const form = modal.querySelector(".modal-form");
  const submitForm = form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fieldMissing = form.querySelector("#field-missing");

    fieldMissing.hidden = true;

    const formData = {
      description: form.elements.description.value,
      beginningDate: form.elements.eventBeginning.value,
      endingDate: form.elements.eventEnding.value,
    };
    if (
      !formData.description |
      !formData.beginningDate |
      !formData.endingDate
    ) {
      fieldMissing.hidden = false;
      return;
    }

    addEvent(formData)
  });
};

const openModalForEdition = (userEvent) => {
  const modal = document.querySelector(".modal-overlay");
  modal.classList.add("active");

  insertUserEventDatainModal(userEvent, modal);
};

const insertUserEventDatainModal = (userEvent, modal) => {
  eventDescription = modal.querySelector("#description");
  eventBeginningDate = modal.querySelector("#eventBeginning");
  eventEndingDate = modal.querySelector("#eventEnding");

  eventDescription.value = userEvent.description;
  eventBeginningDate.value = userEvent.beginningDate;
  eventEndingDate.value = userEvent.endingDate;
};

const closeModal = () => {
  const modal = document.querySelector(".modal-overlay");
  modal.classList.remove("active");
};

// ______ Submiting Modal form for either insertion or addition of events
const submitFormForInsertion = () => {
  const form = document.querySelector("modal-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Tratativa de erro de campo vazio
  });
};

// ______ Logout

const clearEventList = () => {
  document.querySelectorAll(".activities-list-item").forEach((e) => {
    e.remove();
  });
};

const logout = () => {
  localStorage.userName = "";
  localStorage.userId = "";

  clearEventList();

  window.location = "../login/index.html";
};
