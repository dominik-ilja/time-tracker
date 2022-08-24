const { Router } = require('express');
const router = Router();
const {
  createCategory,
  createLog,
  deleteCategoryById,
  deleteLogById,
  getAllCategories,
  getAllLogs,
  getCategoryById,
  getCategoryLogs,
  getLogById,
  updateCategory,
  updateLogById,
} = require('../controllers');

router.get('/', (req, res) => res.send('ROOT'));

router.route('/categories')
  .get(getAllCategories)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategoryById);

router.route('/categories/:id')
  .get(getCategoryById);

router.route('/categories/:id/logs')
  .get(getCategoryLogs);

router.route('/logs')
  .post(createLog)
  .get(getAllLogs)
  .put(updateLogById)
  .delete(deleteLogById);

router.route('/logs/:id')
  .get(getLogById);

module.exports = router;
