import fs from 'fs/promises';
import fetch from 'node-fetch';

async function getCategories() {
  const apiUrlCategories = 'https://api.mercadolibre.com/sites/MLA/categories';

  try {
    const responseCategories = await fetch(apiUrlCategories);

    if (!responseCategories.ok) {
      throw new Error(
        `Error in the API call for categories: ${responseCategories.status}`,
      );
    }

    const dataCategories = await responseCategories.json();
    return dataCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

async function fetchDataByCategory(category) {
  const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?category=${category.id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Error in the API call for the category ${category.name}: ${response.status}`,
      );
    }

    const data = await response.json();

    // Get only the first 10 results
    const results = data.results.slice(0, 10);

    // Extract only the attributes we need
    const products = [];

    for (const product of results) {
      // Check if the price is null and look for another product if necessary
      if (product.price === null) {
        console.log(
          `Product with null price found. Looking for another product.`,
        );
        continue; // Skip to the next iteration of the loop
      }

      products.push({
        name: product.title,
        condition: product.condition,
        imageUrl: product.thumbnail,
        price: product.price,
        category: category.name,
      });
    }

    console.log(`Data for category ${category.name}:`, products);

    return products;
  } catch (error) {
    console.error(`Error for category ${category.name}:`, error);
    return null;
  }
}

async function fetchDataByCategories() {
  const categories = await getCategories();

  if (categories) {
    const completeData = [];

    for (const category of categories) {
      const categoryData = await fetchDataByCategory(category);

      if (categoryData) {
        completeData.push(...categoryData);
      }
    }

    // Save to a JSON file (overwrites the file each time)
    try {
      await fs.writeFile(
        'productData.json',
        JSON.stringify(completeData, null, 2),
      );
      console.log('Data saved in productData.json');
    } catch (error) {
      console.error('Error writing to the JSON file:', error);
    }
  }
}

// Call the main function
fetchDataByCategories();
