// To use this code i used the following command
// "node --experimental-modules fetchingData.mjs"
// This code extracts 10 products of each category from Mercado Libre
import fs from 'fs/promises';
import fetch from 'node-fetch';

async function getCategories() {
  const categoriesApiUrl = 'https://api.mercadolibre.com/sites/MLA/categories';

  try {
    const categoriesResponse = await fetch(categoriesApiUrl);

    if (!categoriesResponse.ok) {
      throw new Error(
        `Error calling the categories API: ${categoriesResponse.status}`,
      );
    }

    const categoriesData = await categoriesResponse.json();
    return categoriesData;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

async function getImageUrl(thumbnailId) {
  const imageUrlApi = `https://api.mercadolibre.com/pictures/${thumbnailId}`;

  try {
    const imageResponse = await fetch(imageUrlApi);

    if (!imageResponse.ok) {
      throw new Error(`Error calling the images API: ${imageResponse.status}`);
    }

    const imageData = await imageResponse.json();
    const firstVariation = imageData.variations[0];

    if (!firstVariation) {
      throw new Error(`The image has no variations.`);
    }

    return firstVariation.secure_url;
  } catch (error) {
    console.error(`Error fetching the image URL for ${thumbnailId}:`, error);
    return null;
  }
}

async function fetchDataByCategory(category) {
  const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?category=${category.id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Error calling the API for category ${category.name}: ${response.status}`,
      );
    }

    const data = await response.json();

    // Get only the first 10 results
    const results = data.results.slice(0, 10);

    // Extract only the necessary attributes
    const products = [];

    for (const product of results) {
      // Check if the price is null and look for another product if necessary
      if (product.price === null) {
        console.log(
          `Product with null price found. Looking for another product.`,
        );
        continue; // Skip to the next iteration of the loop
      }

      const thumbnailId = product.thumbnail_id;
      const imageUrl = thumbnailId ? await getImageUrl(thumbnailId) : null;

      products.push({
        name: product.title,
        condition: product.condition,
        imageUrl: imageUrl, // Use the obtained image URL
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
