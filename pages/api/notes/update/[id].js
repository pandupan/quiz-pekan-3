export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/update`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({});
  }
}
