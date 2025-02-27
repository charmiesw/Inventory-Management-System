import express from "express";
import Item from "../model/Item";
import {ItemAdd, ItemDelete, ItemUpdate, getAllItems} from "../database/prisma-data-store";

const router = express.Router();

router.post("/add", async(req, res) => {
    console.log(req.body);
    const item: Item= req.body;
    try{
        const addedItem = await ItemAdd(item);
        res.json(addedItem);
    }catch(err){
        console.log("error adding item", err);
        res.status(400).send("error adding item");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: number  =+ req.params.id;
    try{
        const deletedItem = await ItemDelete(id);
        res.json(deletedItem);
    }catch(err){
        console.log("error deleting item", err);
    }
})


router.put("/update/:id",async (req, res) => {
    const id:number =+ req.params.id;
    const item : Item = req.body;

    try{
        const updatedItem = await ItemUpdate(id, item);
        res.json(updatedItem);
    }catch(err){
        console.log("error updating item", err);
    }
})

router.get("/view", async (req, res) => {
    try{
       const item=  await getAllItems();
       res.json(item);
    }catch(err){
        console.log("error getting items", err);
    }
})
export default router;