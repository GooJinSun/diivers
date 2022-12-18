import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TabPanel from './tab-panel/TabPanel';

export const MobileTabPanel = styled(TabPanel)`
  @media (max-width: 650px) {
    padding: 0 !important;

    .MuiBox-root {
      padding: 0 !important;
    }
  }
`;

export const UserPageWrapper = styled.div`
  background: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserReportButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const MobileWrapper = styled.div`
  @media (max-width: 650px) {
    border: none !important;
  }
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #e7e7e7',
    borderRadius: '4px'
  },
  header: {
    backgroundColor: 'white',
    boxShadow:
      '0 5px 10px rgba(154, 160, 185, 0.05), 0 5px 10px rgba(166, 173, 201, 0.2)'
  }
}));
