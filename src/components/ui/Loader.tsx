import * as React from "react";

export const Loader: React.FC = () => {

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="relative -mt-32">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 "></div>
        <div className="absolute  top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin">
        </div>
    </div>
</div>
  );
};
