import { SaveOutlined } from '@ant-design/icons';

import { Button } from '@/component/button';

/** دکمه ذخیره پایین هر کارت (submit فرم همان کارت) */
export const SaveButton = ({ loading, text = 'ذخیره' }: { loading: boolean; text?: string }) => (
  <div className="mt-2">
    <Button variant="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
      {text}
    </Button>
  </div>
);
