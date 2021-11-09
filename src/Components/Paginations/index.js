import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import styled from "styled-components";

const range = (from, to) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += 1;
  }
  return range;
};
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const pageNeighbours = 1;

function Paginations(props) {
  const [currentPage, setCurrentPage] = useState(1);  
  const { totalPages } = props; 
  const {url} = useRouteMatch(); 
  const history = useHistory();    

  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const getPage = useQuery().get('page'); 

  useEffect(() => {
    if (getPage===null) {
      setCurrentPage(1)
    }
  },[getPage])

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftButton = startPage > 2;
      const hasRightButton = totalPages - endPage > 1;
      const buttonOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftButton && !hasRightButton:
          {
            const extraPages = range(startPage - buttonOffset, startPage - 1);
            pages = [LEFT_PAGE, ...extraPages, ...pages];
          }
          break;

        case !hasLeftButton && hasRightButton:
          {
            const extraPages = range(endPage + 1, endPage + buttonOffset);
            pages = [...pages, ...extraPages, RIGHT_PAGE];
          }
          break;

        case hasLeftButton && hasRightButton:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages)); 
    setCurrentPage(currentPage);
  };
  
  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
    history.push(`${url}?page=${page}`)   
    
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };
  
  return (
    <div style={{ width: "100%", marginBottom: '12px'}}>
      <PaginationContainer>
      {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <a
                    key={index}
                    className="btn first"                    
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                    // to = {`/danh-muc/${slug}?page_${Math.max(0, Math.min((currentPage - pageNeighbours * 2 - 1), totalPages))}`}
                  >
                    {'<<'}
                  </a>
                );

              if (page === RIGHT_PAGE)
                return (
                  <a
                    key={index}
                    className="btn last"                    
                    aria-label="Next"
                    onClick={handleMoveRight}
                    // to = {`/danh-muc/${slug}?page_${Math.max(0, Math.min((currentPage + pageNeighbours * 2 + 1), totalPages))}`}
                  >
                    {'>>'}
                  </a>
                );

              return (
                <a
                  className={`btn ${currentPage === page ? 'active': ''}`}                  
                  // to = {`/danh-muc/${slug}?page_${page}`}
                  key={index}
                  onClick={handleClick(page)}
                >
                  {page}
                </a>
              );
            })}
      </PaginationContainer>
    </div>
  );
}

export default React.memo(Paginations);

const PaginationContainer = styled.div`
  display: flex;
  width: max-content;
  margin: 0 auto;

  .btn {
    display: block;
    text-align: center;
    width: 30px;
    height: 28px;
    color: black;
    padding: 2px;
    text-decoration: none;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 50%;
    cursor: default;
    user-select: none;
    &:hover:not(.active, .disabled) {
      background-color: #ccc;
    }
  }

  .first,
  .last,
  .next,
  .prev {
    font-size: 12px;
  }
  .active {
    background-color: #4caf50;
    color: white;
    border: 1px solid #4caf50;
    font-weight: bold;
  }
  .disabled {
    color: #ccc;
  }
`;
