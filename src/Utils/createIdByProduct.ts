function createIdByProduct(productName: string, productCategory: string): string {
    const namePrefix = productName.slice(0, 3).toLowerCase();
    const productCategoryPrefix = productCategory.slice(0, 3).toLowerCase();
    return `${namePrefix}${productCategoryPrefix}-${Math.floor(Math.random() * 10000)}`;
  }
  
  export default createIdByProduct;