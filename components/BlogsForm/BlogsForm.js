import { useRef, useState } from "react";

import classes from "./BlogsForm.module.css";

const BlogsForm = (props) => {
  const titleInputRef = useRef();
  //const fotoInputRef = useRef();
  const contentInputRef = useRef();
  const [getImage, setGetImage] = useState(null);

  const imageInputHandler = (e) => {
    setGetImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredTitle = titleInputRef.current.value.trim();
    const enteredImage = getImage;
    const enteredContent = contentInputRef.current.value.trim();

    if (enteredTitle !== "" && enteredContent !== "" && enteredImage !== "") {
      const theDate = new Date().toString().slice(0, 16);
      const blogItems = {
        title: enteredTitle,
        image: enteredImage,
        content: enteredContent,
        date: theDate,
      };
      props.onAddBlogItems(blogItems);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" required id="title" ref={titleInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="image">Image</label>
        <input type="file" required id="image" onChange={imageInputHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Content</label>
        <textarea
          id="description"
          required
          rows="5"
          ref={contentInputRef}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button>Add Blog</button>
      </div>
    </form>
  );
};

export default BlogsForm;
