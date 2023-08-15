import { sequelize } from '../../db';
import { ForumServices } from '../services/forumServices';

export const initForums = async () => {
  const forumService = new ForumServices(sequelize);

  const existingForums = await forumService.getAllForums();

  if (existingForums.length === 0) {
    await forumService.createForum({
      description:
        'Обсуждение информации об игре, кодов предзаказа, обновлений и списков изменений.',
      name: 'Обсуждение игровых моментов',
    });
    await forumService.createForum({
      description:
        'Проблема с активацией кода или подключением? Низкая производительность? Сбой, зависание или ошибка? Ищите решения проблем в нашем сообществе.',
      name: 'Технические вопросы',
    });
  }
};
