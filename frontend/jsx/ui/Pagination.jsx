export default function Pagination(props) {
    let recipes = props.recipes;
    // if we have no recipes then return nothing
    if ((recipes === null) || (recipes.length === 0)) {
        return (
            <div></div>
        );
    }

    let currentPageNumber = props.currentPageNumber;
    let totalNumberOfPages = props.totalNumberOfPages;
    let nextHandler = props.nextHandler;
    let previousHandler = props.previousHandler;
    let pageHandler = props.pageHandler;

    // construct an array for the number of pages
    let pages = [];
    for (let index = 0;index < totalNumberOfPages;index++) {
        pages.push("" + (index+1));
    }

    const pageButtons = pages.map((pageNumber, index) =>
        <li key={index}>
            <a page-number={pageNumber}
               className={(currentPageNumber == (index+1)) ? "pagination-link is-current" : "pagination-link"}
               aria-label={"Goto page " + pageNumber} onClick={pageHandler}>{pageNumber}</a>
        </li>
    );


    return (
        <nav className="pagination is-rounded is-centered" role="navigation"
             aria-label="pagination">
            <a className="pagination-previous" disabled={(currentPageNumber == 1)}
               onClick={previousHandler}>Previous</a>
            <a className="pagination-next" disabled={(currentPageNumber == totalNumberOfPages)} onClick={nextHandler}>Next
                page</a>
            <ul className="pagination-list">
                {pageButtons}
            </ul>
        </nav>
    )
}
