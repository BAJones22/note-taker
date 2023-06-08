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

const renderNoteList = (notes) => {
    noteList.innerHTML = '';
  
    if (notes.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.classList.add('list-group-item');
      emptyMessage.innerText = 'No saved Notes';
      noteList.append(emptyMessage);
    } else {
      notes.forEach((note) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.setAttribute('data-note', JSON.stringify(note));
        listItem.addEventListener('click', handleNoteView);
  
        const titleElement = document.createElement('span');
        titleElement.classList.add('list-item-title');
        titleElement.innerText = note.title;
  
        listItem.append(titleElement);
        noteList.append(listItem);
      });
    }
  };