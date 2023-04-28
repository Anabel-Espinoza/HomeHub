const router = require('express').Router();
const { Landlord } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const landlordData = await Landlord.create(req.body);

    if (!landlordData) {
      res
        .status(400)
        .json({ message: 'Passwords must be at least 8 characters in length' });
      return;
    }

    req.session.save(() => {
      req.session.landlord_id = landlordData.id;
      req.session.logged_in = true;

      res.status(200).json(landlordData);
    });
  } catch (err) {
    res.status(400).json({ message: 'Passwords must be at least 8 characters in length' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const landlordData = await Landlord.findOne({ where: { email: req.body.email } });
    console.log(landlordData.get({plain:true}))
    console.log('-----------', req.body.email, req.body.password)
    if (!landlordData) {
      res
        .status(400)
        .json({ message: 'Invalid email, please try again' })
      return
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      landlordData.password
    );
    
    if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
        return;
      }

      req.session.save(() => {
      req.session.landlord_id = landlordData.id;
      req.session.logged_in = true;
      
      res.json({ user: landlordData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
