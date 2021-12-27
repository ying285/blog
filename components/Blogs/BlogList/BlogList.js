import classes from "./BlogList.module.css";
import BlogItems from "../BlogItems/BlogItems";

const BlogList = (props) => {
  return (
    <ul className={classes.list}>
      {props.blogs.map((blog) => (
        <BlogItems
          key={blog.id}
          id={blog.id}
          image={blog.image}
          title={blog.title}
          date={blog.date}
          content={blog.content}
        />
      ))}
    </ul>
  );
};

export default BlogList;
