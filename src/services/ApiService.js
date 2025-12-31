let mockNotes = [
  {
    id: "1",
    title: "Spotkanie w parku",
    description: "Omówienie projektu z zespołem.",
    date: new Date().toISOString(),
    location: null,
  },
  {
    id: "2",
    title: "Zakupy",
    description: "Mleko, chleb, jajka.",
    date: new Date().toISOString(),
    location: null,
  },
];

export const getNotes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockNotes]);
    }, 500);
  });
};

export const saveNote = async (note) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNote = { ...note, id: Math.random().toString() };
      mockNotes.unshift(newNote);
      resolve(newNote);
    }, 500);
  });
};

export const deleteNote = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockNotes = mockNotes.filter((n) => n.id !== id);
      resolve(true);
    }, 500);
  });
};
