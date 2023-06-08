const newNoteBtn = document.querySelector('.new-note');
const noteList = document.querySelector('.list-container .list-group');

const getNotes = () => {
  return fetch('/api/notes')
    .then((response) => response.json())
    .then((data) => data);
};

const handleNoteView = (e) => {
  e.preventDefault();
  const note = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  window.location.href = `/notes#${note.id}`;
};