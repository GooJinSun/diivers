import { FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { MOBILE_MIN_WIDTH } from '@constants/layout';

export const ShareSettingsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 14px;
`;

export const RespFormGroup = styled(FormGroup)`
  @media (max-width: ${MOBILE_MIN_WIDTH}px) {
    flex-direction: row;
    justify-content: flex-end;
    button {
      width: 30%;
    }
  }
`;

export const ArticleInfo = styled.div`
  padding-top: 13px;
  margin: 0 8px;
  font-size: 10px;
  color: #999;
`;

export const useStyles = makeStyles(() => ({
  label: {
    fontSize: '14px'
  }
}));
