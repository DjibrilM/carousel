import { useEffect, useRef, useState } from 'react'
import Controller from './components/controller';

function App() {
  let [carouselWidth, setCarouselWidth] = useState<number>(0);
  let innerCarousel = useRef<HTMLDivElement>();
  const [images, setImages] = useState<{ url: string, active: boolean }[]>([
    {
      url: "https://wallpaperaccess.com/full/9070071.png",
      active: false
    },
    {
      url: "https://wallpaperaccess.com/full/9070068.jpg",
      active: false
    },
    {
      url: "https://wallpaperaccess.com/full/9070086.png",
      active: false
    },
    {
      url: "https://wallpaperaccess.com/full/9070125.jpg",
      active: false
    },
    {
      url: "https://wallpaperaccess.com/full/9070152.jpg",
      active: false
    },
  ]);

  useEffect(() => {
    function getCarouselWidth() {
      const carousel = document.querySelector('.carousel') as HTMLDivElement;
      const resizeObserver = new ResizeObserver((entries) => {
        setCarouselWidth(entries[0].contentRect.width)
      })
      resizeObserver.observe(carousel);
    }
    getCarouselWidth();

    function setFirstActive() {
      const prevListState = images;
      prevListState[0].active = true;
      setImages(prevListState);
    }
    setFirstActive();
  }, []);

  function scrollY(index: number) {
    const prevListState = images.map((el) => {
      return { ...el, active: false }
    });
    prevListState[index].active = true
    setImages(prevListState);
    innerCarousel.current!.style.transform = `translateX(-${carouselWidth * index}px)`;
  }

  function onTransitionEnd(index: number) {
    if (index + 1 === images.length) {
      const prevListState = images.map((el) => {
        return { ...el, active: false }
      });
      prevListState[0].active = true;
      setImages(prevListState);
      scrollY(0);
    } else {
      const prevListState = images.map((el) => {
        return { ...el, active: false }
      });
      prevListState[index + 1].active = true;
      setImages(prevListState);
      scrollY(index + 1);
    }
  }

  return (
    <>
      <div className="w-full  flex flex-col px-3 items-center justify-center mt-10">
        <div className="max-w-[800px]  carousel scroll-smooth  flex overflow-hidden w-full h-[400px] border rounded-lg">
          <div ref={(element: HTMLDivElement) => innerCarousel.current = element} className="flex duration-500" style={{ width: carouselWidth * images.length + "px" }}>
            {images.map((el,) => {
              return <div style={{ width: carouselWidth + "px" }} className="w-full h-full">
                <img style={{ transform: el.active ? "scale(1.5)" : "scale(0.7)", filter: el.active ? "blur(0px)" : "blur(50px)" }} className='w-full duration-500  h-full object-cover' src={el.url} alt="" />
              </div>
            })}
          </div>
        </div>

        <div className="w-full px-5 max-w-[400px] mt-7 flex gap-2  items-center justify-center ">
          {images.map((el, index) => {
            return <Controller ontransitionEnd={() => onTransitionEnd(index)} active={el.active} onClick={() => scrollY(index)} />
          })}
        </div>
      </div>
    </>
  )
}

export default App
