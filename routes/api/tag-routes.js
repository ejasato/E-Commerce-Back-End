const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const TagData = await Tag.findALL({
    include: [{model: Product, through: ProductTag}],
  });
  res.status(200).json(TagData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const TagData = await Tag.findByPk(req.params.id, {
    include: [{model: Product, through: ProductTag}],
  });
  if (!TagData) {
    res.status(404).json({ message: 'No Id found with that id'});
    return;
  }

  res.status(200).json(TagData);

  res.status(500).json(err);
});

router.post('/', async (req, res) => {
  // create a new tag
  const TagCreate = await Tag.create(req.body);
  res.status(200).json(TagCreate);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const TagUpdate = await Tag.update ({
    where: {
      id: req.params.id,
    },
  });

  if (!TagUpdate) {
    res.status(404).json({ message: 'No Tag found to update'});
    return;
  }

  res.status(200).json(TagUpdate);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const TagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!TagData) {
    res.status(404).json({ message: 'No Tag found with that ID' });
    return;
  }

  res.status(200).json(TagData);
});

module.exports = router;
