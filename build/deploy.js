import scpClient from 'scp2';
import ora from 'ora';
import path from 'path';

const LOCAL_PATH = path.resolve('dist');

const server = {
  host: '192.168.1.1',
  port: 22,
  username: '****',
  password: '***',
  path: '/www/web',
};

const loading = ora(`正在部署至 ${server.host}:${server.path}`);
loading.start();

scpClient.scp(LOCAL_PATH, server, (err) => {
  loading.stop();
  if (err) {
    console.log('部署失败');
    throw err;
  } else {
    console.log('部署成功');
  }
});
