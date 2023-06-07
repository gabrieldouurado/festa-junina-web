import styled from 'styled-components'

export const HomeCotainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HomeHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  /* border: 1px solid red; */
`

export const FlagsImage = styled.img`
  width: 30vw;
  max-width: 20rem;
  object-fit: contain;
`

export const FireworksImage = styled.img`
  width: 10vw;
  max-width: 7rem;
  object-fit: contain;

  margin-top: 1.35rem;
  margin-right: 2rem;
`

export const LogoImage = styled.img`
  width: 50vw;
  max-width: 30rem;
  object-fit: contain;
  margin-top: calc(5vh * -1);
  margin-bottom: 1.5rem;
`

export const HomeContent = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100%;

  padding: 0 2rem;
`

export const PeopleOrFamily = styled.input`
  width: 45%;
`

export const PeopleQuantity = styled.input`
  width: 15%;
`

export const PeopleContribuition = styled.select`
  width: 40%;
`

export const HomeFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid green; */
`

export const GuestList = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  margin: 1rem 0;
  max-height: 50vh;

  table {
    width: 100%;
    border-collapse: collapse;

    tr:last-child {
      td:first-child {
        border-bottom-left-radius: 8px;
      }

      td:last-child {
        border-bottom-right-radius: 8px;
      }
    }

    th {
      background-color: ${(props) => props.theme['brown-500']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.white};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme.white};
      border-top: 4px solid ${(props) => props.theme['yellow-100']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      svg {
        color: ${(props) => props.theme['brown-500']};
      }

      svg:hover {
        color: ${(props) => props.theme['brown-900']};
        cursor: pointer;
      }

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:nth-last-child(3) {
        width: 10%;
      }

      &:last-child {
        width: 5%;
        padding-right: 1.5rem;
      }

      &:not(:last-child) {
        border-right: 2px solid ${(props) => props.theme['yellow-100']};
      }
    }
  }
`

export const FlagDateImage = styled.img`
  width: 10vw;
  max-width: 10rem;
  object-fit: contain;

  margin-left: 2.5rem;
`

export const FireplaceImage = styled.img`
  width: 15vw;
  max-width: 10rem;
  object-fit: contain;

  margin-right: 2.5rem;
  margin-bottom: 0.5rem;
`
