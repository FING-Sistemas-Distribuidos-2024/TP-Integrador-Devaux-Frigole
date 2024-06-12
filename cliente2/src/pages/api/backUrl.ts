export default async function handler(req: any, res: any) {
  res.status(200).json({ BACKURL: process.env.BACKEND_URL });
  //console.log("BACKURL: ", process.env.BACKEND_URL);
}
