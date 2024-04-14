async function getRecipes() {
  try {
    const response = await fetch('../data.json');

    if (!response.ok || response.status !== 200) {
      console.error(`[${response.status}] Impossible to fetch recipes at '${response.url}'`);
      return;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
