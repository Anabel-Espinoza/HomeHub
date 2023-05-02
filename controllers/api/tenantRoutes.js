const router = require('express').Router();
const { Tenant } = require('../../models');
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const tenantData = await Tenant.create(req.body);
    console.log('tenant data-------', tenantData)
    if (!tenantData) {
      res
        .status(400)
        .json({ message: 'Passwords must be at least 8 characters in length' });
      return;
    }

    res.status(200).json(tenantData);
    // });
  } catch (err) {
    res.status(400).json({ message: 'Passwords must be at least 8 characters in length' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tenantData = await Tenant.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    }
    );
    if (!tenantData) {
      res.status(400).json({ message: "No account with that id found" });
    };
    res.status(200).json({ message: "Password has been updated" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const tenantData = await Tenant.findOne({ where: { email: req.body.email } });

    if (!tenantData) {
      res
        .status(400)
        .json({ message: 'Invalid email , please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      tenantData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.tenant_id = tenantData.id;
      req.session.logged_in = true;

      res.json({ tenant: tenantData, message: 'You are now logged in!' });
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
