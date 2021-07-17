import styled from 'styled-components'


export const FormSection = styled.section`
  top: 0;
  font-size: 1.2em;
  min-width: 500px;
  height: 50%;
  margin: 100px auto;
  padding: 20px;
  .group-file{
    margin: 15px;
  }
  .form-style {
    margin: 0 auto;
  }
`

export const FormStyles = styled.div`
  .card-radio,
  .form-radio {
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    min-width: 500px;
    height: 80px;
    cursor: pointer;
  }
  .form-radio .radio {
    min-width: 300px;
    text-align: center;
    padding: 12px;
    color: #fff;
  }
  label {
    font-size: 1.2em;
  }
  .card-radio .radio {
    display: flex;
    justify-content: center;
    font-weight: bold;
    color: #fff;
    min-width: 300px;
    border-radius: 4px;
    padding: 20px;
    line-height: 40px;
  }
  .card-radio .radio:nth-child(1) {
    background: #9B59B6;
  }
  .card-radio .radio:nth-child(2) {
    background: #FF33E9;
  }
  .card-radio .radio:nth-child(3) {
    background: #F4D03F;
  }
  .group-keys {
    display: flex;
    justify-content: center;
  }
  .group-key {
    margin: 15px;
  }
  .group-key:nth-child(1) input ,
  .group-key:nth-child(2) input {
    font-size: 1.1em;
    border: .1em solid #000;
    border: .1em solid #c4c4c4;
    border-radius: 4px;
    width: 100%;
    padding-top: 3px;
    padding-left: 10px;
  }
  .group-key:nth-child(1) input::placeholder,
  .group-key:nth-child(2) input::placeholder {
    color: #c4c4c4;
  }
  .group-key:nth-child(1) input:focus,
  .group-key:nth-child(2) input:focus {
    outline: none;
  }
  .group-key:nth-child(1) {
    width: 40%;
  }
  .group-key:nth-child(2) {
    width: 60%;
  }
  .group-desc {
    margin: 15px;
  }
  .group-desc input,
  .group-desc textarea,
  .group-file input {
    font-size: 1.1em;
    border: .1em solid #c4c4c4;
    border-radius: 4px;
    width: 100%;
    padding-top: 3px;
    padding-left: 10px;
  }
  .group-desc textarea {
    resize: none;
    padding-top: 10px;
  }
  .group-desc input::placeholder,
  .group-desc textarea::placeholder,
  .group-file input::placeholder {
    color: #c4c4c4;
  }
  .group-desc input:focus,
  .group-desc textarea:focus,
  .group-file input:focus {
    outline: none;
  }
  .group-file span {
    background: #fff;
    border-radius: 5px;
    margin-left: 30px;
    padding: 10px;
  }
  .upload-btn {
    position: relative;
    overflow: hidden;
    display: inline-block;
    float: right;
    cursor: pointer;
  }
  .upload-btn input[type=file] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .upload-btn button {
    cursor: pointer;
  }
  .group-time {
    text-align: center;
    margin: 20px;
  }
  .group-time input {
    zoom: 1.7;
    text-align: center;
  }
  .group-terms {
    font-size: 1.1em;
    text-align: center;
    margin: 20px;
  }
  .group-terms input[type=checkbox] {
    transform: scale(1.5);
  }
  .group-terms span {
    margin-left: 20px;
  }
  .group-terms span.last-child {
    margin-left: 40px;
  }
  .btn,
  input[type="submit"] {
    border: .1em solid #FFAF33;
    color: #fff;
    font-size: 1.2em;
    background-color: #FFAF33;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .group-submit {
    text-align: center;
  }
  .Toastify__toast-container {
    margin-top: 200px;
  }
`
