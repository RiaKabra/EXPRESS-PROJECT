import Note from '../models/note.model';

export const createNote = async (noteDetails) => {
  const data = await Note.create(noteDetails);
  return data;
};

export const retrieveNote = async (noteDetails) => {
    const data = await Note.findById(noteDetails);
    return data;
  };

export const updateNote = async (noteDetails) => {
    const data = await Note.updateOne(noteDetails);
    return data;
  };


export const deleteNote = async (noteid) => {
    console.log(noteid);
    const data = await Note.findByIdAndDelete({_id:noteid});
    return data;
  };