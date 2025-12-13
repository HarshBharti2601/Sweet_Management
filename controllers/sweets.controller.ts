import type { Request, Response } from "express";

export const addSweet = async (req: Request, res: Response) => {
  res.status(201).json({ message: "Sweet added" });
};

export const getAllSweets = async (req: Request, res: Response) => {
  res.status(200).json({ sweets: [] });
};

export const searchSweets = async (req: Request, res: Response) => {
  res.status(200).json({ results: [] });
};

export const updateSweet = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Sweet updated" });
};

export const deleteSweet = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Sweet deleted" });
};

export const purchaseSweet = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Sweet purchased" });
};

export const restockSweet = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Sweet restocked" });
};
