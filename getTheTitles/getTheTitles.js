const getTheTitles = function(books={}) {
    return books.reduce((titles, book) => {
        titles.push(book.title);
        return titles;
    }, []);
}

module.exports = getTheTitles;
