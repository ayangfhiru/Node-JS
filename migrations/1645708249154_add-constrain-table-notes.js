/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addConstrain(
      "notes",
      "fk_notes.tag_id_tag.id",
      "FOREGIN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE"
    );
};

exports.down = pgm => {
    pgm.dropConstrain('note', 'fk_notes.tag_id_tag.id')
};
