import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  { createdBy:{
    type: String, 
  },
    title:{
      type: String, 
      required:true
    },
    description:{
      type:String,
    },
    colour :{
      type: String,
    },
    isArch:
    {
      type : Boolean,
      default:false
    },
    isTrash:
    {
      type : Boolean,
      default:false
    }

  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
