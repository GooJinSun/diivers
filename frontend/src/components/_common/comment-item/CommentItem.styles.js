import styled from 'styled-components';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

export const CommentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 12px;
  justify-content: space-between;
  .like {
    width: 0.75em !important;
  }

  .unlike {
    width: 0.75em !important;
  }
`;
CommentItemWrapper.displayName = 'CommentItem';

export const CommentContent = styled.div`
  margin: 4px 8px 0 8px;
  word-break: break-all;
  @media (max-width: 650px) {
    margin: 3px 6px;
  }
`;

export const IconButton = styled.div``;

export const ReplyWrapper = styled.div`
  min-width: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  :hover: {
    color: #000;
  }
`;
ReplyWrapper.displayName = 'ReplyWrapper';

export const DeleteWrapper = styled.div`
  min-width: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-left: 4px;
  :hover: {
    color: #000;
  }
`;
DeleteWrapper.displayName = 'DeleteWrapper';

export const ReplyIcon = styled(SubdirectoryArrowRightIcon)`
  @media (max-width: 650px) {
    margin: 0;
  }
  margin-right: 3px;
  color: #777;
`;
