import styled from 'styled-components'


export const BanksStyles = styled.div`
  top: 0;
  margin-top: 70px;
  li {
    list-style: none;
    margin: 20px 0 20px 0;
  }
  .filter {
    width: 200px;
    margin: 20px;
    color: #000;
    &__menu {
      margin: 0 auto;
    }
    &__option {
      background-color: white;
      &--is-focused {
        background-color: lightblue;
      }
    }
    &__group {
      padding: 0;
    }
    &__menu-portal {
      border: 1px solid darkblue;
    }
  }
`
export const CardsStyle = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 1.2em;
    width: 300px;
    margin-right: 25px;
  }
  .wait-img {
    min-width: 150px;
    min-height: 150px;
    background: #fff;
  }
`
export const CardStyle = styled.li`
  padding: 1%;
  border-radius: 4px;
  border: .5px solid #000;
  position: relative;
  min-height: 510px;
  img {
    width: 100%;
    height: auto;
  }
  h2 {
    font-size: 1.1em;
  }
  p {
    text-align: justify;
  }
  input[type=button] {
    position: absolute;
    bottom: 3%;
    font-size: 1.2em;
    background-color: blue;
    color: white;
    padding: 0.5em;
    border: 0 solid blue;
    border-radius: 4px;
    cursor: pointer;
  }
`