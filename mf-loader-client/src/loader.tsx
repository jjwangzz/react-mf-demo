import React from 'react';
import { init } from './container';

export function ModuleLoader<T>(
  scope: string,
  moduleName: string
): React.FC<T> {
  if (!window)
    return React.lazy(async () => ({
      default: () => null,
    }));
  try {
    const container = init(scope);
    console.log('ModuleLoader', container);
    return React.lazy(async () => {
      const Module = (await container.get(moduleName))().default;
      return {
        default: (props) => <Module {...props} />,
      };
    });
  } catch (error) {
    return React.lazy(async () => ({
      default: () => <>模块加载失败</>,
    }));
  }
}
