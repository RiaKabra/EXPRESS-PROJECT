import * as noteService from "../services/note.service";
import HttpStatus from "http-status-codes";

export const getAll = async (req, res, next) => {
    try {
      const getAllNotes = await noteService.getAll(req.body.createdBy);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        note: getAllNotes,
        message: "All notes retrieved"
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: ` ${error}`
      });
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
        if(!retrieveNote)
        {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code:HttpStatus.BAD_REQUEST,
                message:"Note not found"
            })
        }
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
        console.log("Request body and paramters---->",req.body,req.params);
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

export const toggleArchiveNote = async (req, res) => {
  try {
    const { _id } = req.params;
    const note = await noteService.toggleArchiveNote(_id);
    res.status(HttpStatus.OK).json({
      message: "Note archive status changed successfully",
      data: note
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: `${error}`
    });
  }
};

export const toggleTrashNote = async (req, res) => {
  try {
    const { _id } = req.params;
    const note = await noteService.toggleTrashNote(_id);
    res.status(HttpStatus.OK).json({
      message: "Note trash status changed successfully",
      data: note
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: `${error}`
    });
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

export const deleteNote = async (req, res, next) => {
    try {
        const deleteNote = await noteService.deleteNote(req.body.createdBy, req.params._id);
        if(!deleteNote)
        {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code:HttpStatus.BAD_REQUEST,
                message:"Note not found"
            });
        }
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