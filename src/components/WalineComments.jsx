// src/components/WalineComments.jsx
'use client';
import { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css'; // ✅ 修正 CSS 路径

export default function WalineComments({ path }) {
  const walineInstanceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (walineInstanceRef.current) {
      walineInstanceRef.current.destroy();
    }

    walineInstanceRef.current = init({
      el: containerRef.current,
      serverURL: 'https://waline-blog-t0tez5p1e-badragon.vercel.app', // ✅ 去掉末尾斜杠
      path: path || window.location.pathname,
      lang: 'zh-CN',
      dark: 'auto',
      reaction: false,
      search: false,
      login: 'disable',
      anonymous: true,
      requiredMeta: ['nick', 'mail'],
      placeholder: '欢迎留言！支持 Markdown 语法哦~',
      avatar: 'mp',
      meta: ['nick', 'mail', 'link'],
      pageSize: 10,
    });

    return () => {
      if (walineInstanceRef.current) {
        walineInstanceRef.current.destroy();
      }
    };
  }, [path]);

  return (
    <div className="waline-comments mt-12 pt-8 border-t">
      <div ref={containerRef} />
    </div>
  );
}
