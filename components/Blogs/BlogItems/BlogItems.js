import classes from "./BlogItems.module.css";
import { useRouter } from "next/router";

const BlogItems = (props) => {
  const router = useRouter();
  const showDetailHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item}>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>

      <div className={classes.content}>
        <p>{props.date}</p>
        <h3>{props.title}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={showDetailHandler}>Read more...</button>
      </div>
    </li>
  );
};

export default BlogItems;
