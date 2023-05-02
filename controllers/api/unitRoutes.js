const router = require('express').Router();
const { Unit } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newUnit = await Unit.create({
      ...req.body,
      landlord_id: req.session.landlord_id,
    });

    res.status(200).json(newUnit);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('landlord/:id', withAuth, async (req, res) => {
  console.log("new unit data object is:", req.body)
  // try {
  //   const unitData = await Unit.update(req.body, {
  //     where: {
  //       id: req.params.id,
  //     }
  //   });

  //   if (!unitData) {
  //     res.status(400).json({ message: "There is no unit with that id" });
  //     return;
  //   }
  //   res.status(200).json({
  //      ...unitData,
  //     message: "Unit data has been successfully updated",
  // });

  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const unitData = await Unit.destroy({
      where: {
        id: req.params.id,
        landlord_id: req.session.landlord_id,
      },
    });

    if (!unitData) {
      res.status(404).json({ message: 'No unit found with this id!' });
      return;
    }

    res.status(200).json(unitData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
