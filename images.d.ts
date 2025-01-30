declare module '*.png' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export = value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export = value;
  }
  
  declare module '*.gif' {
    const value: string;
    export = value;
  }
  
  declare module '*.svg' {
    import * as React from 'react';
    const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  
  declare module '*.webp' {
    const value: string;
    export = value;
  }
  