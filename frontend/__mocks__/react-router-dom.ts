import { vi } from 'vitest';

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
}));