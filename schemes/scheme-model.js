const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
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
        .select('schemes.*', 'step_number', 'instructions')
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