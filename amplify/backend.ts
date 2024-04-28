import { defineBackend } from '@aws-amplify/backend';
import { loadResourceModule } from './resourceLoader.js';

const loadResource = async (resourceName) => {
  try {
    const resourceModule = await loadResourceModule(resourceName);
    return resourceModule;
  } catch (error) {
    console.error(`Failed to load resource module ${resourceName}:`, error);
    throw error;
  }
};

(async () => {
  try {
    const [auth, data] = await Promise.all([
      loadResource('auth'),
      loadResource('data'),
    ]);

    defineBackend({
      auth,
      data,
    });

    console.log('Backend defined successfully');
  } catch (error) {
    console.error('Failed to define backend:', error);
  }
})();
