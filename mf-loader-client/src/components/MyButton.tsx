import React, { useEffect, useState } from 'react';
import { JJButton } from '../types';
import { ModuleLoader } from '../loader';

const MyButton: React.FC<JJButton> = (props) => {
  const [Component, setComponent] = useState<React.FC<JJButton>>();

  useEffect(() => {
    if (!Component)
      setComponent(ModuleLoader<JJButton>('jjwang_remote_app', './MyButton'));
  }, []);

  return (
    <React.Suspense fallback="微模块正在加载...">
      {Component && <Component {...props} />}
    </React.Suspense>
  );
};

export default MyButton;
