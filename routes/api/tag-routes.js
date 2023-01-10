const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const TagData = Tag.findALL({
    include: [{ model: Tag, include: [{ model: ProductTag, include: [{ model: Product}] }] }],
  });
  res.status(200).json(TagData);

  res.status(500).json(err);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const TagData = Tag.findByPk(req.params.id, {
    include: [{ model: Tag, include: [{ model: ProductTag, include: [{ model: Product}] }] }],
  });
  if (!TagData) {
    res.status(404).json({ message: 'No Id found with that id'});
    return;
  }

  res.status(200).json(TagData);

  res.status(500).json(err);
});

router.post('/', (req, res) => {
  // create a new tag
  const TagCreate = Tag.create(req.body);
  res.status(200).json(TagCreate);
  res.status(500).json(err);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const TagUpdate = Tag.update ({
    where: {
      id: req.params.id,
    },
  });

  if (!TagUpdate) {
    res.status(404).json({ message: 'No Tag found to update'});
    return;
  }

  res.status(200).json(TagUpdate);
  res.status(500).json(err);
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const TagData = Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!TagData) {
    res.status(404).json({ message: 'No Tag found with that ID' });
    return;
  }

  res.status(200).json(TagData);
  res.status(500).json(err);
});

module.exports = router;
