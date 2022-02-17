const { query } = require("express");
const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class NoteServices {
  constructor() {
    this._pool = new Pool();
  }

  async addNotes({ title, body }) {
    const id = `notes-${nanoid(16)}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: "INSERT INTO notes VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [id, title, body, createAt, updateAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error("Notes gagal ditambahkan");
    }

    return result.rows[0];
  }

  async getNotes() {
    const result = await this._pool.query("SELECT * FROM notes");
    return result.rows;
  }

  async getNotesById(notesId) {
    const query = {
      text: "SELECT * FROM notes WHERE id = $1",
      values: [notesId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new Error("Notes tidak ditemukan");
    }

    return result.rows[0];
  }

  async editNotesById(notesId, {title, body}) {
      const updateAt = new Date().toISOString();
      const query = {
          text: "UPDATE notes SET title = $1, body = $2, update_at = $3 WHERE id = $4 RETURNING id",
          values: [title, body, updateAt, notesId]
      }
      const result = await this._pool.query(query);

      if(!result.rowCount){
          throw new Error('Note tidak dapat dirubah, Id tidak ditemukan');
      }
  }

  async deleteNotesById(noteId){
      const query = {
        text: "DELETE FROM notes WHERE id = $1",
        values: [noteId]
      }
      const result = await this._pool.query(query);

      if(!result.rowCount){
          throw new Error('Gagal menghapus note, Id tidak ditemukan');
      }
  }
}

module.exports = NoteServices;