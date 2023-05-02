const router = require('express').Router();
const { Landlord, Tenant, Unit, Maintenance } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);

  }
});

// Use withAuth middleware to prevent access to route
router.get('/tenant', withAuth, async (req, res) => {
  try {
    // Find the logged in tenant based on the session ID
    const tenantData = await Tenant.findByPk(req.session.tenant_id, {
      attributes: { exclude: ['password'] },
    });

    const tenant = tenantData.get({ plain: true });

    const unitData = await Unit.findOne({
      where: {
        tenant_id: req.session.tenant_id,
        },
      include: [{ model: Maintenance, where: { is_closed: false } }]
    });
    if (unitData) {
      const unit = unitData.get({ plain: true });
      res.render('tenant', {
        ...tenant,
        unit,
        logged_in: true
      });
    } else {
      console.log('not units found************')
      res.render('tenant', {
        ...tenant,
        logged_in: true
      })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/landlord', withAuth, async (req, res) => {
  try {
    // Find the logged in landlord based on the session ID
    const landlordData = await Landlord.findByPk(req.session.landlord_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Unit }],
    });

    const landlord = landlordData.get({ plain: true });
    console.log(landlord)
    res.render('landlord', {
      ...landlord,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/properties', withAuth, async (req, res) => {
  try {
    // Find the logged in landlord based on the session ID
    const landlordData = await Landlord.findByPk(req.session.landlord_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Unit }],
    });

    const landlord = landlordData.get({ plain: true });
    console.log(landlord)
    res.render('properties', {
      ...landlord,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/landlord'); // update route after logging in
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/landlord')
    return
  }
  res.render('signup')
})

router.get('/landlord/unit/:id', withAuth, async (req, res) => {
  try {
    const unitById = await Unit.findByPk(req.params.id, {
      include: [{
        model: Tenant,
        attributes: { exclude: ['password'] }
      }, {
        model: Maintenance,
      },
      ]
    })
    const unit = unitById.get({ plain: true })
    console.log(unit)
    res.render('unit', { unit, logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/landlord/account', withAuth, async (req, res) => {
  try {
    const landlordData = await Landlord.findByPk(req.session.landlord_id, {
      attributes: {
        exclude: ["password"],
      },
    });
    const unitData = await Unit.findAll({
      where: {
        landlord_id: req.session.landlord_id,
      },
      include: [{
        model: Tenant,
        attributes: {
          exclude: ["password"],
        },
      }],
    });

    const landlord = landlordData.get({ plain: true });
    const units = unitData.map((eachUnit) => eachUnit.get({ plain: true }));
    res.render("account", {
      landlord,
      units,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get('/maintenance', withAuth, async (req, res) => {
  try {
    const maintenanceData = await Maintenance.findAll({
      where: { landlord_id: req.session.landlord_id }
    });
    const maintenance = maintenanceData.map(m => m.get({ plain: true }));

    res.render('maintenancePage', {
      maintenance,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/tenant/unit/:id', withAuth, async (req, res) => {
  try {
    const unitById = await Unit.findByPk(req.params.id, {
      include: [{
        model: Tenant,
        attributes: { exclude: ['password'] }
      }, {
        model: Maintenance, where: { tenant_id: req.session.tenant_id }}],
    })
    const unit = unitById.get({ plain: true })
    console.log(unit)
    res.render('unit-tenant', { unit, logged_in: true })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/tenant/maintenance/:id', withAuth, async (req, res) => {
  try {
    const unitById = await Unit.findByPk(req.params.id, {
      include: [{
        model: Maintenance,
        where: { tenant_id: req.session.tenant_id }
      }]
    })

    const unit = unitById.get({ plain: true })
    console.log(unit)
    res.render('maintenance-tenant', { unit, logged_in: true })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
