const router = require("express").Router();
const { Maintenance } = require("../../models/index");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const maintData = await Maintenance.findAll();
        res.status(200).json(maintData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const maintData = await Maintenance.create({
            ...req.body,
            // tenant_id: req.session.tenant_id,
        });

        res.status(200).json(maintData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const maintData = await Maintenance.update(req.body, {
            where: {
                id: req.params.id,
                // landlord_id: req.session.landlord_id,
            }
        });

        if (!maintData) {
            res.status(400).json({ message: "There is no maintenance request with that id" });
            return;
        }
        res.status(200).json({
            // ...maintData,
            message: "Maintenance request has been successfully updated",
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const maintData = await Maintenance.destroy({
            where: {
                id: req.params.id,
                // landlord_id: req.session.landlord_id,
            },
        });

        if (!maintData) {
            res.status(400).json({ message: "There is no maintenance entry with that id" });
            return;
        }
        res.status(200).json({
            maintData,
            message: "Maintenance entry has been successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            err,
            message: "Not authorized to delete or edit this maintenance entry"
        });
    }
});

module.exports = router;