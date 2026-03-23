import path from 'node:path';

// Define o caminho para a pasta 'uploads' na raiz do seu projeto backend
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export const uploadConfig = {
  directory: uploadFolder,
};