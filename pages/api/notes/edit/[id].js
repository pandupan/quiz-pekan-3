export default async function handler(req, res) {
    const { id } = req.query;
  
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({});
    }
  }
  