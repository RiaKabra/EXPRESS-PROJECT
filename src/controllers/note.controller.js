import * as noteService from "../services/note.service";
import HttpStatus from "http-status-codes";
export const getAll = async (req, res, next) => {
    try {
        const getAll = await noteService.getAll(req.body.createdBy);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: getAll,
            message: "All notes retrieved"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        })

    }
};
export const createNote = async (req, res, next) => {
    try {
        console.log(req.body);
        const note = await noteService.createNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            note: note,
            message: "Note created successfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }

};

export const retrieveNote = async (req, res, next) => {
    try {
        const retrieveNote = await noteService.retrieveNote(req.body.createdBy, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: retrieveNote,
            message: "Note retrieved successfully"
        });
    }
    catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const updatedNote = await noteService.updateNote(req.body, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            note: updatedNote,
            message: "Note updated successfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};


export const deleteNote = async (req, res, next) => {
    try {
        const deleteNote = await noteService.deleteNote(req.body.createdBy, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: "Note deleted successfully"
        });
    }
    catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        });
    }
};


export const toggleArchiveNote = async(req,res,next) => {
    try {
        const archOrUnarch = await noteService.toggleArchiveNote(req.params._id);;
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            message: "Note archive status changes successfully",
            data:archOrUnarch
        });
    }
    catch(error) {
        res.status(HttpStatus.BAD_REQUEST).json({
           code:HttpStatus.BAD_REQUEST,
           message : ` ${error}`
        });
    }
};

export const toggleTrashNote = async(req,res,next) => {
    try{
        const trashOrUntrash = await noteService.toggleTrashNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            message:"Note trash status changes succesfully",
            data: trashOrUntrash
        });
    }
    catch(error)
    {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message: ` ${error}`
        })
    }
};

export const colourUpdate = async(req,res,next) => {
    try{
        const colour = await noteService.colourUpdate(req.params._id,req.body.colour);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            message:"Note colour changed successfully",
            data:colour
        });
    }
    catch(error)
    {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`$error`
        })
    }
};