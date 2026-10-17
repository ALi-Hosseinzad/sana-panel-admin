import { Result } from 'antd';

import { PanelCard } from '@/component/card';

/** صفحه موقت — صفحات واقعی هر بخش بعداً در features ساخته می‌شوند */
export const HomePage = () => (
  <PanelCard>
    <Result
      status="info"
      title="به پنل سانا خوش آمدید"
      subTitle="محتوای این بخش هنوز ساخته نشده است."
    />
  </PanelCard>
);
