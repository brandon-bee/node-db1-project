const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where({ id: id }).first()
}

const create = async account => {
  const [id] = await db('accounts').insert({
    name: account.name.trim(),
    budget: account.budget
  })
  const newAccount = await getById(id)
  return newAccount
}

const updateById = (id, account) => {
  return db('accounts').where({ id: id }).update(account)
    .then(() => {
      return getById(id)
    })
}

const deleteById = id => {
  return db('accounts').where({ id: id }).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
