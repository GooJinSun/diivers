import styled from 'styled-components';
import {
  MOBILE_MIN_WIDTH,
  DESKTOP_MIN_WIDTH,
  DEFAULT_MARGIN
} from '@constants/layout';

const WIDGET_WIDTH = 300;

export const MainWrapper = styled.main`
  margin: 80px 20px 100px 20px;
  display: flex;
  justify-content: center;
`;

export const AuthentiCationWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 120px;
`;

export const FeedWrapper = styled.div`
  width: calc(100% - 2 * ${WIDGET_WIDTH}px);
  @media (max-width: ${DESKTOP_MIN_WIDTH}px) {
    width: calc(100vw - 2 * ${DEFAULT_MARGIN}px);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WidgetWrapper = styled.div`
  width: ${WIDGET_WIDTH}px;
  display: flex;
  justify-content: center;
  margin: 0px 20px;
  @media (max-width: ${MOBILE_MIN_WIDTH}px) {
    width: 95vw;
  }
`;

export const WidgetTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const PostItemHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostItemFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostItemButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const PostItemWrapper = styled.div`
  @media (max-width: ${MOBILE_MIN_WIDTH}px) {
    box-shadow: 0 2px 2px rgba(154, 160, 185, 0.05),
      0 5px 5px rgba(166, 173, 201, 0.1);
  }
  background: #fff;
  padding: 16px;
  font-size: 14px;
  border: 1px solid #eee;
  margin: 16px 0;
  position: relative;
  border-radius: 4px;
`;

export const PostListWrapper = styled.div`
  width: 100%;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;
