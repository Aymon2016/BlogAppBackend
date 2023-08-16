const defaults = require('../config/defaults')
const generateQueryString = require('./qs')

const getPagination = (totalItems = defaults.totalItems, page = defaults.page, limit = defaults.limit) => {

    const totalPage = Math.ceil(totalItems / limit);



    const pagination = {
        page,
        limit,
        totalItems,
        totalPage,
    };

    if (page < totalPage) {
        pagination.next = page + 1;
    }

    if (page > 1) {
        pagination.prev = page - 1;
    }

    return pagination;
}


const getHeteOASForAllItems = ({ url = '/', path = '', query = {}, hasNext, hasPrev, page = 1 }) => {

    const links = {
        self: url,
    };

    if (hasNext) {
        const querystr = generateQueryString({ ...query, page: page + 1 });
        links.next = `${path}?${querystr}`;
    }
    if (hasPrev) {
        const querystr = generateQueryString({ ...query, page: page - 1 });
        links.prev = `${path}?${querystr}`;
    }
    return links;
}



const getTransformedItems = ({ items = [], selection = [], path = '/' }) => {
    if (!Array.isArray(items) || !Array.isArray(selection)) {
        throw new Error('Invalid selection');
    }

    if (selection.length === 0) {
        return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));
    }

    return items.map((item) => {
        const result = {};
        selection.forEach((key) => {
            result[key] = item[key];
        });
        result.link = `${path}/${item.id}`;
        return result;
    });
};

module.exports = { getPagination, getHeteOASForAllItems, getHeteOASForAllItems };