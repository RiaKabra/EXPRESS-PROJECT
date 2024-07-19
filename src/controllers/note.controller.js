import * as noteService from "../services/note.service";
import HttpStatus from "http-status-codes";

export const createNote = async (req,res,next) =>{
    try{
    const note = await noteService.createNote(req.body);
    res.status(HttpStatus.CREATED).json({
        code:HttpStatus.CREATED,
        note : note,
        message:"Note created successfully"
    });
} catch(error)
{
    next(error);
}

};

export const retrieveNote = async (req,res,next)=> {
    try{
        const retrieveNote = await noteService.retrieveNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: retrieveNote,
            message: "Note retrieved successfully"
        });
    }
    catch(error){
        next(error)
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const { createdBy } = req.params; 
        const { title, description, color } = req.body;

        const updatedNote = await noteService.updateNote(createdBy, { title, description, color });

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: updatedNote,
            message: "Note updated successfully"
        });
    } catch (error) {
        next(error); 
    }
};


export const deleteNote = async(req,res,next) => {
    try{
        const deleteNote = await noteService.deleteNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: deleteNote,
            message: "Note deleted successfully"
        });
    }
    catch(error){
        next(error)
    }
};