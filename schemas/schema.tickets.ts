import Joi from "joi";


export const generateTicketSchema = Joi.object({
    issue_description: Joi.string().min(3).required(),
    technician_id: Joi.string().guid({version: 'uuidv4'}),
    estimated_days: Joi.number().min(0),
    owner_name: Joi.string().min(3)
});

export const updateTicketSchema = Joi.object({
    id: Joi.number().min(10000).required(),
    issue_description: Joi.string().min(3),
    technician_id: Joi.string().guid({version: 'uuidv4'}),
    estimated_days: Joi.number().min(0),
    owner_name: Joi.string().min(3),
    state: Joi.boolean()
});

export const endTicketSchema = Joi.object({
    ticket_id: Joi.number().min(10000).required(),
    fixed: Joi.boolean().required(),
    technician_notes: Joi.string().min(3).required(),
})

export const filterTiqueteSchema = Joi.object({
    from: Joi.number().integer().min(1),
    to: Joi.number().integer().min(1),
    pagination: Joi.number().min(1),
    technician_id:  Joi.string().guid({version: 'uuidv4'}),
    creatorId: Joi.string().guid({version: 'uuidv4'}),
    ticket_id: Joi.number().integer()
})