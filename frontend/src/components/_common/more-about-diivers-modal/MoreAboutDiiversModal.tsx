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
import { useStyles } from './MoreAboutDiivers.styles';

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

  const [gender, setGender] = useState<number>();
  const [birthDate, setBirthDate] = useState<string>();
  const [ethnicity, setEthnicity] = useState<number>();

  const onChangeGender = (e: ChangeEvent<{ value: unknown }>) => {
    setGender(Number(e.target.value));
  };

  const onChangeBirthDate = (date: MaterialUiPickersDate) => {
    // TODO: 타입 확인 필요
    if (!date) return;
    setBirthDate(date.toDateString());
  };

  const onChangeEthnicity = (e: ChangeEvent<{ value: unknown }>) => {
    setEthnicity(Number(e.target.value));
  };

  const onApprove = () => {
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

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        다이버스에 대해 더 알아보기
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>
          * 다이버스 서비스는 University of Washington, Information Science
          (HCI)의 연구에 활용되고 있습니다. 연구에는 동의하지 않으시더라도
          다이버스 가입이 가능하며, 가입하기 버튼을 클릭하면 다이버스의
          이용약관과 개인정보처리방침에 동의하게 됩니다. 데이터가 연구에
          사용되는 것을 동의해주시는 유저에 한하여 아래 선택정보를 기입받고,
          해당 데이터는 암호화되어 관리되며 상업적으로 이용되지 않고, 연구의
          분석에 활용될 수 있습니다.
        </div>
        <div>
          연구에 동의하시는 분은 아래 추가사항을 입력 해주세요. 다시한번,
          개인정보는 암호화되며 연구 외의 목적으로 이용되지 않음을 안내드립니다.
        </div>
        {/* 나이 */}
        <FormControl fullWidth margin="normal">
          <InputLabel shrink id="age">
            나이
          </InputLabel>
          <Select
            labelId="age"
            id="age-select"
            value={gender ?? ''}
            onChange={(e) => onChangeGender(e)}
          >
            <MenuItem value={0}>여성</MenuItem>
            <MenuItem value={1}>남성</MenuItem>
            <MenuItem value={2}>트랜스젠더 (transgender)</MenuItem>
            <MenuItem value={3}>
              논바이너리 (non-binary/non-conforming)
            </MenuItem>
            <MenuItem value={4}>응답하고 싶지 않음</MenuItem>
          </Select>
        </FormControl>
        {/* 생년월일 */}
        <FormControl fullWidth margin="normal">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="yyyy/MM/dd"
              id="birth-date-picker"
              label="생년월일"
              value={birthDate}
              onChange={(date) => onChangeBirthDate(date)}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        {/* 인종 */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="ethnicity" shrink>
            인종
          </InputLabel>
          <Select
            labelId="ethnicity"
            id="ethnicity-select"
            value={ethnicity ?? ''}
            onChange={(e) => onChangeEthnicity(e)}
          >
            <MenuItem value={0}>
              미국 원주민/알래스카 원주민 (American Indian/Alaska Native)
            </MenuItem>
            <MenuItem value={1}>아시아인 (Asian)</MenuItem>
            <MenuItem value={2}>
              흑인/아프리카계 미국인 (Black/African American)
            </MenuItem>
            <MenuItem value={3}>
              히스패닉/라틴계 미국인 (Hispanic/Latino)
            </MenuItem>
            <MenuItem value={4}>
              하와이 원주민/다른 태평양 섬 주민 (Native Hawaiian/Other Pacific
              Islander)
            </MenuItem>
            <MenuItem value={5}>백인 (White)</MenuItem>
          </Select>
        </FormControl>
        <CommonButton onClick={onRefuse}>동의안함</CommonButton>
        <CommonButton onClick={onApprove}>동의함</CommonButton>
      </DialogContent>
    </Dialog>
  );
};

export default MoreAboutDiiversModal;
