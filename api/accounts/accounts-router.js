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

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const createdAccount = await Accounts.create(req.body)
    res.status(201).json(createdAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  
});

// router.delete('/:id', checkAccountId, (req, res, next) => {
  
// })

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
