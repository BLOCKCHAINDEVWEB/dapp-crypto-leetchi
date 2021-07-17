import styled from 'styled-components'


export const BankStyle = styled.div`
  top: 0;
  margin-top: 70px;
  .participates {
    background: #fff;
    float: right;
    font-size: 1.5em;
    border-radius: 8px;
    min-width: 500px;
    min-height: 270px;
    margin: 2%;
    padding: 1%;
  }
  .group-infos {
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin: 15px 20px 50px 20px;
  }
  .group-infos label {
    display: block;
    font-size: .8em;
  }
  .contribute {
    text-align: center;
    margin: 0 auto;
  }
  .contribute img {
    vertical-align: text-top;
    margin-left: 10px;
  }
  .contribute input[type="text"] {
    font-size: 0.9em;
    width: 30%;
    margin: 15px 15px 0 20px;
    text-indent: 10px;
  }
  .contribute input[type="text"]:disabled {
    cursor: not-allowed;
  }
  .participates .group-submit {
    text-align: center;
    margin-top: 30px;
  }
  .participates input[type="submit"] {
    border: .1em solid #FFAF33;
    color: #fff;
    font-size: 0.9em;
    background-color: #FFAF33;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .Toastify__toast-container {
    margin-top: 400px;
  }
`
export const CardUnitStyle = styled.div`
  margin: 20px;
  font-size: 1.5em;
  .participates {
    float: right;
  }
  img {
    margin: 20px;
    border-radius: 4px;
  }
  div {
    background: #FFF;
    border-radius: 8px;
    min-height: 45vh;
  }
  h2 {
    padding-top: 3%;
    margin-left: 3%;
  }
  p {
    margin: 5%;
    text-align: justify;
  }
`