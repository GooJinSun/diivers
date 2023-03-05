import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@material-ui/icons/Close';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { CommonButton } from '@styles/buttons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { formatDate } from '@utils/dateTimeHelpers';
import useWindowWidth from '@hooks/env/useWindowWidth';
import { useTranslation } from 'react-i18next';
import { ButtonWrapper, useStyles } from './MoreAboutDiivers.styles';

interface AdditionalInfo {
  gender?: number;
  date_of_birth?: string;
  ethnicity?: number;
  research_agreement?: boolean;
}
interface MoreAboutDiiversModalProps {
  open: boolean;
  handleClose: () => void;
  setAdditionalUserInfo: Dispatch<SetStateAction<AdditionalInfo>>;
}

const MoreAboutDiiversModal = ({
  open,
  handleClose,
  setAdditionalUserInfo
}: MoreAboutDiiversModalProps) => {
  const classes = useStyles();

  const [gender, setGender] = useState<AdditionalInfo['gender']>();
  const [birthDate, setBirthDate] = useState<AdditionalInfo['date_of_birth']>();
  const [ethnicity, setEthnicity] = useState<AdditionalInfo['ethnicity']>();

  const onChangeGender = (e: ChangeEvent<{ value: unknown }>) => {
    setGender(Number(e.target.value));
  };

  const onChangeBirthDate = (date: MaterialUiPickersDate) => {
    if (!date) return;
    setBirthDate(formatDate(date, 'yyyy-MM-dd'));
  };

  const onChangeEthnicity = (e: ChangeEvent<{ value: unknown }>) => {
    setEthnicity(Number(e.target.value));
  };

  const isAdditionalInfoFilled =
    gender !== undefined && birthDate !== undefined && ethnicity !== undefined;

  const onApprove = () => {
    if (!isAdditionalInfoFilled) return;

    setAdditionalUserInfo({
      gender,
      date_of_birth: birthDate,
      ethnicity,
      research_agreement: true
    });
    handleClose();
  };

  const onRefuse = () => {
    setAdditionalUserInfo({
      gender: undefined,
      date_of_birth: undefined,
      ethnicity: undefined,
      research_agreement: false
    });
    handleClose();
  };

  const { isMobile } = useWindowWidth();
  const [t] = useTranslation('translation', {
    keyPrefix: 'more_about_diivers'
  });

  return (
    <Dialog
      fullWidth={!isMobile}
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {t('learn_more_about_Diivers')}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>{t('desc')}</div>
        {/* 성 */}
        <FormControl fullWidth margin="normal">
          <InputLabel variant="standard" htmlFor="gender-select">
            {t('gender')}
          </InputLabel>
          <Select
            labelId="gender"
            id="gender-select"
            value={gender}
            onChange={(e) => onChangeGender(e)}
          >
            <MenuItem value={0}>{t('female')}</MenuItem>
            <MenuItem value={1}>{t('male')}</MenuItem>
            <MenuItem value={2}>{t('transgender')}</MenuItem>
            <MenuItem value={3}>{t('non_binary')}</MenuItem>
            <MenuItem value={4}>{t('dont_want_to_respond')}</MenuItem>
          </Select>
        </FormControl>
        {/* 생년월일 */}
        <FormControl fullWidth margin="normal">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="yyyy/MM/dd"
              id="birth-date-picker"
              label={t('date_of_birth')}
              value={birthDate}
              onChange={(date) => onChangeBirthDate(date)}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        {/* 인종 */}
        <FormControl fullWidth margin="normal">
          <InputLabel variant="standard" htmlFor="ethnicity-select">
            {t('ethnicity')}
          </InputLabel>
          <Select
            labelId="ethnicity"
            id="ethnicity-select"
            value={ethnicity}
            onChange={(e) => onChangeEthnicity(e)}
          >
            <MenuItem value={0}>{t('american_indian')}</MenuItem>
            <MenuItem value={1}>{t('asian')}</MenuItem>
            <MenuItem value={2}>{t('black')}</MenuItem>
            <MenuItem value={3}>{t('hispanic')}</MenuItem>
            <MenuItem value={4}>{t('native_hawaiian')}</MenuItem>
            <MenuItem value={5}>{t('white')}</MenuItem>
          </Select>
        </FormControl>
        <ButtonWrapper>
          <CommonButton onClick={onRefuse} sub margin="0 20px">
            {t('refuse')}
          </CommonButton>
          <CommonButton
            margin="0 20px"
            onClick={onApprove}
            disabled={!isAdditionalInfoFilled}
          >
            {t('approve')}
          </CommonButton>
        </ButtonWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default MoreAboutDiiversModal;
