const router = require('express').Router();
const UserService = require('../services/UserService');
const {loginMiddleware,
  verifyJWT,
  checkRole,
  notLoggedIn} = require('../../../middlewares/auth-middlewares.js');
const userRoles = require('../../users/constants/userRoles.js');
const statusCodes = require('../../../../constants/statusCodes.js');

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout',
  verifyJWT,
  async (req, res, next) => {
    try {
      res.clearCookie('jwt', { domain: 'i-junior-i-spotify-domain-name.vercel.app', path: '/' });
      res.status(statusCodes.noContent).json({ message: 'Logged out' });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/',
  async (req, res, next) => {
    try {
      await UserService.create(req.body);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
  verifyJWT,
  async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.status(statusCodes.success).json(users);
    } catch(error){
      next(error);
    }
  },
);


router.get('/user',
  verifyJWT,
  async (req, res, next) => {
    try {
      if (req.user) {
        const user = await UserService.getById(req.user.id);
        res.status(statusCodes.success).json(user);
      }
    } catch (error) {
      next(error);
    }
  },
);


router.get('/:id',
  verifyJWT,
  async (req, res, next) => {
    try {
      const user = await UserService.getById(req.params.id);

      res.status(statusCodes.success).json(user);
    } catch (error) {
      next(error);
    }
  },
);


router.put('/:id',
  verifyJWT,
  async (req, res, next) => {
    try {
      await UserService.update(req.params.id, req.body, req.user);
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      await UserService.delete(req.params.id, req.user.id);
      res.status(statusCodes.noContent).end();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
