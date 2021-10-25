const eventsList = document.querySelector(".activities-list");

const userId = {
  relatedUserId: localStorage.userId,
};

// ____Insert user name to greeting H2 tag

const appendUserNameToGreeting = () => {
  const h2 = document.querySelector("#user-pannel-greeting");
  h2.innerHTML = "Hello, " + localStorage.userName;
};

appendUserNameToGreeting();

// ____Server Requests with fetch() API Methods
const sendEventInsertionRequest = async (Event) => {
  const res = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Event),
  });

  const insertedEvent = await res.json();
};

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

const sendEventEditionRequest = async(Event)=>{
  const res = await fetch("http://localhost:3000/updateevents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Event),
  });

  const insertedEvent = await res.json();
}

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

      const newListItem = createNewListItem();

      const newPtagForDescription = createNewDescription();
      const newPtagForBeginningDate = createNewBeginningDate();
      const newPtagForEndingDate = createNewEndingDate();
      const newEditButton = createNewEditButton();
      const newRemoveButton = createNewRemoveButton();

      newPtagForBeginningDate.setAttribute("value", Event.beginningDate)
      newPtagForEndingDate.setAttribute("value", Event.endingDate)

      newPtagForDescription.innerHTML = Event.description;
      newPtagForBeginningDate.innerHTML = parseDate(Event.beginningDate);
      newPtagForEndingDate.innerHTML = parseDate(Event.endingDate);

      newEditButton.setAttribute(
        "onclick",
        `openModalForEdition("${Event.id}", "${Event.description}", "${Event.beginningDate}", "${Event.endingDate}", "${localStorage.userId}")`
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

const parseDate = (dateString) =>{
  const date = new Date(dateString + "Z")

  let parsedDate = date.toUTCString()
  return parsedDate
}

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

// ____Calling Server Request methods with Event data

const removeEvent = (eventId) => {
  const Event = {
    id: eventId,
  };
  sendDeleteRequest(Event).then((deletedEvent) => {
    location.reload();
  });
};

const editEvent = (userEvent) =>{
  sendEventEditionRequest(userEvent)
}

const addEvent = (formData) => {
  sendEventInsertionRequest(formData)
};

insertUserEventsToEventsList;

// ____Modal Manipulation Methods

const openModalForInsertion = () => {
  const modal = document.querySelector(".modal-overlay");
  modal.classList.add("active");

  submitFormForInsertion(modal);
};

const openModalForEdition = (eventId, eventDescription, beginningDate, endingDate, relatedUserId) => {
  const userEvent = {
    eventId: eventId,
    eventDescription: eventDescription,
    beginningDate: beginningDate,
    endingDate: endingDate,
    relatedUserId: relatedUserId
  }

  const modal = document.querySelector(".modal-overlay");
  modal.classList.add("active");
  
  insertUserEventDataInModal(userEvent, modal);
  submitFormForEdition(modal, userEvent.eventId)
};

const insertUserEventDataInModal = (userEvent, modal) => {
  eventDescription = modal.querySelector("#description");
  eventBeginningDate = modal.querySelector("#eventBeginning");
  eventEndingDate = modal.querySelector("#eventEnding");

  eventDescription.value = userEvent.eventDescription;
  eventBeginningDate.value = userEvent.beginningDate;
  eventEndingDate.value = userEvent.endingDate;

  //continuar no submitFormForEdition() passarUserEvent pq ele tem os ids
};

const closeModal = () => {
  const modal = document.querySelector(".modal-overlay");
  modal.classList.remove("active");
};

// ______ Submiting Modal form for either insertion or addition of events
const submitFormForInsertion = (modal) => {
  const form = modal.querySelector(".modal-form");
  const submitForm = form.addEventListener("submit", (e) => {
    const fieldMissing = form.querySelector("#field-missing");

    fieldMissing.hidden = true;

    const formData = {
      description: form.elements.description.value,
      beginningDate: form.elements.eventBeginning.value,
      endingDate: form.elements.eventEnding.value,
      relatedUserId: localStorage.userId,
    };
    if (
      !formData.description |
      !formData.beginningDate |
      !formData.endingDate
    ) {
      fieldMissing.hidden = false;
      return;
    }
    addEvent(formData);
  });
};

const submitFormForEdition = (modal, eventId) =>{
  
  const form = modal.querySelector(".modal-form");
  const submitForm = form.addEventListener("submit", (e) => {
    
    const fieldMissing = form.querySelector("#field-missing");

    fieldMissing.hidden = true;

    const formData = {
      eventId: eventId,
      description: form.elements.description.value,
      beginningDate: form.elements.eventBeginning.value,
      endingDate: form.elements.eventEnding.value,
      relatedUserId: localStorage.userId,
    };
    if (
      !formData.description |
      !formData.beginningDate |
      !formData.endingDate
    ) {
      e.preventDefault();
      fieldMissing.hidden = false;
      return;
    }

    editEvent(formData);
  });
}
  
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
