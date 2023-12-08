import axios from 'axios';
const key = `AIzaSyBocEQzXfauH1fcuQz5QaMWq9ehG7VuxIg`
const videoId = `th5_9woFJmk`
const options = `statistics`

const url = `https://youtube.googleapis.com/youtube/v3/videos?key=${key}`
const url2 = `https://youtube.googleapis.com/youtube/v3/channels?key=${key}`

// https://youtube.googleapis.com/youtube/v3/channels?key=AIzaSyBocEQzXfauH1fcuQz5QaMWq9ehG7VuxIg&id=UCmIu_lfYrSnfnNhH6kmcG2Q&part=statistics

const getVideoData = async (videoId, options) => axios.get(`${url}&id=${videoId}&part=${options}`)

const getChannelData = async (channelId) => axios.get(`${url2}&id=${channelId}&part=statistics`)

export { getChannelData, getVideoData }