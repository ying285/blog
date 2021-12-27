import BlogsForm from "../../components/BlogsForm/BlogsForm";
import { useRouter } from "next/router";

function addFormPage() {
  const router = useRouter();
  async function addBlogItemsHandler(blogItems) {
    console.log(blogItems.date);
    const fd = new FormData();
    fd.append("image", blogItems.image.name);

    console.log(fd);

    const response = await fetch("/api/newBlog", {
      method: "POST",

      body: JSON.stringify({
        image: fd,
        title: blogItems.title,
        content: blogItems.content,
        date: blogItems.date,
      }),

      // {
      //   image: formData,
      //   title: JSON.stringify(blogItems.title),
      //   content: JSON.stringify(blogItems.content),
      // },

      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return <BlogsForm onAddBlogItems={addBlogItemsHandler} />;
}

export default addFormPage;
