import React, {
  ChangeEvent,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { FormControl, FormGroup } from '@mui/material';
import { v4 as toGenerateId } from 'uuid';

import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { TextArea } from '../../common/TextArea';
import { AuthorItem } from './components/AuthorItem';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getDate } from '../../helpers/getDate';
import { ICourse, IAuthor } from '../../helpers/interfaces';
import {
  BUTTON_TEXT_CREATE_COURSE,
  BUTTON_TEXT_CREATE_AUTHOR,
  BUTTON_TEXT_ADD_AUTHOR,
  BUTTON_TEXT_DELETE_AUTHOR,
} from '../../constants';

import styles from './CreateCourse.module.scss';

type Props = {
  coursesList: ICourse[];
  setCoursesList: Dispatch<SetStateAction<ICourse[]>>;
  setAuthorsList: Dispatch<SetStateAction<IAuthor[]>>;
  authorsList: IAuthor[];
  setIsCreateCourse: Dispatch<SetStateAction<boolean>>;
};

const errorMessage = 'Please, fill in all fields';

export const CreateCourse: React.FC<Props> = ({
  coursesList,
  setCoursesList,
  authorsList,
  setAuthorsList,
  setIsCreateCourse,
}) => {
  const [authorName, setAuthorName] = useState('');

  const [newCourse, setNewCourse] = useState<ICourse>({
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  });

  const onAuthorCreate = () => {
    if (authorName.length >= 2) {
      setAuthorsList([
        ...authorsList,
        { id: toGenerateId(), name: authorName },
      ]);
      setAuthorName('');
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
  };

  const authors = useMemo(() => {
    if (!newCourse.authors.length) return authorsList;
    return authorsList.filter((author) => {
      const currentAuthor = newCourse.authors.find((el) => el === author.id);
      return currentAuthor ? !currentAuthor : author;
    });
  }, [authorsList, newCourse.authors]);

  const saveCourse = () => {
    if (!newCourse.id) {
      // console.log('here');

      setNewCourse({
        ...newCourse,
        id: toGenerateId(),
        creationDate: getDate(),
      });
    }

    const validateField: string[] = ['title', 'description', 'duration'];

    const isVal = validateField.some(
      (key) => newCourse[key as keyof ICourse] === ''
    );

    if (isVal || !newCourse.authors.length) {
      alert(errorMessage);
    } else {
      setCoursesList([...coursesList, newCourse]);
      setIsCreateCourse(false);
    }
  };

  return (
    <FormGroup>
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
          <Button text={BUTTON_TEXT_CREATE_COURSE} onClick={saveCourse} />
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
            <Button text={BUTTON_TEXT_CREATE_AUTHOR} onClick={onAuthorCreate} />
          </div>
          <div className={styles.durationBlock}>
            <h4 className={styles.title}>Duration</h4>
            <Input
              placeholderText="Enter duration in minutes..."
              value={newCourse.duration > 0 ? newCourse.duration : ''}
              onChange={handleInputChange}
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

            {authors.map((author) => (
              <AuthorItem
                authorName={author.name}
                key={author.id}
                buttonText={BUTTON_TEXT_ADD_AUTHOR}
                onBtnClick={() =>
                  setNewCourse({
                    ...newCourse,
                    authors: [...newCourse.authors, author.id],
                  })
                }
              />
            ))}
          </div>
          <div className={styles.courseAuthorsBlock}>
            <h4 className={styles.title}>Course authors</h4>
            {newCourse.authors.length ? (
              newCourse.authors.map((authorId) => {
                const author = authorsList.find((el) => el.id === authorId);
                return (
                  <AuthorItem
                    authorName={author!.name}
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
    </FormGroup>
  );
};
