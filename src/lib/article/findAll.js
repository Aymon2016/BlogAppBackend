const Article = require('../../model/Article');

const findAll = ({
    page = 1,
    limit = 10,
    sortType = 'dsc',
    sortKey = 'updatedAt',
    search = '',
}) => {
    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortKey}`;
    const filter = {
        title: { $regex: search, $options: 'i' },
    };

    return Article.find(filter)
        .populate({ path: 'author', select: 'name' })
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit);
};
module.exports = findAll;