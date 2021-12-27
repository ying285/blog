import BlogDetail from "../../components/Blogs/BlogDetail/BlogDetail";
import { MongoClient, ObjectId } from "mongodb";

function DetailPage(props) {
  return (
    <BlogDetail
      image={props.blogDetail.image}
      title={props.blogDetail.title}
      content={props.blogDetail.content}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ying285:Klkmo123@cluster0.cd8mj.mongodb.net/alisablog?retryWrites=true&w=majority"
  );
  const db = client.db();
  const alisablogCollection = db.collection("alisablog");

  const blogItems = await alisablogCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: blogItems.map((item) => ({
      params: { blogsDetail: item._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data from a single blogitem
  const blogsDetail = context.params.blogsDetail;

  const client = await MongoClient.connect(
    "mongodb+srv://ying285:Klkmo123@cluster0.cd8mj.mongodb.net/alisablog?retryWrites=true&w=majority"
  );
  const db = client.db();
  const alisablogCollection = db.collection("alisablog");

  const selectedblog = await alisablogCollection.findOne({
    _id: ObjectId(blogsDetail),
  });

  client.close();

  return {
    props: {
      blogDetail: {
        id: selectedblog._id.toString(),
        title: selectedblog.title,
        content: selectedblog.content,
        image: selectedblog.image,
      },
    },
  };
}

export default DetailPage;
