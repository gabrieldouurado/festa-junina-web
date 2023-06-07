import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 0.875rem;

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  input {
    height: 3rem;

    padding: 0.5rem;
    border: solid 2px ${(props) => props.theme['brown-500']};
    border-radius: 8px;
  }

  select {
    height: 3rem;

    padding: 0.5rem;
    border: solid 2px ${(props) => props.theme['brown-500']};
    border-radius: 8px;
  }

  span {
    margin: -0.5rem 0;
    color: red;
  }
`
