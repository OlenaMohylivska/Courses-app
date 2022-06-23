import React, {
  ChangeEvent,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { FormControl } from '@mui/material';
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
import './styles.scss';

type CreateCourseProps = {
  coursesList: ICourse[];
  setCoursesList: Dispatch<SetStateAction<ICourse[]>>;
  setAuthorsList: Dispatch<SetStateAction<IAuthor[]>>;
  authorsList: IAuthor[];
  setIsCreateCourse: Dispatch<SetStateAction<boolean>>;
};

export const CreateCourse: React.FC<CreateCourseProps> = ({
  coursesList,
  setCoursesList,
  authorsList,
  setAuthorsList,
  setIsCreateCourse,
}) => {
  const [enteredAuthorName, setEnteredAuthorName] = useState('');

  const [newCourse, setNewCourse] = useState<ICourse>({
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  });

  const onAuthorCreate = () => {
    if (enteredAuthorName.length >= 2) {
      setAuthorsList([
        ...authorsList,
        { id: toGenerateId(), name: enteredAuthorName },
      ]);
      setEnteredAuthorName('');
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCourse((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value };
    });
  };
  useEffect(() => {
    setNewCourse({
      ...newCourse,
      id: toGenerateId(),
      creationDate: getDate(),
    });
  }, []);

  const authors = useMemo(() => {
    if (!newCourse.authors.length) return authorsList;
    return authorsList.filter((author) => {
      const currentAuthor = newCourse.authors.find((el) => el === author.id);
      return currentAuthor ? !currentAuthor : author;
    });
  }, [authorsList, newCourse.authors]);

  const saveCourse = () => {
    const res = Object.values(newCourse).findIndex((el) => !!el === false);

    if (res !== -1 || newCourse.authors.length === 0) {
      alert('Please, fill in all fields');
    } else {
      setCoursesList([...coursesList, newCourse]);
      setIsCreateCourse(false);
    }
  };

  return (
    <FormControl
      className="create-course"
      sx={{ display: 'block', margin: '15px' }}
    >
      <div className="wrapper">
        <Input
          placeholderText="Enter title..."
          inputValue={newCourse.title}
          onChange={handleInputChange}
          label="Title"
          inputType="text"
          name="title"
        />

        <Button buttonText={BUTTON_TEXT_CREATE_COURSE} onClick={saveCourse} />
      </div>

      <TextArea
        placeholder="Enter description..."
        label="Description"
        textAreaValue={newCourse.description}
        onChange={handleInputChange}
        name="description"
      />

      <div className="details-block">
        <div className="add-author-block">
          <h4 className="details-block-title">Add author</h4>
          <Input
            placeholderText="Enter author name..."
            inputValue={enteredAuthorName}
            onChange={(event) => setEnteredAuthorName(event.target.value)}
            inputType="text"
            name="name"
            fullWidth
          />
          <Button
            buttonText={BUTTON_TEXT_CREATE_AUTHOR}
            onClick={onAuthorCreate}
          />
        </div>
        <div className="duration-block">
          <h4 className="details-block-title">Duration</h4>
          <Input
            placeholderText="Enter duration in minutes..."
            inputValue={newCourse.duration > 0 ? newCourse.duration : ''}
            onChange={handleInputChange}
            inputType="number"
            fullWidth
            name="duration"
          />
          <p className="duration-string">
            Duration:
            <span className="duration-string-number">
              {getCourseDuration(newCourse.duration).slice(0, 5)}
            </span>
            {getCourseDuration(newCourse.duration).slice(5)}
          </p>
        </div>

        <div className="existed-authors-block">
          <h4 className="details-block-title">Authors</h4>

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
        <div className="course-authors-block">
          <h4 className="details-block-title">Course authors</h4>
          {newCourse.authors.length ? (
            newCourse.authors.map((authorId) => {
              const authorName = authorsList.find((el) => el.id === authorId);
              return (
                <AuthorItem
                  authorName={authorName!.name}
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
