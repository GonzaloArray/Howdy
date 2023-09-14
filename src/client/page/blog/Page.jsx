import React from "react";
import { Search } from "@mui/icons-material";
import {
  neutral,
  neutral10,
  primary,
  primary120,
  primary20,
  primary25,
  secondary120,
} from "../../../common/variables";
import { styled } from "styled-components";
import { Container, Link } from "@mui/material";

const ContainerSearch = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const InputSearch = styled.input`
  color: ${primary};
  background: #fcf1f8;
  border-radius: 20px;
  width: 450px;
  height: 50px;
  padding: 20px;
  margin: 10px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  margin: auto;
  right: 20px;
  color: ${primary};
  pointer-events: none;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  background: #da7fbb;
`;

const Title = styled.h1`
  font-size: 25px;
  color: primary;
`;

export const Page = () => {
  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <ContainerSearch>
          <InputSearch type="search" placeholder="Buscar" />
          <SearchIcon />
        </ContainerSearch>
      </Container>

      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "100vw",
          gap: "20px",
        }}
      >
        <Box />
        <Title>5 maneras creativas para prácticar y mejorar un idioma</Title>
        <Link style={{ color: "#da7fbb" }}>Lee la guía completa</Link>
      </Container>
    </>
  );
};
