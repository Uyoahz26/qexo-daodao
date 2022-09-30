import { createSSRApp } from 'vue';
import { store } from '@/store';
import App from './App.vue';
// import './uni_modules/vk-uview-ui/theme.scss';
import 'virtual:windi.css';
import '@/styles/index.scss';
import uView from './uni_modules/vk-uview-ui';

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(uView);
  return {
    app,
  };
}
