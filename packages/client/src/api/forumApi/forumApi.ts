import { forumAxiosInstance } from '@api/baseAxiosInstance';

const getAllForums = () => {
  return forumAxiosInstance.get('/forums');
};

const getAllTopics = (id: string) => {
  return forumAxiosInstance.get(`/forumTopics?forumId=${id}`);
};

interface ICreateNewTopicData {
  forumId: string | undefined;
  name: string;
  yaId: string;
  authorName: string;
}

const createNewTopic = (responseData: ICreateNewTopicData) => {
  return forumAxiosInstance.post('/forumTopics', responseData);
};

export const forumApi = {
  getAllForums,
  getAllTopics,
  createNewTopic,
};
