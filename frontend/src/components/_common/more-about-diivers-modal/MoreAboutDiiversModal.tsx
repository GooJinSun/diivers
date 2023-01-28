import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CommonInput } from '@styles/inputs';
import { CommonButton } from '@styles/buttons';
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

  const onApprove = () => {
    setAdditionalUserInfo({
      gender: undefined,
      date_of_birth: undefined,
      ethnicity: undefined,
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

        <CommonInput id="gender-input" name="gender" placeholder="성별" />
        <CommonInput
          id="date_of_birth-input"
          name="date_of_birth"
          placeholder="생년월일"
        />
        <CommonInput id="ethnicity-input" name="ethnicity" placeholder="인종" />
        <CommonButton onClick={onRefuse}>동의안함</CommonButton>
        <CommonButton onClick={onApprove}>동의함</CommonButton>
      </DialogContent>
    </Dialog>
  );
};

export default MoreAboutDiiversModal;
