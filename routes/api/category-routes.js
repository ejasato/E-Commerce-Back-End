const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with that ID'});
      return;
    }

    res.status(200).json(CategoryData);
});

router.post('/', async (req, res) => {
  // create a new category
    const CategoryCreate = await Category.create(req.body);
    res.status(200).json(CategoryCreate);
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

    const CategoryUpdate = await Category.update (req.body,{
      where: {
        id: req.params.id,
      },
    });
  
    if (!CategoryUpdate) {
      res.status(404).json({ message: 'No Category found to update'});
      return;
    }
  
    res.status(200).json(CategoryUpdate);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with that ID' });
      return;
    }

    res.status(200).json(CategoryData);
});

module.exports = router;
