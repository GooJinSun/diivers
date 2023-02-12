import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestSignUp } from '@modules/user';
import ConfirmAlertDialog from '@common-components/confirm-alert-dialog/ConfirmAlertDialog';
import { CommonButton } from '@styles/buttons';
import AuthenticationDesc from '@common-components/authentication-desc/AuthenticationDesc';
import MoreAboutDiiversModal from '@common-components/more-about-diivers-modal/MoreAboutDiiversModal';
import { openHTML } from '@utils/openHTML';
import { CommonInput } from '@styles/inputs';
import { WarningMessage } from '@styles/messages';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import { CircularProgress } from '@material-ui/core';
import {
  AuthenticationWithDescWrapper,
  AuthenticationFormWrapper
} from '@styles/wrappers';
import {
  ProfileImageUploadWrapper,
  ProfileImageUploadButton,
  SelectedProfileWrapper,
  SelectedProfileImage,
  DeleteButton,
  TermsCheckLabel,
  MoreAboutDiiversButton,
  SignUpButtonWrapper,
  TermsAndPrivacyAnchor
} from './SignUp.styles';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const profileImageFileInput = React.useRef(null);

  const [profileImagePreview, setProfileImagePreview] = useState();
  const [isProfileImageAlert, setIsProfileImageAlert] = useState(false);

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser, history]);

  const [termsCheckState, setTermsCheckState] = useState(false);
  const [privacyCheckState, setPrivacyCheckState] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isInactiveUser, setIsInactiveUser] = useState(false);

  const isSignUpLoading =
    useSelector((state) => state.loadingReducer['user/SIGN_UP']) === 'REQUEST';

  const isSignUpSuccess =
    useSelector((state) => state.loadingReducer['user/SIGN_UP']) === 'SUCCESS';
  const { signUpError } = useSelector((state) => state.userReducer);

  const [moreAboutDiiversModalOpen, setMoreAboutDiiversModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isSubmitted || !signUpError) return;

    if (signUpError.detail.includes('Username')) setIsUsernameInvalid(true);
    if (signUpError.detail.includes('Email')) setIsEmailInvalid(true);
    if (signUpError.detail.includes('active')) setIsInactiveUser(true);
  }, [isSubmitted, signUpError]);

  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
    profileImage: ''
  });

  const [additionalUserInfo, setAdditionalUserInfo] = useState();

  const isFilled =
    signUpInfo.username.length &&
    signUpInfo.password.length &&
    signUpInfo.email.length &&
    termsCheckState &&
    privacyCheckState;

  const resetSignUpStatus = () => {
    setIsSubmitted(false);
    setIsUsernameInvalid(false);
    setIsEmailInvalid(false);
    setIsInactiveUser(false);
  };

  const onInputChange = (e) => {
    resetSignUpStatus();

    const { name, value } = e.target;
    setSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    resetSignUpStatus();

    const profileImage = e.target.files[0];
    if (profileImage.size > 400 * 400) {
      return setIsProfileImageAlert(true);
    }
    const objectUrl = URL.createObjectURL(profileImage);
    setProfileImagePreview(objectUrl);
    setSignUpInfo((prev) => ({ ...prev, profileImage }));
  };

  const createFormData = () => {
    const formData = new FormData();
    const { email, username, password, profileImage } = signUpInfo;
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    if (!additionalUserInfo) return formData;

    const { gender, date_of_birth, ethnicity, research_agreement } =
      additionalUserInfo;
    if (gender) formData.append('gender', gender);
    if (date_of_birth) formData.append('date_of_birth', date_of_birth);
    if (ethnicity) formData.append('ethnicity', ethnicity);
    if (research_agreement)
      formData.append('research_agreement', research_agreement);
    return formData;
  };

  const onClickSubmitButton = () => {
    setIsSubmitted(true);
    dispatch(requestSignUp(createFormData()));
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onClickSubmitButton();
    }
  };

  const handleClick = () => {
    profileImageFileInput.current.click();
  };

  return (
    <AuthenticationWithDescWrapper>
      <AuthenticationDesc />
      <AuthenticationFormWrapper>
        <h1 id="signup-title">회원가입</h1>
        <CommonInput
          name="username"
          id="username-input"
          value={signUpInfo.username}
          placeholder="닉네임"
          onChange={onInputChange}
          invalid={isSubmitted && isUsernameInvalid}
        />
        {isSubmitted && isUsernameInvalid && (
          <WarningMessage>{signUpError.detail}</WarningMessage>
        )}
        <CommonInput
          id="email-input"
          name="email"
          value={signUpInfo.email}
          placeholder="이메일"
          onChange={onInputChange}
          invalid={isSubmitted && isEmailInvalid}
        />
        {isSubmitted && isEmailInvalid && (
          <WarningMessage>{signUpError.detail}</WarningMessage>
        )}
        <CommonInput
          name="password"
          type="password"
          id="password-input"
          value={signUpInfo.password}
          placeholder="비밀번호"
          onChange={onInputChange}
          onKeyDown={onKeySubmit}
        />
        <ProfileImageUploadWrapper>
          <ProfileImageUploadButton onClick={handleClick}>
            프로필 이미지 업로드
          </ProfileImageUploadButton>
          <input
            type="file"
            style={{ display: 'none' }}
            name="profile-image"
            accept="image/jpeg, image/png"
            onChange={onImageChange}
            ref={profileImageFileInput}
            multiple={false}
          />
          {!!profileImagePreview && (
            <SelectedProfileWrapper>
              미리보기
              <SelectedProfileImage>
                <img
                  src={profileImagePreview}
                  width={30}
                  height={30}
                  alt="profile"
                />
              </SelectedProfileImage>
              <DeleteButton
                onClick={() => {
                  setSignUpInfo({
                    ...signUpInfo,
                    profileImage: ''
                  });
                  setProfileImagePreview(null);
                }}
              >
                <RemoveIcon fontSize="small" />
              </DeleteButton>
            </SelectedProfileWrapper>
          )}
        </ProfileImageUploadWrapper>
        <TermsCheckLabel htmlFor="terms">
          <input
            type="checkbox"
            checked={termsCheckState}
            onChange={() => setTermsCheckState((prev) => !prev)}
            id="terms"
          />
          (필수){' '}
          <TermsAndPrivacyAnchor onClick={() => openHTML('terms.html')}>
            이용약관
          </TermsAndPrivacyAnchor>
          에 동의합니다.
        </TermsCheckLabel>
        <TermsCheckLabel htmlFor="privacy">
          <input
            type="checkbox"
            checked={privacyCheckState}
            onChange={() => setPrivacyCheckState((prev) => !prev)}
            id="privacy"
          />
          (필수){' '}
          <TermsAndPrivacyAnchor onClick={() => openHTML('privacy.html')}>
            개인정보 수집 및 이용
          </TermsAndPrivacyAnchor>
          에 동의합니다.
        </TermsCheckLabel>
        <SignUpButtonWrapper>
          <MoreAboutDiiversButton
            type="button"
            onClick={() => setMoreAboutDiiversModalOpen(true)}
          >
            다이버스에 대해 더 알아보기
            {additionalUserInfo?.research_agreement && (
              <WarningMessage>(연구 참여 동의 완료)</WarningMessage>
            )}
          </MoreAboutDiiversButton>
          {isSignUpLoading ? (
            <CircularProgress />
          ) : (
            <CommonButton
              disabled={isSubmitted || !isFilled}
              onClick={onClickSubmitButton}
            >
              회원가입
            </CommonButton>
          )}
          {isSubmitted && isSignUpSuccess && (
            <WarningMessage>
              * 이메일이 전송되었습니다. 인증 완료해 주세요!
            </WarningMessage>
          )}
          {isSubmitted && isInactiveUser && (
            <WarningMessage>{signUpError.detail}</WarningMessage>
          )}
        </SignUpButtonWrapper>
      </AuthenticationFormWrapper>
      <ConfirmAlertDialog
        message={
          '이미지의 크기가 너무 큽니다.\n400 * 400 이하 크기의 이미지를 사용해주세요'
        }
        onConfirm={() => setIsProfileImageAlert(false)}
        onClose={setIsProfileImageAlert}
        isOpen={isProfileImageAlert}
      />
      <MoreAboutDiiversModal
        open={moreAboutDiiversModalOpen}
        handleClose={() => setMoreAboutDiiversModalOpen(false)}
        setAdditionalUserInfo={setAdditionalUserInfo}
      />
    </AuthenticationWithDescWrapper>
  );
}
