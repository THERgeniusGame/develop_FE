import styled from "styled-components";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const Pagination = ({ total, limit, page, setPage }) => {
    const numPages = Math.ceil(total / limit);
    const token = localStorage.getItem("token");

    const [rooms, setRooms] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [roomPerPage, setRoomPerPage] = useState(9);

    useEffect(()=> {
      const data = axios.get(
        process.env.REACT_APP_SURVER + `/api/room`,
        {
          headers: {
          authorization: `Bearer ${token}`,
          },
        }

        )
        console.log(data)
    }, [])
       

    return (
        <>
            <Nav>
                
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </Button>
                    ))}
                
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

export default Pagination;