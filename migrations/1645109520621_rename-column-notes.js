/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('notes', 'createAt', 'create_at');
    pgm.renameColumn('notes', 'updateAt', 'update_at');
};

exports.down = pgm => {
    pgm.dropColumn('notes', 'createAt');
    pgm.dropColumn('notes', 'updateAt');
};
