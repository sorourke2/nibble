import styled from "styled-components";

const BasicButton = ({ hoverColor }) => {
  const Button = styled.button`
    font-size: 24px;
    padding: 4px 8px;
    background-color: lightgrey;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    :hover {
      background: ${hoverColor};
    }
  `;

  return Button;
};

export default BasicButton;
