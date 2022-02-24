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

route.get("/tags/:id", async(req, res) => {
    const tagId = req.params.id;
    const tags = await new TagServices().getTagById(tagId);
    const notes = await new TagServices().getNotesByIdTags(tagId);

    const data = {
        id: tags.id,
        name: tags.name,
        countNotes: notes.rowCount,
        notes: notes.rows.map((element) => ({
            id: element.id,
            title: element.title,
            body: element.body
        }))
    }

    res.json({
        status: 'Success',
        data: data
    })
})

module.exports = route;