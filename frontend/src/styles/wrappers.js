import styled from 'styled-components';

export const MainWrapper = styled.main`
  @media (max-width: 650px) {
    width: 100vw;
    margin-top: 70px;
  }
  width: ${(props) => (props.isSelectQuestionPage ? '100%' : '1280px')};
  margin: 80px auto 100px auto;
  display: flex;
  justify-content: center;
`;

export const AuthentiCationWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 120px;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const FeedWrapper = styled.div`
  @media (max-width: 650px) {
    width: calc(100vw - 12px);
    padding: 0 12px;
  }
  width: 720px;
  padding: 0 40px;
`;

export const WidgetWrapper = styled.div`
  width: 300px;
  transform: 'translateX(-10px)';
  @media (max-width: 650px) {
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
  @media (max-width: 650px) {
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

export const FlexWrapper = styled.div`
  display: flex;
`;
