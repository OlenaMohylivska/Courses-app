import React, { ChangeEvent, useState } from 'react';
import { FormControl } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { TextArea } from '../../common/TextArea';
import { AuthorItem } from './components/AuthorItem';
import { getCourseDuration } from '../../helpers/helpers';
import { IAuthor, ICourse } from '../../helpers/interfaces';
import {
  BUTTON_TEXT_CREATE_COURSE,
  BUTTON_TEXT_CREATE_AUTHOR,
  BUTTON_TEXT_ADD_AUTHOR,
  BUTTON_TEXT_DELETE_AUTHOR,
  BUTTON_TEXT_UPDATE_COURSE,
} from '../../constants';
import { ROUTES } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store';
import { addAuthor, postCourse, updateCourse } from '../../services';
import { getCourses } from '../../store/courses/selectors';

import styles from './CourseForm.module.scss';

type Props = {
  allAuthors: IAuthor[];
};

const errorMessage = 'Please, fill in all fields';

export const CourseForm: React.FC<Props> = ({ allAuthors }) => {
  const dispatch = useAppDispatch();
  const allCourses: ICourse[] = useAppSelector(getCourses);
  const navigate = useNavigate();
  const { courseId: paramsId } = useParams();
  const currentCourse = allCourses.find(({ id }) => id === paramsId);
  const [authorName, setAuthorName] = useState('');
  const [newCourse, setNewCourse] = useState<ICourse>(
    currentCourse || {
      title: '',
      description: '',
      creationDate: new Date().toLocaleDateString('en-GB'),
      duration: 0,
      authors: [],
    }
  );

  const onAuthorCreate = () => {
    if (authorName.length >= 2) {
      dispatch(addAuthor({ name: authorName }));
      setAuthorName('');
    }
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCourse({
      ...newCourse,
      duration: Number(event.target.value),
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
  };

  const saveCourse = (): void => {
    const validateField: string[] = ['title', 'description', 'duration'];

    const isValid = !validateField.some(
      (key) => !newCourse[key as keyof ICourse]
    );

    if (!isValid || !newCourse.authors.length) {
      alert(errorMessage);
      return;
    }

    if (paramsId) {
      dispatch(updateCourse(newCourse));
    } else {
      dispatch(postCourse(newCourse));
    }

    navigate(ROUTES.COURSES, { replace: false });
  };

  return (
    <FormControl className={styles.formControl}>
      <div className={styles.inputWrapper}>
        <Input
          placeholderText="Enter title..."
          value={newCourse.title}
          onChange={handleInputChange}
          label="Title"
          inputType="text"
          name="title"
        />
        {paramsId ? (
          <Button onClick={saveCourse}>{BUTTON_TEXT_UPDATE_COURSE}</Button>
        ) : (
          <Button onClick={saveCourse}>{BUTTON_TEXT_CREATE_COURSE}</Button>
        )}
      </div>
      <TextArea
        placeholder="Enter description..."
        label="Description"
        value={newCourse.description}
        onChange={handleInputChange}
        name="description"
      />
      <div className={styles.detailsBlock}>
        <div className={styles.authorBlock}>
          <h4 className={styles.title}>Add author</h4>
          <Input
            placeholderText="Enter author name..."
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            inputType="text"
            name="name"
          />
          <Button onClick={onAuthorCreate}>{BUTTON_TEXT_CREATE_AUTHOR}</Button>
        </div>
        <div className={styles.durationBlock}>
          <h4 className={styles.title}>Duration</h4>
          <Input
            placeholderText="Enter duration in minutes..."
            value={newCourse.duration > 0 ? newCourse.duration : ''}
            onChange={handleDurationChange}
            inputType="number"
            name="duration"
          />
          <p className={styles.durationString}>
            Duration:
            <span className={styles.durationStringNumber}>
              {getCourseDuration(newCourse.duration).slice(0, 5)}
            </span>
            {getCourseDuration(newCourse.duration).slice(5)}
          </p>
        </div>

        <div className={styles.existedAuthorsBlock}>
          <h4 className={styles.title}>Authors</h4>

          {allAuthors.map((author) => {
            if (!newCourse.authors.find((id) => author.id === id)) {
              return (
                <AuthorItem
                  authorName={author.name}
                  key={author.id}
                  buttonText={BUTTON_TEXT_ADD_AUTHOR}
                  onBtnClick={() =>
                    setNewCourse({
                      ...newCourse,
                      authors: [...newCourse.authors, author?.id ?? ''],
                    })
                  }
                />
              );
            }
            return null;
          })}
        </div>
        <div className={styles.courseAuthorsBlock}>
          <h4 className={styles.title}>Course authors</h4>
          {newCourse.authors.length ? (
            newCourse.authors.map((authorId) => {
              const author = allAuthors.find((el) => el.id === authorId);
              return (
                <AuthorItem
                  authorName={author?.name ?? ''}
                  key={authorId}
                  buttonText={BUTTON_TEXT_DELETE_AUTHOR}
                  onBtnClick={() =>
                    setNewCourse({
                      ...newCourse,
                      authors: newCourse.authors.filter(
                        (el) => el !== authorId
                      ),
                    })
                  }
                />
              );
            })
          ) : (
            <p>Author list is empty</p>
          )}
        </div>
      </div>
    </FormControl>
  );
};
