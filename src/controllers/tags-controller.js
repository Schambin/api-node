const knex = require("../database/knex");

class TagsController {
    async list(req, res) {
        const { user_id } = req.params;

        const tags = await knex('tags')
            .where({ user_id })
            .orderBy('id');

        return res.json({
            tags
        })
    }
}
module.exports = TagsController;