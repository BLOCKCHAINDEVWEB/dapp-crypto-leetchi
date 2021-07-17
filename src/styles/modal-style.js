import styled from 'styled-components'


export const ModalBackdrop = styled.div`
  z-index: 30;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
`
export const ModalWrapper = styled.div`
  overflow: hidden;
  background: #FFFDFF;
  color: #000;
  border: .5px solid #eee;
  width: ${props => props.width};
  height: ${props => props.height};
  margin-top: ${props => props.top};
  bottom: 0;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  padding: 0 0 12px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  text-align: justify;
`
export const ModalHeader = styled.header`
  display: flex;
  flex-wrap: nowrap;
  font-size: 1.3em;
  text-align: center;
  color: #000;
  height: 40px;
  margin-bottom: 50px;
  h3 {
    flex-grow: 4;
    text-align: center;
    top: 15px;
  }
  .dropdown-modal {
    text-align: center;
    margin-top: 25px;
  }
  .dropdown-modal button {
    color: #fff;
    border-radius: 4px;
    background-color: #FFAF33;
    padding: 4px 10px;
    cursor: pointer;
  }
`
export const ModalBody = styled.div`
  font-size: 1.4em;
  padding-right: 30px;
  padding-left: 30px;
  height: 200px;
`
export const DropdownModal = styled.div`
  .menu {
    position relative;
    right: 0.6em;
    top: 15px;
    font-size: 0.85em;
    background: #ffffff;
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
    color: #FFF;
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