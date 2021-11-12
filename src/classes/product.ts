class Product {
  private static last_ID_generated: number = 0

  private ID: number = 0;
  private name: String = '';
  private weight: number = 0;
  private price: number = 0;


  private generate_new_ID(): number {
    Product.last_ID_generated++;
    return Product.last_ID_generated;
  }

  private processID(ID: number) {
	  if(ID > 0)
		  this.ID = ID;
	  else
		  throw new Error('ID has to be strictly positive');
  }

  private processName(name: string) {
	  if(name.length > 0)
		  this.name = name;
	  else
		  throw new Error('Name can\'t be empty');
  }

  private processWeight(weight: number) {
	  if(weight > 0)
		  this.weight = weight;
	  else
		  throw new Error('Weight has to be strictly positive');
  }


  private processPrice(price: number) {
	  if(price > 0)
		  this.price = price;
	  else
		  throw new Error('Price has to be strictly positive');
  }

  constructor(name: string, weight: number, price: number) {
	  this.processID(this.generate_new_ID());
	  this.processName(name);
	  this.processWeight(weight);
	  this.processPrice(price);
  }

  getID(): number {
	  return this.ID;
  }

  getName(): String {
	  return this.name;
  }

  getWeight(): number {
	  return this.weight;
  }

  getPrice(): number {
	  return this.price;
  }
}

export { Product };
