import Joi from '@hapi/joi';

export const noteValidator = async(req,res,next) =>{
    const schema = Joi.object({
        title: Joi.string().min(0).max(100).required(),
        description:Joi.string().min(0).max(150).required(),
        colour: Joi.string().optional()
    })

    const { error} = schema.validate(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      next();
    }

};


