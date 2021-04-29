import axios from 'axios';

const EXPO_SERVER_URL = 'https://exp.host/--/api/v2/push/send'
const TOKEN_SERVER_URL = 'http://gau-server.glitch.me/notifications'

export interface Token {
    id: number
    token: string
}

export const submitToken = async (token: string) => {
    const response = await axios.post(TOKEN_SERVER_URL, { token })
    const result = response.data as Token
    return result
}

export const getToken = async (id: number | string) => {
    const response = await axios.get(`${TOKEN_SERVER_URL}/${id}`)
    const result = response.data as Token
    return result
}

export const sendPushNotification = async (token: string, title: string, body: string) => {
    const message = {
        to: token,
        sound: 'default',
        title,
        body,
    };

    await axios.post(EXPO_SERVER_URL, message);
    alert("Successfully summoning the bear 🐻🐻🐻");
}