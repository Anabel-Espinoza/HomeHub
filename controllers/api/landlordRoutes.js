const router = require('express').Router();
const { Landlord, Unit, Tenant } = require('../../models');
const bcrypt = require('bcrypt');

router.get("/:id", async (req, res) => {
  try {
    const landlordData = await Landlord.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
      include: [{
        model: Unit,
        include: [{
          model: Tenant,
          attributes: {
            exclude: ["password"],
          }
        }]
      }],
    });
    res.status(200).json(landlordData);
  } catch (err) {
    res.status(500).json(err);
  };
});

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

router.put("/unit/:id", async (req, res) => {
  try {
    const tenantData = await Tenant.findOne({ where: { email: req.body.email } });
    // console.log('---------', tenantData.get({plain:true}));
    if (!tenantData) {
      res
        .status(404)
        .json({ message: 'So such tenant email found.' });
      return;
    }  else {

      // console.log('---------\n', tenantData.get({plain:true}));
      // console.log(`looking to add new tenant_id: ${tenantData.id} to unit ID: ${req.body.unit}`);
      // console.log(req.body);

      const attempt  = await Unit.update( 
        { tenant_id: 7 }, 
        {
          where: { 
          id: req.params.id
        }
      });
     
      if ( !attempt ) {
        res
          .status(404)
          .json({ message: 'udpate failed.' });
        return;
      } else {
        res.status(200).json(  attempt  );
      }
    }

  } catch (err) {
    res.status(400).json(err);
  }
}
);

router.put("/:id", async (req, res) => {
  try {
    const landlordData = await Landlord.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    }
    );
    if (!landlordData) {
      res.status(400).json({ message: "No account with that id found" });
    };
    res.status(200).json({ message: "Update landlord's info successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const landlordData = await Landlord.findOne({ where: { email: req.body.email } });

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

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
