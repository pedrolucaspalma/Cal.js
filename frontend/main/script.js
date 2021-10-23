const eventsList = document.querySelector(".activities-list")
const userEventsStorage = localStorage.userEvents

const userId = {
    relatedUserId: localStorage.userId
}

const getUserEvents = async (userId) => {
  const res = await fetch("http://localhost:3000/userevents", {
    method: "POST",
    body: JSON.stringify(userId),
  });

  const userEvents = await res.json();

  return userEvents;
};

const insertUserEventsToEventsList = getUserEvents(userId).then((userEvents)=>{
    for(let i = 0; i < userEvents.length; i++){

        const Event = {
            id: userEvents[i].id,
            description: userEvents[i].description,
            beginningDate: userEvents[i].beginningDate,
            endingDate: userEvents[i].endingDate
        }

        pushEventToStorage(Event)

        const newListItem = createNewListItem()

        const newPtagForDescription = createNewDescription()
        const newPtagForBeginningDate = createNewBeginningDate()
        const newPtagForEndingDate = createNewEndingDate()
        const newEditButton = createNewEditButton()
        const newRemoveButton = createNewRemoveButton()

        newPtagForDescription.innerHTML = Event.description
        newPtagForBeginningDate.innerHTML = Event.beginningDate
        newPtagForEndingDate.innerHTML = Event.endingDate

        newListItem.appendChild(newPtagForDescription)
        newListItem.appendChild(newPtagForBeginningDate)
        newListItem.appendChild(newPtagForEndingDate)
        newListItem.appendChild(newEditButton)
        newListItem.appendChild(newRemoveButton)

        eventsList.appendChild(newListItem)
    }
})

const createNewListItem = ()=>{
    const newListItem = document.createElement('li')
    newListItem.classList.add('activities-list-item')
    return newListItem
}

const createNewDescription = ()=>{
    const newPelement = document.createElement('p')
    newPelement.classList.add('description')
    return newPelement
}

const createNewBeginningDate = ()=>{
    const newPelement = document.createElement('p')
    newPelement.classList.add('beginningDate')
    return newPelement
}

const createNewEndingDate = ()=>{
    const newPelement = document.createElement('p')
    newPelement.classList.add('endingDate')
    return newPelement
}

const createNewEditButton = ()=>{
    const newButtonElement = document.createElement('button')
    newButtonElement.classList.add("edit-button")
    return newButtonElement
}

const createNewRemoveButton = ()=>{
    const newButtonElement = document.createElement('button')
    newButtonElement.classList.add("remove-button")
    return newButtonElement
}

const pushEventToStorage = (userEvent)=>{
    userEventsStorage.push(userEvent)
}

// const parseDateString = (string) =>{
//     for(let i = 0; i < string.length; i++){
//         if(i = 9){
//             string.slice
//         }
//     }
// }

insertUserEventsToEventsList




const logout = () => {
  localStorage.userEmail = "";
  window.location = "../login/index.html";
};
