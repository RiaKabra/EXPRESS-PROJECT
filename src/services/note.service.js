import Note from '../models/note.model';

export const getAll = async (value) => {
  const data = await Note.find({ createdBy: value });
  return data;
};

export const createNote = async (noteDetails) => {
  const data = await Note.create(noteDetails);
  return data;
};

export const retrieveNote = async (noteCreatedBy, noteId) => {
  const data = await Note.findOne({ createdBy: noteCreatedBy, _id: noteId });
  return data;
};

export const updateNote = async (noteDetails, noteId) => {
  let { title, description, colour, createdBy } = noteDetails;
  const data = await Note.findOneAndUpdate({ createdBy: createdBy, _id: noteId }, { title: title, description: description, colour: colour }, { new: true });
  return data;
};

export const deleteNote = async (created, noteid) => {
  console.log(noteid);
  await Note.findOneAndDelete({ createdBy: created, _id: noteid });
  return "";
};

export const toggleArchiveNote = async (noteId) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }
  note.isArch = !note.isArch;
  await note.save();
  return note;
};

export const toggleTrashNote = async(noteid)=>{
     const note = await Note.findById(noteid);
     if(!note){
      throw new Error('Note not found');
     }
     note.isTrash = !note.isTrash;
     await note.save();
     return note;
};

export const colourUpdate = async(noteid,colour)=>{
  const note = await Note.findById(noteid);
  note.colour = colour;
  await note.save();
  return note;
}