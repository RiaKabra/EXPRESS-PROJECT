import Note from '../models/note.model';
import clientRedis from '../utils/user.util';

export const getAll = async (value) => {
    const cacheKey = `notes:${value}`;
    const redisClient = await clientRedis(); 
    
    const cachedNotes = await redisClient.get(cacheKey);
    if (cachedNotes) {
        return JSON.parse(cachedNotes);
    }

    const notes = await Note.find({ createdBy: value });
    
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(notes)); 

    return notes;
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

export const toggleArchiveNote = async (noteId) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }
  if (note.isTrash !== true) {
    note.isArch = !note.isArch;
  } else {
    throw new Error("Trashed note cannot be archived");
  }
  await note.save();
  return note;
};

export const toggleTrashNote = async (noteId) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }
  note.isTrash = !note.isTrash;
  await note.save();
  return note;
};

export const colourUpdate = async(noteid,colour)=>{
  const validColours = ["blue","red","white","black","yellow","orange"];
  if(!validColours.includes(colour))
  {
    throw new Error("Invalid colour");
  }

  const note = await Note.findById(noteid);
  if(!note)
  {
    throw new Error("Note not found");
  }
  note.colour = colour;
  await note.save();
  return note;
}

export const deleteNote = async (created, noteid) => {
  const note = await Note.findOneAndDelete({ createdBy: created, _id: noteid });
  if (!note) {
    throw new Error('Note not found');
}
  return note;
};
