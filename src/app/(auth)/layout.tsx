import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mt-32 p-10 rounded-md lg:w-[600px] w-[400px] flex items-center justify-center">
        <div className="bg-gray-300 p-10 rounded-md flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
