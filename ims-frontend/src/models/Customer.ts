export class Customers {
    CustomerID: string;
    Name: string;
    Email: string;
    Address: string;

    constructor(CustomerID: string, Name: string, Email: string, Address: string) {
        this.CustomerID = CustomerID;
        this.Name = Name;
        this.Email = Email;
        this.Address = Address;
    }
}