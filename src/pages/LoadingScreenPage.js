import { Triangle } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Triangle
        visible={true}
        height="100"
        width="100"
        color="#FF6452"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      App Loading...
    </div>
  );
};

export default LoadingScreen;
