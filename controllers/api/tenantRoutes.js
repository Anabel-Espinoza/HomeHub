const router = require('express').Router();
const { Tenant } = require('../../models');
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const tenantData = await Tenant.create(req.body);

    if (!tenantData) {
      res
        .status(400)
        .json({ message: 'Passwords must be at least 8 characters in length' });
      return;
    }
    const tenant = tenantData.get({ plain: true });

    // res.body.tenant_id = tenant.id;

    console.log("new tenant ID is:", tenant.id);
    console.log("tenant will be staying in unit:", req.body.unit);
    // update unit to set is_vacant to false 
    // update unit to set move_in_date to now
    // update unit to set tenant_id to tenant.id
    
    // const response = await fetch(`/api/landlord/${req.body.unit}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ is_vacant: false, tenant_id: tenant.id}),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    // if (response.ok) {
    //   console.log(`Tenant ${tenant.name} will be staying in unit ${req.body.unit}`);
    // } else {
    //   alert("Failed to add Tenant to Unit");
    // }

    res.status(200).json(tenantData);

    // });
  } catch (err) {
    res.status(400).json({ message: 'Passwords must be at least 8 characters in length' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const tenantData = await Tenant.findOne({ where: { email: req.body.email } });
    console.log('---------', tenantData.get({plain:true}))
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
