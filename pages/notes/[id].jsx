import dynamic from "next/dynamic";



const DetailNotes = ({notes}) => {
  console.log("detail notes =>", notes);
  return (

      <div className="w-full min-h-full">
        <p>Judul : {notes.data.title}</p>
        <p>Desc : {notes.data.description}</p>
      </div>

  );
};

export default DetailNotes;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/notes/");
  const notes = await res.json();
  console.log(notes)

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id.toString(),
    },
  }));
  console.log(paths)

  return {
    paths,
    fallback: true, // false or "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const res = await fetch(
    `http://localhost:3000/api/notes/${id}`
  );
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}