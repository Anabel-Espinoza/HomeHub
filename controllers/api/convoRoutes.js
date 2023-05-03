const router = require("express").Router();
const { Convo } = require("../../models/index");

router.get("/", async (req, res) => {
    try {
        const convoData = await Convo.findAll();
        res.status(200).json(convoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const convoData = await Convo.create(req.body);
        res.status(200).json(convoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;