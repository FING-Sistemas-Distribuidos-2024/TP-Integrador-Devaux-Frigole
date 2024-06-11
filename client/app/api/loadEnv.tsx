"use server";

export default async function handler(req: any, res: any) {
  res.status(200).json({ BACKEND_URL: process.env.BACKEND_URL });
}
