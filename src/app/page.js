import Form from "./components/Form";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <div className="w-full  relative  flex items-center justify-center overflow-y-hidden p-12">
        <div className="absolute top-12 left-0">
          <img src="/BgVector.png" alt="BgVector" className="object-contain" />
        </div>
        <div className="w-[1100px] flex flex-col gap-6 z-10 bg-white">
          <Header />
          <Form />
        </div>
      </div>
    </>
  );
}
