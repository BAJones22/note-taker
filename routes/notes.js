const noteTitle = document.querySelector('.note-title');
const noteText = document.querySelector('.note-textarea');
const saveNoteBtn = document.querySelector('.save-note');
const newNoteBtn = document.querySelector('.new-note');
const noteList = document.querySelector('.list-container .list-group');

let activeNote = {};

const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};

const getNotes = () => {
  return fetch('/api/notes')
    .then((response) => response.json())
    .then((data) => data);
};

const saveNote = (note) => {
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
};

const deleteNote = (id) => {
  return fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
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

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
      deleteIcon.addEventListener('click', handleNoteDelete);

      listItem.append(titleElement, deleteIcon);
      noteList.append(listItem);
    });
  }
};

const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

saveNoteBtn.addEventListener('click', handleNoteSave);
newNoteBtn.addEventListener('click', handleNewNoteView);
noteTitle.addEventListener('keyup', handleRenderSaveBtn);
noteText.addEventListener('keyup', handleRenderSaveBtn);

getAndRenderNotes();
