

export default function PaginationButtons({ setDisplayedPage, displayedPage, numberOfPages }) {
    return (
        <div className="d-flex flex-row gap-2 justify-content-center my-3">
            <button className="rounded-pill btn btn-secondary" onClick={() => {setDisplayedPage(0)}} disabled={displayedPage == 0 ? true : false}>{"<<"}</button>
            <button className="rounded-pill btn btn-secondary" onClick={() => {setDisplayedPage(prevState => prevState - 1)}} disabled={displayedPage == 0 ? true : false}>{"<"}</button>
            {Array(displayedPage > 3 ? 3 : displayedPage).fill(1).map((e, i) => <button onClick={() => {setDisplayedPage(displayedPage - i - 1)}} className="rounded-pill btn btn-secondary">{displayedPage - i}</button>)}
            <div className="rounded-pill btn btn-primary">{displayedPage + 1}</div>
            {numberOfPages > 1 && Array(numberOfPages - (displayedPage + 1) > 3 ? 3 : numberOfPages - (displayedPage + 1)).fill(1).map((e, i) => <button onClick={() => {setDisplayedPage(displayedPage + i + 1)}} className="rounded-pill btn btn-secondary">{displayedPage + i + 2}</button>)}
            <button className="rounded-pill btn btn-secondary" onClick={() => {setDisplayedPage(prevState => prevState + 1)}} disabled={displayedPage + 1 == numberOfPages ? true : false}>{">"}</button>
            <button className="rounded-pill btn btn-secondary" onClick={() => {setDisplayedPage(1000000)}} disabled={displayedPage + 1 == numberOfPages ? true : false}>{">>"}</button>
        </div>
    );
}