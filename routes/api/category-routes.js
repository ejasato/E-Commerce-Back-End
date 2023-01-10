const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

    const CategoryData = Category.findAll({
      include: [{ model: Category, include: [{ model: Product}]}],
    });
    res.status(200).json(CategoryData);

    res.status(500).json(err);

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    const CategoryData = Category.findByPk(req.params.id, {
      include: [{ model: Category, include: [{ model: Product}]}],
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with that ID'});
      return;
    }

    res.status(200).json(CategoryData);

    res.status(500).json(err);

});

router.post('/', (req, res) => {
  // create a new category
    const CategoryCreate = Category.create(req.body);
    res.status(200).json(CategoryCreate);
    res.status(500).json(err);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const CategoryUpdate = Category.update ({
    where: {
      id: req.params.id,
    },
  });

  if (!CategoryUpdate) {
    res.status(404).json({ message: 'No Category found to update'});
    return;
  }

  res.status(200).json(CategoryUpdate);
  res.status(500).json(err);
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    const CategoryData = Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with that ID' });
      return;
    }

    res.status(200).json(CategoryData);
    res.status(500).json(err);
});

module.exports = router;
