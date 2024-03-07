const feed = require('../models/feed.server.models');
const users = require("../models/user.server.models");







const get_feed = (req, res) => {
    const token = req.get('X-Authorization');

    users.getIdFromToken(token, (err, user_id) => {
        if (err === 404) {
            feed.getFeed(null, (err, result) => {
                if (!result) return res.sendStatus(404);
                if (err) return res.sendStatus(500);
                console.log(result)
                return res.status(200).json(result);
            });
        } else if (err) {
            return res.sendStatus(500);
        } else {
            feed.getFeed(user_id, (err, result) => {
                if (!result) return res.sendStatus(404);
               // console.log(result)
                if (err) return res.sendStatus(500);
                return res.status(200).json(result);
            });
        }
    });
};

module.exports = {
    get_feed:get_feed
};