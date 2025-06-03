const main = document.querySelector(`#app`);
main.innerHTML = (`
  <h1>Party Planner</h1>
  <h2 id="UP">Upcoming Parties</h2>
  <h2 id="PD">Party Details</h2>
  <ul id="PList"></ul>
  <article id="details"></article>
`);

const state = {
  events: []
};

const grabEvents = async () => {
  const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505/events`);
  const List = await response.json();
  const eventList = List.data
  state.events = eventList;
}

const renderEventList = () =>{
  const ul = main.querySelector(`ul`);
  for(let i = 0; i < state.events.length; i++){
    const li = document.createElement(`li`);
    li.setAttribute(`id`, state.events[i].id)
    li.innerText = state.events[i].name;
    li.addEventListener(`click`, ()=>{
      updateEventDetails(state.events[i]);
    });
    ul.appendChild(li);
  }
}

const init = async () =>{
  await grabEvents();
  renderEventList();
}

const updateEventDetails = (event) => {
  const article = main.querySelector(`#details`);
  const wholeDateTime = event.date;
  const splitArray = wholeDateTime.split(`T`);
  const time = splitArray[1].split(`.`);
  article.innerHTML = `
    <h3>${event.name}</h3>
    <p>${splitArray[0]}</p>
    <p>${time[0]}</p>
    <i>${event.location}</i>
    <p>${event.description}</p>
  `;
}

init();

