const router = require('express').Router();
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(() => {
      next()
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      res.json(account)
    })
    .catch(() => {
      next()
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(createdAccount => {
      res.status(201).json(createdAccount)
    })
    .catch(() => {
      next()
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(updatedAccount => {
      res.json(updatedAccount)
    })
    .catch(() => {
      next()
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(() => {
      res.json(req.account)
    })
    .catch(() => {
      next()
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
