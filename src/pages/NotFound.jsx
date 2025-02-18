import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您请求的页面不存在。</p>
      <Link to="/">返回首页</Link>
    </div>
  );
}

export default NotFound;