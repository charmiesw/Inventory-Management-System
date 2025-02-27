import {PrismaClient} from '@prisma/client';
import Customer from "../model/Customer";
import Item from "../model/Item";

const prisma = new PrismaClient();

// ######################### CUSTOMER #########################

export async function CustomerAdd(c: Customer) {
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                Name: c.Name,
                Email: c.Email,
                Address: c.Address,
            }
        })
        console.log('Customer Added :', newCustomer)
        return newCustomer;
    } catch (err) {
        console.log("error adding customer", err);
    }
}

export async function CustomerDelete(id: number) {
    try {
        const deletedCustomer = await prisma.customer.delete({
            where: {CustomerID: id}
        });
        console.log('Customer deleted :', id);
        return deletedCustomer;
    } catch (err) {
        console.log("error deleting customer", err);
    }
}

export async function getAllCustomers() {
    try {
        return await prisma.customer.findMany();
    } catch (err) {
        console.log("error getting customers from prisma data", err);
    }
}

export async function CustomerUpdate(id: number, c: Customer) {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: {Email: c.Email},
            data: {
                Name: c.Name,
                Address: c.Address
            }
        })
        console.log('Customer updated :', updatedCustomer);
        return updatedCustomer;
    } catch (err) {
        console.log("error updating customer", err);
    }
}

// ######################### ITEM #########################

export async function ItemAdd(i: Item) {
    try {
        const newItem = await prisma.item.create({
            data: {
                Name: i.Name,
                Quantity: i.Quantity,
                Price: i.Price,
            }
        })
        console.log('Item Added :', newItem)
        return newItem;
    } catch (err) {
        console.log("error adding item", err);
    }
}

export async function ItemDelete(id: number) {
    try {
        const deletedItem = await prisma.item.delete({
            where: {ItemID: id}
        });
        console.log('Item deleted :', id);
        return deletedItem;
    } catch (err) {
        console.log("error deleting item", err);
    }
}

export async function getAllItems() {
    try {
        return await prisma.item.findMany();
    } catch (err) {
        console.log("error getting items from prisma data", err);
    }
}

export async function ItemUpdate(id: number, i: Item) {
    try {
        const updatedItem = await prisma.item.update({
            where: {ItemID: i.ItemID},
            data: {
                Name: i.Name,
                Quantity: i.Quantity,
                Price: i.Price
            }
        })
        console.log('Item updated :', updatedItem);
        return updatedItem;
    } catch (err) {
        console.log("error updating item", err);
    }
}