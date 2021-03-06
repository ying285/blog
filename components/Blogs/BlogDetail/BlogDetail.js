import classes from "./BlogDetail.module.css";

const BlogDetail = (props) => {
  return (
    <section className={classes.detail}>
      <div className={classes.imageDetail}>
        <img src={props.image} alt={props.title} />
      </div>

      <h1>{props.title}</h1>

      <p>{props.content}</p>
    </section>
  );
};

export default BlogDetail;
