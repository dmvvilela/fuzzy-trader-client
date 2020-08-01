const router = require("express").Router();
let Asset = require("../models/asset.model");

router.route("/").get((req, res) => {
  Asset.find()
    .then((assets) => res.json(assets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Asset.findById(req.params.id)
    .then((asset) => res.json(asset))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const value = req.body.value;
  const date = new Date();
  const newAsset = new Asset({ name, type, value, date });

  newAsset
    .save()
    .then(() => res.json("Asset added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Asset.findById(req.params.id)
    .then((asset) => {
      asset.name = req.body.name;
      asset.type = req.body.type;
      asset.value = Number(req.body.value);
      asset.date = new Date();

      asset
        .save()
        .then(() => res.json("Asset updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Asset.findByIdAndDelete(req.params.id)
    .then((asset) => res.json("Asset deleted."))
    .catch((err) => res.status(400).json("error: " + err));
});

module.exports = router;
