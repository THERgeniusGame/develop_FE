import styled from "styled-components";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const PaginationMyPage = ({ activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, limit, setPage, page }) => {
    const numPages = Math.ceil(itemsCountPerPage / limit);
    const token = localStorage.getItem("token");

       
    return (
        <>
            <Nav>
                {Array(numPages)
                    .fill()
                    .map((_, idx) => (
                        <Button
                            key={idx + 1}
                            onClick={() => setPage(idx + 1)}
                            aria-current={page === idx + 1 ? "page" : null}
                        >
                            {idx + 1}
                        </Button>
                    ))
                }
            </Nav>
        </>
    );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 30px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 4px;
  font-size: 18px;
  background: none;
  &:hover {
    background: black;
    color: white;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
  }
  &[aria-current] {
    font-weight: bold;
    background: black;
    color: white;
  }
`;

export default PaginationMyPage;