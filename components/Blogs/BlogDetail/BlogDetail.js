import classes from "./BlogDetail.module.css";

const BlogDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>

      <p>{props.content}</p>
    </section>
  );
};

export default BlogDetail;
