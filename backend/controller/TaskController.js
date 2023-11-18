import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getTasks = async (req, res) => {
    try {
        const response = await prisma.task.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTaskById = async (req, res) => {
    try {
        const response = await prisma.task.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const createTask = async (req, res) => {
    /*
    title       String
    description String
    dueDate     DateTime
    priority    String
    isComplete  Boolean  @default(false)
    categoryId  Int
    userId      Int
    */
    const { title, description, dueDate, priority = 'low', isComplete = false, categoryId } = req.body;

    if (!title || !description || !dueDate || !categoryId) {
        return res.status(400).json({ error: `Title, Description, DueDate and CategoryID are required` })
    }
    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                priority,
                isComplete,
                categoryId: +categoryId,
                userId: req?.user?.id
            },
        })
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateTask = async (req, res) => {
    const { title, description, dueDate, priority = 'low', isComplete = false, categoryId } = req.body;

    try {
        const task = await prisma.task.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                priority,
                isComplete,
                categoryId: +categoryId
            },
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await prisma.task.delete({
            where: {
                id: Number(req.params.id),
            },
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
