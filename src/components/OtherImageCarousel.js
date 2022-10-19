import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const OtherImageCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  const nextImage = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  //   const handlers = useSwipeable({
  //     onSwipedLeft: () => nextImage(),
  //     onSwipedRight: () => prevImage(),
  //   });

  return (
    <div className="carousel">
      <div className="carousel-main">
        <span className="arrow" onClick={() => prevImage()}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </span>
        <div className="carousel-polaroid">
          <img src={images[currentImage].url} alt="" />
        </div>
        <span className="arrow" onClick={() => nextImage()}>
          <FontAwesomeIcon icon={faForwardStep} />
        </span>
      </div>
      {/* <div className="pages">
          {otherImages.map((Image, index) => {
            return (
              <PageDots
                Image={Image}
                index={index}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                key={index}
              />
            );
          })}
        </div> */}
    </div>
  );
};

export default OtherImageCarousel;
