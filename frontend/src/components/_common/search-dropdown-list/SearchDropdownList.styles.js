import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const SearchCard = styled(Card)`
  @media (min-width: 650px) {
    width: 300px;
    max-height: 85%;
    position: fixed;
    top: 68px;
    right: 230px;
    z-index: 120;
  }

  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
`;

export const useStyles = makeStyles({
  searchDropdown: {
    width: 300,
    maxHeight: '85%',
    position: 'fixed',
    top: 68,
    right: 230,
    zIndex: 1
  },
  searchDropdownContent: {
    padding: '0px 4px',
    '&:last-child': {
      paddingBottom: '0 !important'
    }
  }
});
