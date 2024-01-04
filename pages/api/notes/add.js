export default async function handler(req, res) {
  try {
    const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes`, {
      method: "POST",
      body: JSON.stringify(req.body), // Ensure the body is stringified
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({});
  }
}
