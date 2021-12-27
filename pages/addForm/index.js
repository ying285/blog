import BlogsForm from "../../components/BlogsForm/BlogsForm";

function AddFormPage() {
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
  }

  return <BlogsForm onAddBlogItems={addBlogItemsHandler} />;
}

export default AddFormPage;
