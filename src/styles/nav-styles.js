import styled from 'styled-components'

export const HeaderNav = styled.header`
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 70px;
  background: white;
  font-size: 1.1em;
  padding: 0 0 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1;
`
export const TitleNav = styled.h1`
  font-size: 1.6em;
  color: #000;
  margin: 0 0 0 10px;
`
export const BodyNav = styled.nav`
  width: 100%;
  margin-left: 50px;
  ul {
    display: flex;
    font-size: 1.1em;
    padding: 0;
    list-style: none;
    align-items: center;
    justify-content: space-between;
  }
  li {
    text-align: center;
  }
  li:nth-child(1n),
  li:nth-child(2n),
  li:nth-child(3n) {
    flex-grow: 4;
  }
  li:nth-child(4n),
  li:nth-child(5n),
  li:nth-child(6n) {
    flex-grow: 1;
  }
  a {
    color: #000;
  }
  a: link {
    text-decoration: none;
  }
  .dropdown {
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    margin-right: 15px;
  }
  .btn-connect {
    color: #fff;
  }
  .btn-connect img {
    width: 40px;
    border-radius: 50%;
    margin-top: 4px;
  }
  .btn-connect button {
    background-color: #E74C3C;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
  }
  .btn-connect p {
    border-radius: 4px;
    padding: 4px 10px;
    margin: 0;
    cursor: default;
  }
  .btn-connect .close {
    background-color: #E74C3C;
  }
  .btn-connect .open {
    background-color: #52BE80;
  }
`
export const DropdownNav = styled.li`
  z-index: 2;
  button {
    color: #fff;
    border-radius: 4px;
    background-color: #FFAF33;
    padding: 4px 10px;
    cursor: pointer;
  }
  .menu {
    position absolute;
    top: 80px;
    right: 10%;
    font-size: 1.2em;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    text-align: center;
  }
  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .menu ul {
    position: relative;
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu li {
    width: 280px;
    height: 45px;
    margin: 0;
    border-bottom: 1px solid #ccc;
    line-height: 50px;
  }
  .menu li:hover {
    background: #4169E1;
    color: #fff;
  }
  .menu li:first-child {
    padding: 0;
    margin: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .menu li:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: none;
  }
`
