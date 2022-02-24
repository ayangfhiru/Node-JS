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

}

module.exports = TagServices;