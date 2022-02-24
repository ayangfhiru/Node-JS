const express = require("express");
const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class TagServices{
    constructor(){
        this._pool = new Pool();
    }

    async addTags({name}){
        const id = `tag-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO tags VALUES($1, $2) RETURNING id',
            values: [id, name]
        }
        const result = await this._pool.query(query);
        return result.rows
    }

    async getTags(){
        const result = await this._pool.query("SELECT * FROM tags");
        return result.rows;
    }

    async getTagById(tagId){
        const query = {
            text: 'SELECT * FROM tags WHERE id = $1',
            values: [tagId]
        }
        const result = await this._pool.query(query);
        return result.rows[0]
    }

    async getNotesByIdTags(tagId){
        const query = {
            text: 'SELECT notes.* FROM notes JOIN tags ON tags.id = notes.tag_id WHERE tags.id = $1',
            values: [tagId]
        }
        const result = await this._pool.query(query);
        return result;
    }

}

module.exports = TagServices;