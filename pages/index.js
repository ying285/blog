import BlogList from "../components/Blogs/BlogList/BlogList";
import "bootstrap/dist/css/bootstrap.min.css";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return <BlogList blogs={props.blogItems} />;
}

export async function getStaticProps() {
  //fetch data from api

  const client = await MongoClient.connect(
    "mongodb+srv://ying285:Klkmo123@cluster0.cd8mj.mongodb.net/alisablog?retryWrites=true&w=majority"
  );
  const db = client.db();
  const alisablogCollection = db.collection("alisablog");

  const blogItems = await alisablogCollection.find().toArray();

  client.close();
  console.log(blogItems);
  return {
    props: {
      blogItems: blogItems.map((item) => ({
        title: item.title,
        date: item.date,
        id: item._id.toString(),
        image: item.image,
        content: item.content,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
