import styled from 'styled-components'

export const ButtonContainer = styled.button`
  padding: 1rem 1.5rem;

  border-radius: 6px;
  border: none;

  font-weight: bold;
  color: ${(props) => props.theme['brown-500']};
  background: transparent;

  border: 2px solid ${(props) => props.theme['brown-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme.white};

    transition: all 150ms;

    cursor: pointer;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`
