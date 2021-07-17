import styled from 'styled-components'

export const HomeStyle = styled.div`
  width: 100%;
  height: 100vh;
  background: url(https://leetchi.ethprod.xyz/img/soiree-anniversaire_450w800h.webp) no-repeat center center fixed;
  background-size: cover;
  background-position: center top 70px;
`
export const HomeTextImg = styled.div`
  color: #fff;
  text-align: center;
  .group-text {
    width: 100vw;
    bottom: 0;
    position: fixed;
    margin-bottom: 80px;
  }
  .group-text h1 {
    font-size: 3em;
    text-transform: uppercase;
  }
  .group-text p:nth-child(2) {
    font-size: 6em;
    margin: 30px;
    font-family: "Brush Script MT";
  }
  .group-text input[type="text"],
  .group-text input[type="button"] {
    font-size: 1.6em;
  }
  .group-text input[type="text"] {
    color: #000;
    border: .1em solid #fff;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    width: 500px;
    padding-left: 10px;
  }
  .group-text input[type="text"]:focus {
    border: .1em solid #fff;
    outline: none;
  }
  .group-text input[type="button"] {
    background-color: #FFAF33;
    color: #fff;
    border: .1em solid #FFAF33;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
  }
  .group-text p:last-child {
    background-color: rgba(255, 255, 255, 0.5);
    color: #570615;
    font-size: 1.5em;
    border-radius: 8px;
    margin: 40px 10% 0 10%;
  }
`