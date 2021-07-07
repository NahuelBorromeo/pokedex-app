import React from 'react'

export const Pagination = ({onLeftClick, onRightClick, page, totalPages}) => {


    return (
        <div className="pagination">
            <button onClick={onLeftClick}>
                <div>⬅</div>
            </button>
            <div>{page + 1} de {totalPages + 1}</div>
            <button onClick={onRightClick}>
                <div>➡</div>
            </button>
        </div>
    )
}
