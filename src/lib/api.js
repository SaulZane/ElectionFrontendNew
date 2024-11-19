import axios from 'axios';

export const API_BASE = "http://192.168.1.101:8000";  //这块改地址！！！！！！！！！

// Axios 实例配置
const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// 开始抢答
export async function startQuiz() {
  const response = await api.get('/start');
  return response.data;
}

// 停止抢答
export async function stopQuiz() {
  const response = await api.get('/stop');
  return response.data;
}

// 提交抢答
export async function submitAnswer(username) {
  try {
    const response = await api.post('/begin', { username });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('网络错误，请稍后重试');
  }
}

// 获取排名
export async function getRanking() {
  const response = await api.get('/ranking');
  return response.data;
}
