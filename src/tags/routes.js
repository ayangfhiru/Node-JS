const express = require("express");
const TagServices = require("./services");
const route = express.Router();

route.post('/tags', async(req, res) => {
    const name = req.body;
    const tags = await new TagServices().addTags(name);
    res.json({
        status: 'Success',
        data: tags
    });
})

route.get("/tags", async (req, res) => {
  const tags = await new TagServices().getTags();
  res.json({
    status: "Success",
    data: tags,
  });
});

module.exports = route;