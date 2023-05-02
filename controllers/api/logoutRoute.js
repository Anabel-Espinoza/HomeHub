const router = require("express").Router();

router.post('/', (req, res) => {
    req.session.destroy(() => {
         res.status(204).end();
    })
    // if (req.session.logged_in) {
    //     req.session.destroy(() => {
    //         res.status(204).end();
    //     });
    // } else {
    //     res.status(404).end();
    // }
});

module.exports = router;