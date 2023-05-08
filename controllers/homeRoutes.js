const router = require('express').Router();
const { Landlord, Tenant, Unit, Maintenance, Convo, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
      landlord_id: req.session.landlord_id
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
      include: [
        { model: Maintenance }
      ]
    });
    const tenant = tenantData.get({ plain: true });
    let ticketStatus = false;
    const maint = tenant.maintenances;
    // check maintenance array for open tickets
    for (let i = 0; i < maint.length; i++) {
      if (maint[i].is_closed == false) {
        ticketStatus = true;
      }
    }


    const unitData = await Unit.findOne({
      where: {
        tenant_id: req.session.tenant_id,
      },
    },
    );

    if (unitData) {

      const unit = unitData.get({ plain: true });

      res.render('tenant', {
        ...tenant,
        open_tickets: ticketStatus,
        unit,
        logged_in: true
      });
    } else {
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
      include: [
        { model: Unit },
        { model: Maintenance, }
      ],
    });

    // If landlord has unclosed maintenance, open_tickets will be true.
    const landlord = landlordData.get({ plain: true });
    let ticketStatus = false;
    const maint = landlord.maintenances;

    for (let i = 0; i < maint.length; i++) {
      if (maint[i].is_closed == false) {
        ticketStatus = true;
      }
    }

    res.render('landlord', {
      ...landlord,
      open_tickets: ticketStatus,
      logged_in: true,
      landlord_id: req.session.landlord_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/landlord/properties', withAuth, async (req, res) => {
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
      logged_in: true,
      landlord_id: req.session.landlord_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.landlord_id) {
    res.redirect('/landlord');
    return;
  } else if (req.session.tenant_id) {
    res.redirect("/tenant");
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
    res.render('unit', { unit, logged_in: req.session.logged_in, landlord_id: req.session.landlord_id })
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
    console.log(units)
    res.render("account", {
      landlord,
      units,
      logged_in: req.session.logged_in,
      landlord_id: req.session.landlord_id
    })
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get('/landlord/maintenance', withAuth, async (req, res) => {
  try {
    const maintenanceData = await Maintenance.findAll({
      where: { landlord_id: req.session.landlord_id },
    });
    const maintenance = maintenanceData.map(m => m.get({ plain: true }));
    console.log('maintenance *****', maintenance)
    res.render('maintenancePage', {
      maintenance,
      logged_in: req.session.logged_in,
      landlord_id: req.session.landlord_id
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
        model: Landlord,
        attributes: { exclude: ["password"] }
      }],
    })
    
    const unit = unitById.get({ plain: true })
    console.log('*********', unit)
    
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

    if (unitById) {
      const unit = unitById.get({ plain: true })
      console.log(unit)
      res.render('maintenance-tenant', { unit, logged_in: true })
    } else {
      res.render('maintenance-tenant', { logged_in: true })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/landlord/posts', withAuth, async (req, res) => {
  try {
    const convoLandlord = await Convo.findAll({
      where: { landlord_id: req.session.landlord_id },
      include: [{
        model: Comment,
        include: [
          {
            model: Landlord,
            attributes: {
              exclude: ["password"]
            },
          }, {
            model: Tenant,
            attributes: {
              exclude: ["password"]
            }
          }
        ]
      }, {
        model: Landlord,
        attributes: {
          exclude: ["password"]
        }
      }, {
        model: Tenant,
        attributes: {
          exclude: ["password"]
        }
      }],
      order: [["date_submitted", "DESC"]]
    });
    const convo = convoLandlord.map(m => m.get({ plain: true }));
    console.log('***********', convo)

    const tenants = await Unit.findAll({
      where: { landlord_id: req.session.landlord_id }, 
      include: [{
        model: Tenant, attributes: { exclude: ['password'] }
      }]
    })

    const allTenants = tenants.map(m => m.get({ plain: true }));
    console.log('all tenants ********', allTenants)
    res.render('landlord-posts', {
      convo,
      allTenants,
      logged_in: req.session.logged_in,
      landlord_id: req.session.landlord_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/tenant/posts', withAuth, async (req, res) => {
  try {
    const convoTenant = await Convo.findAll({
      where: { tenant_id: req.session.tenant_id },
      include: [{
        model: Comment,
        include: [
          {
            model: Landlord,
            attributes: {
              exclude: ["password"]
            },
          }, {
            model: Tenant,
            attributes: {
              exclude: ["password"]
            }
          }
        ]
      }, {
        model: Landlord,
        attributes: {
          exclude: ["password"]
        }
      }, {
        model: Tenant,
        attributes: {
          exclude: ["password"]
        }
      }],
      order: [["date_submitted", "DESC"]]
    });
    const convoData = convoTenant.map(m => m.get({ plain: true }));

    const tenantData = await Unit.findOne({
      where:
        { tenant_id: req.session.tenant_id },
      include: [
        {
          model: Landlord,
          attributes: {
            exclude: ["password"]
          }
        }, {
          model: Tenant,
          attributes: {
            exclude: ["password"]
          }
        }]
    })

    const tenant = tenantData.get({ plain: true })
    console.log('***********', convoData)
    console.log('***********', tenant)

    res.render('tenant-posts', {
      convoData,
      tenant,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
