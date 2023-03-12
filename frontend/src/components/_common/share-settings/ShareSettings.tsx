import React, { ChangeEvent, useState } from 'react';
import { FormControlLabel, Button, Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PostDraft } from '@models/posts';
import { createPost, editSelectedPost } from '../../../modules/post';
import {
  useStyles,
  ShareSettingsWrapper,
  RespFormGroup,
  ArticleInfo
} from './ShareSettings.styles';

interface ShareSettingsProps {
  postObj: PostDraft;
  isEdit?: boolean;
  isArticle?: boolean;
  resetContent?: () => void;
  onSubmit?: () => void;
}

export default function ShareSettings({
  postObj,
  resetContent,
  isEdit = false,
  isArticle = false,
  onSubmit
}: ShareSettingsProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const [shareState, setShareState] = useState({
    share_with_friends: postObj.share_with_friends,
    share_anonymously: postObj.share_anonymously
  });
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setShareState((prev) => ({ ...prev, [name]: checked }));
  };

  const onClickSubmitButton = async () => {
    if (isEdit) {
      await dispatch(
        editSelectedPost({
          ...postObj,
          ...shareState
        })
      );
      history.push(location.pathname.slice(0, -4));
    } else {
      dispatch(
        createPost({
          ...postObj,
          ...shareState
        })
      );
      resetContent?.();
    }

    onSubmit?.();
  };

  const controlShareWithFriends = (
    <Checkbox
      id="share-with-friends"
      name="share_with_friends"
      checked={shareState.share_with_friends}
      onChange={handleChange}
      size="small"
    />
  );

  const controlShareAnonymously = (
    <Checkbox
      id="share-anonymously"
      name="share_anonymously"
      checked={shareState.share_anonymously}
      onChange={handleChange}
      size="small"
    />
  );

  return (
    <ShareSettingsWrapper>
      <RespFormGroup row>
        {!isArticle && (
          <>
            <FormControlLabel
              className={`share-with-friends ${classes.label}`}
              control={controlShareWithFriends}
              label={
                <Typography className={classes.label}>
                  {t('share_with_friends')}
                </Typography>
              }
            />
            <FormControlLabel
              className={`share-anonymously ${classes.label}`}
              control={controlShareAnonymously}
              label={
                <Typography className={classes.label}>
                  {t('share_anonymously')}
                </Typography>
              }
            />
          </>
        )}
        <Button
          id="submit-button"
          size="small"
          variant="outlined"
          color="secondary"
          onClick={onClickSubmitButton}
          disabled={
            (!shareState.share_with_friends && !shareState.share_anonymously) ||
            !postObj?.content
          }
        >
          {t('post')}
        </Button>
      </RespFormGroup>
      {isArticle && (
        <ArticleInfo>
          {t('posts_excluding_questions_and_answers_are_only_open_to_friends')}
        </ArticleInfo>
      )}
    </ShareSettingsWrapper>
  );
}
