import { baseAxiosInstance, forumAxiosInstance } from '@api/baseAxiosInstance';

const getAllForums = () => {
  return forumAxiosInstance.get('/forums');
};

const getAllTopics = (forumId: string) => {
  return forumAxiosInstance.get(`/forumTopics?forumId=${forumId}`);
};

interface ICreateNewTopicData {
  forumId?: string;
  name: string;
  yaId: string;
  authorName: string;
}

const createNewTopic = (responseData: ICreateNewTopicData) => {
  return forumAxiosInstance.post('/forumTopics', responseData);
};

const getTopicComments = (id: string) => {
  return forumAxiosInstance.get(`/comments?topicId=${id}`);
};

const getAuthorComment = (id: string) => {
  return baseAxiosInstance.get(`/user/${id}`);
};

interface ISendComment {
  text: string;
  topicId: number;
  authorName: string;
  authorAvatar: string;
  authorYaId: string;
}

const sendCommet = (id: string, data: ISendComment) => {
  return forumAxiosInstance.post(`/comments?topicId=${id}`, data);
};

export const forumApi = {
  getAllForums,
  getAllTopics,
  createNewTopic,
  getTopicComments,
  getAuthorComment,
  sendCommet,
};
