import styled from 'styled-components';

export const CommonInput = styled.input`
  padding: 11px;
  border-radius: 4px;
  color: rgb(50, 50, 50);
  font-size: 16px;
  outline: none;
  width: ${(props) => (props.width ? props.width : '100%')};
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin: 4px 0;
  border-color: ${(props) => props.invalid && '#ff395b'};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #aaa;
  }
  :focus {
    border-color: #008489;
  }
`;

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
  padding: 16px;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const CommonButton = styled.button`
  padding: 12px 11px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: #f12c56;
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: ${(props) => (props.margin ? props.margin : '4px 0')};
  opacity: 0.8;
  :hover {
    opacity: ${(props) => !props.disabled && 1};
  }
  :disabled {
    cursor: default;
    background-color: grey;
  }
`;
CommonButton.displayName = 'CommonButton';

export const AuthSubButton = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
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
PostItemWrapper.displayName = 'PostItemWrapper';

export const WarningMessage = styled.div`
  font-size: 14px;
  color: #ff395b;
  margin-bottom: 4px;
`;
