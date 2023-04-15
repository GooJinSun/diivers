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
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';
import {
  AuthenticationWithDescWrapper,
  AuthenticationFormWrapper
} from '@styles/wrappers';
import { cropAndResize } from '@utils/imageCropHelper';
import {
  ProfileImageUploadWrapper,
  ProfileImageUploadButton,
  SelectedProfileWrapper,
  SelectedProfileImage,
  DeleteButton,
  TermsCheckLabel,
  SignUpButtonWrapper,
  TermsAndPrivacyAnchor
} from './SignUp.styles';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const profileImageFileInput = React.useRef(null);

  const [profileImagePreview, setProfileImagePreview] = useState();
  const [isProfileImageAlert, setIsProfileImageAlert] = useState(false);

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

  const [t] = useTranslation('translation', { keyPrefix: 'sign_up' });

  useEffect(() => {
    if (!currentUser) return;
    history.push('/');
  }, [currentUser, history]);

  useEffect(() => {
    if (!isSubmitted || !signUpError) return;

    if (
      signUpError.detail.includes('Username') ||
      signUpError.detail.includes('닉네임')
    )
      setIsUsernameInvalid(true);
    if (
      signUpError.detail.includes('active') ||
      signUpError.detail.includes('인증')
    )
      setIsInactiveUser(true);
    if (
      signUpError.detail.includes('email') ||
      signUpError.detail.includes('Email') ||
      signUpError.detail.includes('이메일')
    )
      setIsEmailInvalid(true);
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

  const onImageChange = async (e) => {
    resetSignUpStatus();

    const profileImage = e.target.files[0];

    if (!profileImage) return;
    const croppedImage = await cropAndResize(file);
    const objectUrl = URL.createObjectURL(croppedImage);
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
        <h1 id="signup-title">{t('sign_up')}</h1>
        <CommonInput
          name="username"
          id="username-input"
          value={signUpInfo.username}
          placeholder={t('nickname')}
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
          placeholder={t('email')}
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
          placeholder={t('password')}
          onChange={onInputChange}
          onKeyDown={onKeySubmit}
        />
        <ProfileImageUploadWrapper>
          <ProfileImageUploadButton onClick={handleClick}>
            {t('upload_profile_image')}
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
              {t('preview')}
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
          {t('mandatory')} {t('i_agree_to_the_terms_and_conditions')}
          <TermsAndPrivacyAnchor onClick={() => openHTML('terms.html')}>
            ({t('terms_and_conditions')})
          </TermsAndPrivacyAnchor>
        </TermsCheckLabel>
        <TermsCheckLabel htmlFor="privacy">
          <input
            type="checkbox"
            checked={privacyCheckState}
            onChange={() => setPrivacyCheckState((prev) => !prev)}
            id="privacy"
          />
          {t('mandatory')} {t('i_agree_to_the_terms_and_privacy')}
          <TermsAndPrivacyAnchor onClick={() => openHTML('privacy.html')}>
            ({t('terms_and_privacy')})
          </TermsAndPrivacyAnchor>
        </TermsCheckLabel>
        <SignUpButtonWrapper>
          {additionalUserInfo?.research_agreement && (
            <WarningMessage>
              {t('consent_to_participate_in_the_study')}
            </WarningMessage>
          )}
          <CommonButton
            type="button"
            onClick={() => setMoreAboutDiiversModalOpen(true)}
          >
            {t('learn_more_about_Diivers')}
          </CommonButton>

          {isSignUpLoading ? (
            <CircularProgress />
          ) : (
            <CommonButton
              disabled={isSubmitted || !isFilled}
              onClick={onClickSubmitButton}
            >
              {t('sign_up')}
            </CommonButton>
          )}
          {isSubmitted && isSignUpSuccess && (
            <WarningMessage>
              {`*${t('please_complete_the_email_verification')}`}
            </WarningMessage>
          )}
          {isSubmitted && isInactiveUser && (
            <WarningMessage>{signUpError.detail}</WarningMessage>
          )}
        </SignUpButtonWrapper>
      </AuthenticationFormWrapper>
      <ConfirmAlertDialog
        message={t('image_size_is_too_large')}
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
