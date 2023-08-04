const Article = require('../../model/Article');

const count = ({ search = '' }) => {
    const filter = {
        title: { $regex: search, $options: 'i' },
    };

    return Article.count(filter);
};
module.exports = count;