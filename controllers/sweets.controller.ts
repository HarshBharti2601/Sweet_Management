import type { Response } from "express"
import { prisma } from "../lib/prisma.js"
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js"

// =======================
// ADD SWEET
// POST /api/sweets
// =======================
export const addSweet = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { name, category, price, quantity } = req.body

    if (!name || !category || price == null || quantity == null) {
      res.status(400).json({ message: "All fields are required" })
      return
    }

    const sweet = await prisma.sweet.create({
      data: {
        name,
        category,
        price,
        quantity
      }
    })

    res.status(201).json(sweet)
  } catch {
    res.status(500).json({ message: "Failed to add sweet" })
  }
}

// =======================
// GET ALL SWEETS
// GET /api/sweets
// =======================
export const getAllSweets = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const sweets = await prisma.sweet.findMany({
      orderBy: { createdAt: "desc" }
    })

    res.status(200).json(sweets)
  } catch {
    res.status(500).json({ message: "Failed to fetch sweets" })
  }
}

// =======================
// SEARCH SWEETS
// GET /api/sweets/search
// =======================
export const searchSweets = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query

    const sweets = await prisma.sweet.findMany({
      where: {
        AND: [
          name
            ? { name: { contains: String(name), mode: "insensitive" } }
            : {},
          category
            ? { category: { contains: String(category), mode: "insensitive" } }
            : {},
          minPrice
            ? { price: { gte: Number(minPrice) } }
            : {},
          maxPrice
            ? { price: { lte: Number(maxPrice) } }
            : {}
        ]
      }
    })

    res.status(200).json(sweets)
  } catch {
    res.status(500).json({ message: "Search failed" })
  }
}

// =======================
// UPDATE SWEET
// PUT /api/sweets/:id
// =======================
export const updateSweet = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: "Sweet ID is required" })
      return
    }

    const { name, category, price, quantity } = req.body

    const sweet = await prisma.sweet.update({
      where: { id },
      data: {
        name,
        category,
        price,
        quantity
      }
    })

    res.status(200).json(sweet)
  } catch {
    res.status(404).json({ message: "Sweet not found" })
  }
}

// =======================
// DELETE SWEET
// DELETE /api/sweets/:id
// =======================
export const deleteSweet = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: "Sweet ID is required" })
      return
    }

    await prisma.sweet.delete({
      where: { id }
    })

    res.status(200).json({ message: "Sweet deleted" })
  } catch {
    res.status(404).json({ message: "Sweet not found" })
  }
}

// =======================
// PURCHASE SWEET
// POST /api/sweets/:id/purchase
// =======================
export const purchaseSweet = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params
    const { quantity } = req.body

    if (!id) {
      res.status(400).json({ message: "Sweet ID is required" })
      return
    }

    if (!quantity || quantity <= 0) {
      res.status(400).json({ message: "Invalid quantity" })
      return
    }

    const sweet = await prisma.sweet.findUnique({
      where: { id }
    })

    if (!sweet || sweet.quantity < quantity) {
      res.status(400).json({ message: "Insufficient stock" })
      return
    }

    await prisma.$transaction([
      prisma.sweet.update({
        where: { id },
        data: { quantity: sweet.quantity - quantity }
      }),
      prisma.inventoryLog.create({
        data: {
          userId: req.user!.userId,
          sweetId: id,
          quantity,
          action: "PURCHASE"
        }
      })
    ])

    res.status(200).json({ message: "Sweet purchased successfully" })
  } catch {
    res.status(500).json({ message: "Purchase failed" })
  }
}

// =======================
// RESTOCK SWEET
// POST /api/sweets/:id/restock
// =======================
export const restockSweet = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params
    const { quantity } = req.body

    if (!id) {
      res.status(400).json({ message: "Sweet ID is required" })
      return
    }

    if (!quantity || quantity <= 0) {
      res.status(400).json({ message: "Invalid quantity" })
      return
    }

    const sweet = await prisma.sweet.findUnique({
      where: { id }
    })

    if (!sweet) {
      res.status(404).json({ message: "Sweet not found" })
      return
    }

    await prisma.$transaction([
      prisma.sweet.update({
        where: { id },
        data: { quantity: sweet.quantity + quantity }
      }),
      prisma.inventoryLog.create({
        data: {
          userId: req.user!.userId,
          sweetId: id,
          quantity,
          action: "RESTOCK"
        }
      })
    ])

    res.status(200).json({ message: "Sweet restocked successfully" })
  } catch {
    res.status(500).json({ message: "Restock failed" })
  }
}
