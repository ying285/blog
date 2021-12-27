import BlogsForm from "../../components/BlogsForm/BlogsForm";
import { useRouter } from "next/router";

function addFormPage() {
  const router = useRouter();
  async function addBlogItemsHandler(blogItems) {
    const fd = new FormData();
    fd.append("title", blogItems.title);
    fd.append("image", blogItems.image);
    fd.append("date", blogItems.date);
    fd.append("content", blogItems.content);

    const response = await fetch("/api/newBlog", {
      method: "POST",
      body: fd,
    });

    // const response = await fetch("/api/newBlog", {
    //   method: "POST",

    //   body: JSON.stringify({
    //     image: fd,
    //     title: blogItems.title,
    //     content: blogItems.content,
    //     date: blogItems.date,
    //   }),

    //   // {
    //   //   image: formData,
    //   //   title: JSON.stringify(blogItems.title),
    //   //   content: JSON.stringify(blogItems.content),
    //   // },

    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return <BlogsForm onAddBlogItems={addBlogItemsHandler} />;
}

export default addFormPage;
