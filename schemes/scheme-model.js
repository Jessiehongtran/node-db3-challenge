const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}

function find(){
    return db('schemes');
}

function findById(id){
    return db('schemes').where({id: Number(id)})
}

function findSteps(schemeId){
    return db('steps')
        .join('schemes', 'schemes.id','scheme_id')
        .select('steps.id','schemes.scheme_name', 'step_number', 'instructions')
        .where('scheme_id', Number(schemeId))
}

function add(scheme){
    return db('schemes')
        .insert(scheme)
        .then(ids => ({id: ids[0]}))
}

function update(scheme, id){
    return db('schemes')
        .where('id', Number(id))
        .update(scheme)
}

function remove(id){
    return db('schemes')
        .where('id', Number(id))
        .del();
}

function addStep(step, scheme_id){
    return db('steps')
        .insert(step)
        .where('scheme_id', scheme_id)
        .then(ids => ({ id: ids[0] }));
}

// // when sending the post id as a parameter
// router.post("/:id", (req, res) => {
//     const {id} = req.params
//     console.log(id)
//     const body = req.body
//     const comment = {
//       text: body.text,
//       post_id:parseInt(id)
//     }
//     console.log(comment)
//     db.insertComment(comment)
//     .then(newId => res.status(200).json(newId))
//     .catch(err => res.status(500).json({ message: "failed to add comment" }))
//   });
  
//   //when sending post id inside the object
  
//   router.post("/:id", (req, res) => {
//    const body = req.body
    
//     db.insertComment(body)
//     .then(newId => res.status(200).json(newId))
//     .catch(err => res.status(500).json({ message: "failed to add comment" }))
//   });