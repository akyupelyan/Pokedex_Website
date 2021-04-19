import React from 'react';

import './pagination.css'

export default function Pagination ({ goNextPage, goPrevPage, hasNextPage, hasPrevPage}) {
    return (
        <div>
            <button className="pgBtn" onClick={goPrevPage} disabled={!hasPrevPage}>Previous</button>
            <button className="pgBtn float-lg-right" onClick={goNextPage} disabled={!hasNextPage}>Next</button>
        </div>
    )
}