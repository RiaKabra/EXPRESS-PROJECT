import Note from '../models/note.model';

export const getAll = async (value) => {
  const data = await Note.find({createdBy:value});
  return data;
};

export const createNote = async (noteDetails) => {
  const data = await Note.create(noteDetails);
  return data;
};

export const retrieveNote = async (noteCreatedBy,noteId) => {
    const data = await Note.findOne({createdBy:noteCreatedBy,_id:noteId});
    return data;
  };

export const updateNote = async (value,id) => {
    const data = await Note.findOneAndUpdate({createdBy:value,_id : id});
    return data;
  };


export const deleteNote = async (created,noteid) => {
    console.log(noteid);
    const data = await Note.findOneAndDelete({createdBy:created,_id:noteid});
    return data;
  };