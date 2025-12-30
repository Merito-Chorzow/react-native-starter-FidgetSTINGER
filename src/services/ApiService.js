let mockNotes = [
  {
    id: "1",
    title: "Spotkanie w parku",
    description:
      "Omówienie projektu z zespołem. Pamiętać o zabraniu dokumentacji.",
    date: new Date().toISOString(),
    location: { latitude: 52.2297, longitude: 21.0122 },
  },
  {
    id: "2",
    title: "Zakupy",
    description: "Mleko, chleb, jajka, woda mineralna, owoce.",
    date: new Date().toISOString(),
    location: null,
  },
];

export const getNotes = async () => {
  // Asynchroniczne pobieranie danych
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
